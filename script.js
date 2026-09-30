// PUT YOUR EXTENSION ZIP LINK HERE
const EXTENSION_DOWNLOAD_URL = "#";


// DOWNLOAD BUTTONS

const downloadButtons =
    document.querySelectorAll(".download-link");

downloadButtons.forEach(button => {

    button.addEventListener("click", e => {

        if (
            !EXTENSION_DOWNLOAD_URL ||
            EXTENSION_DOWNLOAD_URL === "#"
        ) {

            e.preventDefault();

            document
                .querySelector("#download")
                .scrollIntoView({
                    behavior: "smooth"
                });

            return;
        }

        button.href =
            EXTENSION_DOWNLOAD_URL;

    });

});


const finalDownload =
    document.querySelector("#downloadButton");

const downloadMessage =
    document.querySelector("#downloadMessage");


finalDownload.addEventListener(
    "click",
    e => {

        if (
            !EXTENSION_DOWNLOAD_URL ||
            EXTENSION_DOWNLOAD_URL === "#"
        ) {

            e.preventDefault();

            downloadMessage.textContent =
                "Add EXTENSION_DOWNLOAD_URL at the top of script.js";

            downloadMessage.style.color =
                "#ff8fc9";

            return;
        }

        finalDownload.href =
            EXTENSION_DOWNLOAD_URL;

    }
);


// CURSOR PREVIEW

const cursor =
    document.querySelector("#cursor");

const cursorGlow =
    document.querySelector("#cursorGlow");

const selectedName =
    document.querySelector("#selectedName");

const glowText =
    document.querySelector("#glowText");


const sizeSlider =
    document.querySelector("#size");

const glowSlider =
    document.querySelector("#glow");

const opacitySlider =
    document.querySelector("#opacity");


const cursorTypes = {

    paw: `
        <div class="paw">

            <i class="toe toe1"></i>

            <i class="toe toe2"></i>

            <i class="toe toe3"></i>

            <i class="toe toe4"></i>

            <i class="pad"></i>

        </div>
    `,

    heart: `
        <div class="cursor-symbol">
            ♡
        </div>
    `,

    star: `
        <div class="cursor-symbol">
            ✦
        </div>
    `,

    moon: `
        <div class="cursor-symbol">
            ☾
        </div>
    `,

    arrow: `
        <div
            class="cursor-symbol"
            style="
                transform:rotate(-40deg);
                font-size:70px;
            "
        >
            ➤
        </div>
    `

};


document
    .querySelectorAll(".preset")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const type =
                    button.dataset.cursor;

                const name =
                    button.dataset.name;

                cursor.innerHTML =
                    cursorTypes[type];

                selectedName.textContent =
                    name;


                document
                    .querySelectorAll(".preset")
                    .forEach(preset => {

                        preset.classList.remove(
                            "active"
                        );

                    });


                button.classList.add(
                    "active"
                );

            }
        );

    });


// SLIDERS

function updateCursor() {

    const size =
        Number(sizeSlider.value);

    const glow =
        Number(glowSlider.value);

    const opacity =
        Number(opacitySlider.value);


    const scale =
        size / 90;


    cursor.style.transform =
        `
        translate(-50%,-50%)
        scale(${scale})
        `;


    cursor.style.opacity =
        opacity / 100;


    cursor.style.filter =
        `
        drop-shadow(
            0 0
            ${5 + glow * .23}px
            rgba(
                255,
                102,
                183,
                ${glow / 100}
            )
        )
        `;


    cursorGlow.style.opacity =
        .1 + glow / 110;


    glowText.textContent =
        glow + "%";


    updateSlider(sizeSlider);

    updateSlider(glowSlider);

    updateSlider(opacitySlider);

}


function updateSlider(slider) {

    const min =
        Number(slider.min);

    const max =
        Number(slider.max);

    const value =
        Number(slider.value);


    const percent =
        (
            (value - min) /
            (max - min)
        ) * 100;


    slider.style.background =
        `
        linear-gradient(
            90deg,
            #ff78be 0%,
            #ff78be ${percent}%,
            #2b2229 ${percent}%,
            #2b2229 100%
        )
        `;

}


[
    sizeSlider,
    glowSlider,
    opacitySlider
]
.forEach(slider => {

    slider.addEventListener(
        "input",
        updateCursor
    );

});


updateCursor();


// SPARKLES + MOVING CURSOR

const preview =
    document.querySelector("#preview");


let lastSparkle = 0;


preview.addEventListener(
    "mousemove",
    e => {

        const rect =
            preview.getBoundingClientRect();


        let x =
            e.clientX - rect.left;

        let y =
            e.clientY - rect.top;


        // don't move into preset sidebar

        x =
            Math.min(
                x,
                rect.width - 105
            );


        x =
            Math.max(
                70,
                x
            );


        y =
            Math.max(
                65,
                Math.min(
                    y,
                    rect.height - 60
                )
            );


        cursor.style.left =
            x + "px";

        cursor.style.top =
            y + "px";


        cursorGlow.style.left =
            x + "px";

        cursorGlow.style.top =
            y + "px";


        const now =
            performance.now();


        if (
            now - lastSparkle >
            45
        ) {

            createSparkle(
                x - 15,
                y + 10
            );

            lastSparkle =
                now;

        }

    }
);


preview.addEventListener(
    "mouseleave",
    () => {

        cursor.style.left =
            "50%";

        cursor.style.top =
            "49%";


        cursorGlow.style.left =
            "50%";

        cursorGlow.style.top =
            "49%";

    }
);


function createSparkle(x,y) {

    const sparkle =
        document.createElement(
            "span"
        );


    sparkle.textContent =
        Math.random() > .5
            ? "✦"
            : "·";


    sparkle.style.position =
        "absolute";

    sparkle.style.left =
        x + "px";

    sparkle.style.top =
        y + "px";

    sparkle.style.zIndex =
        "4";

    sparkle.style.pointerEvents =
        "none";

    sparkle.style.color =
        Math.random() > .4
            ? "#ff8fc9"
            : "#ffffff";

    sparkle.style.fontSize =
        (
            5 +
            Math.random() * 7
        ) + "px";

    sparkle.style.textShadow =
        "0 0 10px #ff65b5";

    sparkle.style.transition =
        "700ms ease";

    sparkle.style.opacity =
        "1";


    preview.appendChild(
        sparkle
    );


    requestAnimationFrame(
        () => {

            sparkle.style.transform =
                `
                translate(
                    ${(Math.random()-.5)*35}px,
                    ${-25-Math.random()*30}px
                )
                scale(1.3)
                `;

            sparkle.style.opacity =
                "0";

        }
    );


    setTimeout(
        () => sparkle.remove(),
        750
    );

}


// FAQ

document
    .querySelectorAll(
        ".faq-list details"
    )
    .forEach(item => {

        item.addEventListener(
            "toggle",
            () => {

                if (!item.open)
                    return;


                document
                    .querySelectorAll(
                        ".faq-list details"
                    )
                    .forEach(other => {

                        if (
                            other !== item
                        ) {

                            other.open =
                                false;

                        }

                    });

            }
        );

    });
