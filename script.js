// ============================================
// EXTENSIONS
// ADD / REMOVE YOUR EXTENSIONS HERE
// ============================================

const EXTENSIONS = [

  {
    name: "RBXCursor",

    category: "customization",

    tag: "CUSTOMIZATION",

    version: "v1.0",

    color: "#4ae7ff",

    glow:
      "rgba(74,231,255,.16)",

    icon: "✦",

    description:
      "Custom cursors, glow effects, trails and visual cursor presets for Roblox.",

    features: [
      "Cursor FX",
      "Glow",
      "Trails"
    ],

    download:
      "downloads/rbxcursor.zip"
  },


  {
    name: "Theme Forge",

    category: "ui",

    tag: "UI THEMES",

    version: "v1.0",

    color: "#9a6cff",

    glow:
      "rgba(154,108,255,.16)",

    icon: "◫",

    description:
      "Change the default Roblox browser look with cleaner layouts and custom themes.",

    features: [
      "Themes",
      "Dark UI",
      "Layouts"
    ],

    download:
      "downloads/theme-forge.zip"
  },


  {
    name: "Profile Plus",

    category: "profile",

    tag: "PROFILE",

    version: "v1.0",

    color: "#b7ff5a",

    glow:
      "rgba(183,255,90,.14)",

    icon: "⌁",

    description:
      "Profile tools, cleaner layouts and extra visual upgrades for Roblox pages.",

    features: [
      "Profiles",
      "Quick UI",
      "Layouts"
    ],

    download:
      "downloads/profile-plus.zip"
  },


  {
    name: "Neon UI Kit",

    category: "ui",

    tag: "UI MOD",

    version: "v1.0",

    color: "#ff9f4a",

    glow:
      "rgba(255,159,74,.15)",

    icon: "◆",

    description:
      "Adds animated accents, hover effects and a futuristic browser UI style.",

    features: [
      "Animations",
      "UI FX",
      "Accents"
    ],

    download:
      "downloads/neon-ui-kit.zip"
  }

];


// ============================================
// ELEMENTS
// ============================================

const grid =
  document.querySelector(
    "#extensionGrid"
  );


const search =
  document.querySelector(
    "#extensionSearch"
  );


const filters =
  document.querySelectorAll(
    ".filter"
  );


let currentFilter =
  "all";


let currentSearch =
  "";


// ============================================
// ESCAPE TEXT
// ============================================

function escapeHTML(text) {

  return String(text)
    .replace(
      /[&<>"']/g,

      character => ({

        "&": "&amp;",

        "<": "&lt;",

        ">": "&gt;",

        '"': "&quot;",

        "'": "&#39;"

      }[character])

    );

}


// ============================================
// RENDER EXTENSION CARDS
// ============================================

function renderExtensions() {

  const filtered =
    EXTENSIONS.filter(
      extension => {

        const filterMatch =

          currentFilter === "all" ||

          extension.category ===
          currentFilter;


        const searchText = `

          ${extension.name}

          ${extension.tag}

          ${extension.description}

          ${extension.features.join(" ")}

        `.toLowerCase();


        const searchMatch =

          searchText.includes(
            currentSearch.toLowerCase()
          );


        return (
          filterMatch &&
          searchMatch
        );

      }
    );


  if (!filtered.length) {

    grid.innerHTML = `

      <div class="no-results">

        No extensions found.

      </div>

    `;

    return;

  }


  grid.innerHTML = filtered
    .map(extension => `

      <article

        class="extension-card reveal"

        style="

          --accent:
          ${extension.color};

          --accent-soft:
          ${extension.glow};

        "

      >

        <div class="card-art">

          <div class="card-grid"></div>


          <div class="card-icon">

            ${escapeHTML(
              extension.icon
            )}

          </div>

        </div>


        <div class="card-content">

          <div class="card-top">

            <span class="card-tag">

              ${escapeHTML(
                extension.tag
              )}

            </span>


            <span class="card-version">

              ${escapeHTML(
                extension.version
              )}

            </span>

          </div>


          <h3>

            ${escapeHTML(
              extension.name
            )}

          </h3>


          <p>

            ${escapeHTML(
              extension.description
            )}

          </p>


          <div class="card-points">

            ${extension.features
              .map(feature => `

                <span>

                  ${escapeHTML(
                    feature
                  )}

                </span>

              `)
              .join("")}

          </div>


          <a

            class="download-button"

            href="${extension.download}"

            download

          >

            <svg viewBox="0 0 24 24">

              <path d="M12 3v12"></path>

              <path d="m8 11 4 4 4-4"></path>

              <path d="M5 20h14"></path>

            </svg>

            Download extension

          </a>

        </div>

      </article>

    `)
    .join("");


  setupReveal();

  setupMouseHover();

}


// ============================================
// FILTER BUTTONS
// ============================================

filters.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        filters.forEach(
          item => {

            item.classList.remove(
              "active"
            );

          }
        );


        button.classList.add(
          "active"
        );


        currentFilter =
          button.dataset.filter;


        renderExtensions();

      }
    );

  }
);


