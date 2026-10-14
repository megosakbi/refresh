/* YEAR */

document.getElementById("year").textContent =
    new Date().getFullYear();



/* NAVBAR */

const navbar =
    document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add(
            "scrolled"
        );

    } else {

        navbar.classList.remove(
            "scrolled"
        );

    }

});



/* SCROLL REVEAL */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target
                        .classList
                        .add("visible");

                }

            });

        },
        {
            threshold: .1
        }
    );

revealElements.forEach(element => {
    observer.observe(element);
});



/* LOAD HERO IMMEDIATELY */

window.addEventListener(
    "load",
    () => {

        const heroItems =
            document.querySelectorAll(
                ".hero .reveal"
            );

        heroItems.forEach(
            (element, index) => {

                setTimeout(() => {

                    element.classList.add(
                        "visible"
                    );

                }, index * 120);

            }
        );

    }
);



/* PARTICLES */

const particleContainer =
    document.getElementById(
        "particles"
    );

for (
    let i = 0;
    i < 35;
    i++
) {

    const particle =
        document.createElement(
            "div"
        );

    particle.classList.add(
        "particle"
    );

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.animationDuration =
        (
            10 +
            Math.random() * 18
        ) + "s";

    particle.style.animationDelay =
        Math.random() * 12 + "s";

    const size =
        Math.random() * 2 + 1;

    particle.style.width =
        size + "px";

    particle.style.height =
        size + "px";

    particleContainer
        .appendChild(
            particle
        );

}



/* FAQ */

const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );

faqItems.forEach(item => {

    const button =
        item.querySelector(
            "button"
        );

    button.addEventListener(
        "click",
        () => {

            const active =
                item.classList
                    .contains(
                        "active"
                    );

            faqItems.forEach(other => {

                other.classList.remove(
                    "active"
                );

            });

            if (!active) {

                item.classList.add(
                    "active"
                );

            }

        }
    );

});



/* IMAGE LIGHTBOX */

const galleryCards =
    document.querySelectorAll(
        ".gallery-card"
    );

const lightbox =
    document.getElementById(
        "lightbox"
    );

const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );

const closeLightbox =
    document.getElementById(
        "closeLightbox"
    );


galleryCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const image =
                card.dataset.image;

            lightboxImage.src =
                image;

            lightbox.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";

        }
    );

});


function closeImage() {

    lightbox.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


closeLightbox.addEventListener(
    "click",
    closeImage
);


lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            lightbox
        ) {

            closeImage();

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeImage();

        }

    }
);



/* CARD MOUSE GLOW */

const cards =
    document.querySelectorAll(
        ".extension-card"
    );

cards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth <
                900
            ) {
                return;
            }

            const rect =
                card
                    .getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            const middleX =
                rect.width / 2;

            const middleY =
                rect.height / 2;

            const rotateX =
                (
                    (
                        y -
                        middleY
                    ) /
                    middleY
                ) * -1.5;

            const rotateY =
                (
                    (
                        x -
                        middleX
                    ) /
                    middleX
                ) * 1.5;

            card.style.transform =
                `
                perspective(1000px)
                translateY(-10px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});



/* SMOOTH LINKS */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const selector =
                    link.getAttribute(
                        "href"
                    );

                if (
                    selector === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        selector
                    );

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    });
