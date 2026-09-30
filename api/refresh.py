from http.server import BaseHTTPRequestHandler
import json
import requests

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        
        try:
            data = json.loads(post_data.decode('utf-8'))
            cookie = data.get('cookie', '').strip()
            
            if not cookie:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": "No cookie provided"}).encode('utf-8'))
                return

            new_cookie = self.refresh_roblox_cookie_with_proxy(cookie)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"result": new_cookie}).encode('utf-8'))
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))

    def refresh_roblox_cookie_with_proxy(self, cookie):
        session = requests.Session()
        
        # Configure your proxy: IP:PORT:USER:PASSWORD
        proxy_raw = "84.247.60.125:6095:evdqdybg:zw4jmd3h2l63"
        p_parts = proxy_raw.split(":")
        
        proxy_url = f"http://{p_parts[2]}:{p_parts[3]}@{p_parts[0]}:{p_parts[1]}"
        session.proxies = {
            "http": proxy_url,
            "https": proxy_url
        }
        
        session.cookies.set(".ROBLOSECURITY", cookie, domain=".roblox.com")
        
        # Step 1: Get CSRF token
        try:
            csrf_res = session.post("https://auth.roblox.com/v2/logout", timeout=10)
        except Exception as e:
            return f"Proxy Connection Error: {str(e)}"
            
        csrf_token = csrf_res.headers.get("x-csrf-token")
        
        if not csrf_token:
            return "Invalid/Expired Cookie or Proxy Blocked"
            
        headers = {
            "X-CSRF-TOKEN": csrf_token,
            "Referer": "https://www.roblox.com/",
            "Origin": "https://www.roblox.com"
        }
        
        # Step 2: Request Authentication Ticket
        ticket_res = session.post("https://auth.roblox.com/v1/authentication-ticket", headers=headers)
        auth_ticket = ticket_res.headers.get("rbx-authentication-ticket")
        
        if not auth_ticket:
            return "Failed to generate auth ticket"
            
        # Step 3: Redeem Ticket for a new refreshed .ROBLOSECURITY cookie
        redeem_headers = {
            "Content-Type": "application/json",
            "Referer": "https://www.roblox.com/",
            "Origin": "https://www.roblox.com",
            "RBXAuthenticationNegotiation": "1"
        }
        redeem_res = session.post(
            "https://auth.roblox.com/v1/authentication-ticket/redeem",
            json={"authenticationTicket": auth_ticket},
            headers=redeem_headers
        )
        
        set_cookie_header = redeem_res.headers.get("Set-Cookie", "")
        if ".ROBLOSECURITY=" in set_cookie_header:
            try:
                part = set_cookie_header.split(".ROBLOSECURITY=")[1]
                new_cookie = part.split(";")[0]
                return new_cookie
            except Exception:
                return "Error parsing refreshed cookie"
                
        return "Failed to redeem ticket"
