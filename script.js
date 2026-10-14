/* ---------------------------------
   CURRENT YEAR
---------------------------------- */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* ---------------------------------
   NAVBAR SCROLL EFFECT
---------------------------------- */

const navbar =
  document.querySelector(".navbar");

window.addEventListener("scroll", () => {

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

});


/* ---------------------------------
   SCROLL REVEAL
---------------------------------- */

const revealElements =
  document.querySelectorAll(".reveal");

const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }

      });

    },
    {
      threshold: 0.12
    }
  );


revealElements.forEach((element) => {
  revealObserver.observe(element);
});


/* ---------------------------------
   INITIAL HERO ANIMATION
---------------------------------- */

window.addEventListener("load", () => {

  const heroElements =
    document.querySelectorAll(
      ".hero .reveal"
    );

  heroElements.forEach(
    (element, index) => {

      setTimeout(() => {

        element.classList.add(
          "visible"
        );

      }, index * 120);

    }
  );

});


/* ---------------------------------
   BACKGROUND PARTICLES
---------------------------------- */

const particleContainer =
  document.getElementById("particles");

const particleAmount = 35;


for (
  let i = 0;
  i < particleAmount;
  i++
) {

  const particle =
    document.createElement("div");

  particle.classList.add(
    "particle"
  );

  particle.style.left =
    Math.random() * 100 + "%";

  particle.style.animationDuration =
    10 + Math.random() * 15 + "s";

  particle.style.animationDelay =
    Math.random() * 15 + "s";

  const size =
    1 + Math.random() * 2;

  particle.style.width =
    size + "px";

  particle.style.height =
    size + "px";

  particleContainer.appendChild(
    particle
  );

}


/* ---------------------------------
   CUSTOM CURSOR
---------------------------------- */

const cursor =
  document.querySelector(".cursor");

const cursorOutline =
  document.querySelector(
    ".cursor-outline"
  );


let mouseX = 0;
let mouseY = 0;

let outlineX = 0;
let outlineY = 0;


document.addEventListener(
  "mousemove",
  (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left =
      mouseX + "px";

    cursor.style.top =
      mouseY + "px";

  }
);


function animateCursor() {

  outlineX +=
    (mouseX - outlineX) * 0.15;

  outlineY +=
    (mouseY - outlineY) * 0.15;

  cursorOutline.style.left =
    outlineX + "px";

  cursorOutline.style.top =
    outlineY + "px";

  requestAnimationFrame(
    animateCursor
  );

}

animateCursor();


/* Cursor hover */

const hoverElements =
  document.querySelectorAll(
    "a, button, .extension-card, .about-item"
  );


hoverElements.forEach((element) => {

  element.addEventListener(
    "mouseenter",
    () => {

      cursorOutline.style.width =
        "45px";

      cursorOutline.style.height =
        "45px";

      cursorOutline.style.background =
        "rgba(255,255,255,.05)";

    }
  );


  element.addEventListener(
    "mouseleave",
    () => {

      cursorOutline.style.width =
        "30px";

      cursorOutline.style.height =
        "30px";

      cursorOutline.style.background =
        "transparent";

    }
  );

});


/* ---------------------------------
   DOWNLOAD BUTTON EFFECT
---------------------------------- */

const downloadButtons =
  document.querySelectorAll(
    ".download-button"
  );

const toast =
  document.getElementById("toast");

const toastText =
  document.getElementById("toast-text");


downloadButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const extensionName =
          button.dataset.extension;

        toastText.textContent =
          extensionName;

        toast.classList.add(
          "show"
        );


        setTimeout(() => {

          toast.classList.remove(
            "show"
          );

        }, 2500);

      }
    );

  }
);


/* ---------------------------------
   3D CARD HOVER EFFECT
---------------------------------- */

const cards =
  document.querySelectorAll(
    ".extension-card"
  );


cards.forEach((card) => {

  card.addEventListener(
    "mousemove",
    (event) => {

      if (
        window.innerWidth < 800
      ) {
        return;
      }

      const rect =
        card.getBoundingClientRect();

      const x =
        event.clientX -
        rect.left;

      const y =
        event.clientY -
        rect.top;


      const centerX =
        rect.width / 2;

      const centerY =
        rect.height / 2;


      const rotateX =
        (
          (y - centerY) /
          centerY
        ) * -2;

      const rotateY =
        (
          (x - centerX) /
          centerX
        ) * 2;


      card.style.transform =
        `
        perspective(1000px)
        translateY(-8px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        `;

    }
  );


  card.addEventListener(
    "mouseleave",
    () => {

      card.style.transform = "";

    }
  );

});


/* ---------------------------------
   SMOOTH ANCHOR LINKS
---------------------------------- */

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {

    link.addEventListener(
      "click",
      function(event) {

        const target =
          document.querySelector(
            this.getAttribute(
              "href"
            )
          );

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth"
        });

      }
    );

  });
