// =============================================
// RBXCURSOR WEBSITE
// =============================================


// DIRECT GOOGLE DRIVE DOWNLOAD

const EXTENSION_DOWNLOAD_URL =
    "https://drive.google.com/uc?export=download&id=1mFxUiK-3GEVEMDM9SjTwb7LInM49k5KI";


// =============================================
// DOWNLOAD BUTTONS
// =============================================

document
    .querySelectorAll(".download-link")
    .forEach(button => {

        button.href =
            EXTENSION_DOWNLOAD_URL;

        button.target =
            "_self";

    });


const finalDownload =
    document.querySelector("#downloadButton");


if (finalDownload) {

    finalDownload.href =
        EXTENSION_DOWNLOAD_URL;

    finalDownload.target =
        "_self";

}


// =============================================
// EXTENSION PREVIEW
// =============================================

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


// =============================================
// CURSOR PRESETS
// =============================================

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


// =============================================
// PRESET BUTTONS
// =============================================

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


                if (
                    cursorTypes[type] &&
                    cursor
                ) {

                    cursor.innerHTML =
                        cursorTypes[type];

                }


                if (selectedName) {

                    selectedName.textContent =
                        name;

                }


                document
                    .querySelectorAll(".preset")
                    .forEach(preset => {

                        preset
                            .classList
                            .remove("active");

                    });


                button
                    .classList
                    .add("active");

            }
        );

    });


// =============================================
// PREVIEW SLIDERS
// =============================================

function updateCursor() {

    if (
        !cursor ||
        !sizeSlider ||
        !glowSlider ||
        !opacitySlider
    ) {

        return;

    }


    const size =
        Number(
            sizeSlider.value
        );


    const glow =
        Number(
            glowSlider.value
        );


    const opacity =
        Number(
            opacitySlider.value
        );


    const scale =
        size / 90;


    cursor.style.transform = `

        translate(
            -50%,
            -50%
        )

        scale(
            ${scale}
        )

    `;


    cursor.style.opacity =
        opacity / 100;


    cursor.style.filter = `

        drop-shadow(

            0 0

            ${5 + glow * 0.23}px

            rgba(
                255,
                102,
                183,
                ${glow / 100}
            )

        )

    `;


    if (cursorGlow) {

        cursorGlow.style.opacity =
            0.1 +
            glow / 110;

    }


    if (glowText) {

        glowText.textContent =
            glow + "%";

    }


    updateSlider(
        sizeSlider
    );


    updateSlider(
        glowSlider
    );


    updateSlider(
        opacitySlider
    );

}


// =============================================
// SLIDER COLOR
// =============================================

function updateSlider(slider) {

    if (!slider) {

        return;

    }


    const min =
        Number(
            slider.min
        );


    const max =
        Number(
            slider.max
        );


    const value =
        Number(
            slider.value
        );


    const percent =

        (
            (value - min) /
            (max - min)
        )

        * 100;


    slider.style.background = `

        linear-gradient(

            90deg,

            #ff78be 0%,

            #ff78be
            ${percent}%,

            #2b2229
            ${percent}%,

            #2b2229
            100%

        )

    `;

}


[
    sizeSlider,
    glowSlider,
    opacitySlider
]
.forEach(slider => {

    if (slider) {

        slider.addEventListener(
            "input",
            updateCursor
        );

    }

});


updateCursor();


// =============================================
// EXTENSION PREVIEW MOUSE
// =============================================

const preview =
    document.querySelector("#preview");


let lastPreviewSparkle =
    0;