// ============================================
// SEARCH
// ============================================

search.addEventListener(
  "input",
  () => {

    currentSearch =
      search.value.trim();


    renderExtensions();

  }
);


// ============================================
// SCROLL ANIMATIONS
// ============================================

let revealObserver;


function setupReveal() {

  if (!revealObserver) {

    revealObserver =

      new IntersectionObserver(

        entries => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                entry.target
                  .classList
                  .add(
                    "visible"
                  );


                revealObserver
                  .unobserve(
                    entry.target
                  );

              }

            }
          );

        },

        {
          threshold: .12
        }

      );

  }


  document
    .querySelectorAll(
      ".reveal:not(.visible)"
    )
    .forEach(
      element => {

        revealObserver.observe(
          element
        );

      }
    );

}


// ============================================
// AVATAR PARALLAX
// ============================================

const avatarPanel =
  document.querySelector(
    "#avatarPanel"
  );


const heroAvatar =
  document.querySelector(
    "#heroAvatar"
  );


if (
  avatarPanel &&
  heroAvatar
) {

  avatarPanel.addEventListener(
    "mousemove",
    event => {

      const rect =
        avatarPanel
          .getBoundingClientRect();


      const x =

        (
          event.clientX -
          rect.left
        ) /

        rect.width -

        .5;


      const y =

        (
          event.clientY -
          rect.top
        ) /

        rect.height -

        .5;


      heroAvatar.style.transform = `

        translate(

          ${x * 13}px,

          ${y * 8}px

        )

        rotateY(
          ${x * 5}deg
        )

      `;

    }
  );


  avatarPanel.addEventListener(
    "mouseleave",
    () => {

      heroAvatar.style.transform =
        "";

    }
  );

}


// ============================================
// CUSTOM CURSOR
// ============================================

const mouseDot =
  document.querySelector(
    "#mouseDot"
  );


const mouseRing =
  document.querySelector(
    "#mouseRing"
  );


const finePointer =

  window
    .matchMedia(
      "(pointer:fine)"
    )
    .matches;


if (
  finePointer &&
  mouseDot &&
  mouseRing
) {

  document.body.classList.add(
    "cursor-on"
  );


  let mouseX =
    innerWidth / 2;


  let mouseY =
    innerHeight / 2;


  let ringX =
    mouseX;


  let ringY =
    mouseY;


  document.addEventListener(
    "mousemove",
    event => {

      mouseX =
        event.clientX;


      mouseY =
        event.clientY;


      mouseDot.style.transform = `

        translate3d(

          ${mouseX}px,

          ${mouseY}px,

          0

        )

      `;

    },

    {
      passive: true
    }

  );


  function animateRing() {

    ringX +=

      (
        mouseX -
        ringX
      )

      * .16;


    ringY +=

      (
        mouseY -
        ringY
      )

      * .16;


    mouseRing.style.transform = `

      translate3d(

        ${ringX}px,

        ${ringY}px,

        0

      )

    `;


    requestAnimationFrame(
      animateRing
    );

  }


  animateRing();

}


// ============================================
// HOVER CURSOR
// ============================================

function setupMouseHover() {

  document
    .querySelectorAll(
      "a, button, input, summary, .extension-card"
    )
    .forEach(
      element => {

        if (
          element.dataset.mouseBound
        ) {
          return;
        }


        element.dataset.mouseBound =
          "1";


        element.addEventListener(
          "mouseenter",
          () => {

            document.body
              .classList
              .add(
                "cursor-hover"
              );

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            document.body
              .classList
              .remove(
                "cursor-hover"
              );

          }
        );

      }
    );

}


// ============================================
// FAQ
// ============================================

document
  .querySelectorAll(
    ".faq-list details"
  )
  .forEach(
    item => {

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
            .forEach(
              other => {

                if (
                  other !== item
                ) {

                  other.open =
                    false;

                }

              }
            );

        }
      );

    }
  );


// ============================================
// INITIALIZE
// ============================================

renderExtensions();

setupReveal();

setupMouseHover();