if (
    preview &&
    cursor
) {

    preview.addEventListener(
        "mousemove",
        event => {

            const rect =
                preview
                    .getBoundingClientRect();


            let x =
                event.clientX -
                rect.left;


            let y =
                event.clientY -
                rect.top;


            // Stop preview cursor from
            // entering preset menu.

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


            if (cursorGlow) {

                cursorGlow.style.left =
                    x + "px";


                cursorGlow.style.top =
                    y + "px";

            }


            const now =
                performance.now();


            if (
                now -
                lastPreviewSparkle >
                50
            ) {

                createPreviewSparkle(

                    x - 15,

                    y + 10

                );


                lastPreviewSparkle =
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


            if (cursorGlow) {

                cursorGlow.style.left =
                    "50%";


                cursorGlow.style.top =
                    "49%";

            }

        }
    );

}


// =============================================
// PREVIEW SPARKLES
// =============================================

function createPreviewSparkle(
    x,
    y
) {

    if (!preview) {

        return;

    }


    const sparkle =
        document
            .createElement(
                "span"
            );


    const symbols = [

        "✦",

        "·",

        "✧"

    ];


    sparkle.textContent =

        symbols[

            Math.floor(

                Math.random() *
                symbols.length

            )

        ];


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

        Math.random() > .35

            ? "#ff8fc9"

            : "#ffffff";


    sparkle.style.fontSize =

        (
            5 +
            Math.random() *
            7
        )

        + "px";


    sparkle.style.textShadow =
        "0 0 10px #ff65b5";


    sparkle.style.opacity =
        "1";


    sparkle.style.transition =
        "700ms ease";


    preview.appendChild(
        sparkle
    );


    requestAnimationFrame(
        () => {

            sparkle.style.transform = `

                translate(

                    ${
                        (
                            Math.random()
                            - .5
                        ) * 35
                    }px,

                    ${
                        -25 -
                        Math.random() * 30
                    }px

                )

                scale(1.3)

            `;


            sparkle.style.opacity =
                "0";

        }
    );


    setTimeout(

        () => {

            sparkle.remove();

        },

        750

    );

}


// =============================================
// CUSTOM WEBSITE CURSOR
// =============================================

const canUseCustomCursor =

    window
        .matchMedia(
            "(pointer: fine)"
        )
        .matches;


if (canUseCustomCursor) {

    document
        .documentElement
        .classList
        .add(
            "custom-cursor-enabled"
        );


    // CREATE CURSOR

    const siteCursor =
        document
            .createElement(
                "div"
            );


    siteCursor.className =
        "site-cursor";


    siteCursor.innerHTML = `

        <div
            class="site-cursor-ring"
        ></div>


        <div
            class="site-cursor-core"
        >
            ✦
        </div>

    `;


    document.body.appendChild(
        siteCursor
    );


    // CREATE GLOW

    const siteGlow =
        document
            .createElement(
                "div"
            );


    siteGlow.className =
        "site-cursor-glow";


    document.body.appendChild(
        siteGlow
    );


    // POSITION VALUES

    let mouseX =
        window.innerWidth / 2;


    let mouseY =
        window.innerHeight / 2;


    let cursorX =
        mouseX;


    let cursorY =
        mouseY;


    let glowX =
        mouseX;


    let glowY =
        mouseY;


    let lastSiteSparkle =
        0;


    // MOUSE MOVE

    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;


            mouseY =
                event.clientY;


            siteCursor
                .classList
                .add(
                    "visible"
                );


            siteGlow
                .classList
                .add(
                    "visible"
                );


            const now =
                performance.now();


            if (
                now -
                lastSiteSparkle >
                32
            ) {

                createSiteSparkle(

                    event.clientX,

                    event.clientY

                );


                lastSiteSparkle =
                    now;

            }

        }
    );


    // HIDE WHEN LEAVING WINDOW

    document.addEventListener(
        "mouseleave",
        () => {

            siteCursor
                .classList
                .remove(
                    "visible"
                );


            siteGlow
                .classList
                .remove(
                    "visible"
                );

        }
    );


    // CLICK EFFECT

    document.addEventListener(
        "mousedown",
        () => {

            siteCursor
                .classList
                .add(
                    "clicking"
                );

        }
    );


    document.addEventListener(
        "mouseup",
        () => {

            siteCursor
                .classList
                .remove(
                    "clicking"
                );

        }
    );


    // BUTTON HOVER EFFECT

    document
        .querySelectorAll(
            "a, button, summary, input"
        )
        .forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    siteCursor
                        .classList
                        .add(
                            "hovering"
                        );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    siteCursor
                        .classList
                        .remove(
                            "hovering"
                        );

                }
            );

        });


    // SMOOTH FOLLOW

    function animateSiteCursor() {

        cursorX +=

            (
                mouseX -
                cursorX
            )

            * .35;


        cursorY +=

            (
                mouseY -
                cursorY
            )

            * .35;


        glowX +=

            (
                mouseX -
                glowX
            )

            * .12;


        glowY +=

            (
                mouseY -
                glowY
            )

            * .12;


        siteCursor.style.transform = `

            translate3d(

                ${cursorX}px,

                ${cursorY}px,

                0

            )

        `;


        siteGlow.style.transform = `

            translate3d(

                ${glowX}px,

                ${glowY}px,

                0

            )

        `;


        requestAnimationFrame(
            animateSiteCursor
        );

    }


    animateSiteCursor();

}


// =============================================
// WEBSITE SPARKLE TRAIL
// =============================================

function createSiteSparkle(
    x,
    y
) {

    const sparkle =
        document
            .createElement(
                "span"
            );


    sparkle.className =
        "mouse-sparkle";


    const sparkleTypes = [

        "✦",

        "✧",

        "•"

    ];


    sparkle.textContent =

        sparkleTypes[

            Math.floor(

                Math.random() *
                sparkleTypes.length

            )

        ];


    const offsetX =

        (
            Math.random()
            - .5
        )

        * 15;


    const offsetY =

        (
            Math.random()
            - .5
        )

        * 15;


    sparkle.style.left =

        (
            x +
            offsetX
        )

        + "px";


    sparkle.style.top =

        (
            y +
            offsetY
        )

        + "px";


    sparkle.style.fontSize =

        (
            5 +
            Math.random() *
            7
        )

        + "px";


    document.body.appendChild(
        sparkle
    );


    const moveX =

        (
            Math.random()
            - .5
        )

        * 45;


    const moveY =

        -20 -

        Math.random()
        * 35;


    requestAnimationFrame(
        () => {

            sparkle.style.transform = `

                translate(

                    ${moveX}px,

                    ${moveY}px

                )

                scale(.2)

                rotate(
                    ${
                        Math.random()
                        * 120
                    }deg
                )

            `;


            sparkle.style.opacity =
                "0";

        }
    );


    setTimeout(

        () => {

            sparkle.remove();

        },

        650

    );

}


// =============================================
// FAQ
// =============================================

document
    .querySelectorAll(
        ".faq-list details"
    )
    .forEach(item => {

        item.addEventListener(
            "toggle",
            () => {

                if (!item.open) {

                    return;

                }


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
