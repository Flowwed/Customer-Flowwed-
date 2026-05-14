// ==========================================
// MOBILE iOS HAMBURGER MENU
// desktop untouched
// ==========================================

(function () {

  // =========================
  // MOBILE ONLY
  // =========================

  if (
    !window.matchMedia(
      "(max-width: 768px)"
    ).matches
  ) return;

  // =========================
  // ELEMENTS
  // =========================

  const burger =
    document.getElementById(
      "burger"
    );

  const menu =
    document.querySelector(
      ".hero-steps"
    );

  if (!burger || !menu) return;

  // =========================
  // ADD HOME BUTTON
  // =========================

  if (
    !menu.querySelector(
      '[data-path="/"]'
    )
  ) {

    const home =
      document.createElement(
        "span"
      );

    home.textContent =
      "HOME";

    home.dataset.path =
      "/";

    menu.insertBefore(
      home,
      menu.children[1]
    );

  }

  // =========================
  // ACTIVE PAGE
  // =========================

  const current =
    location.pathname;

  menu
    .querySelectorAll("span")
    .forEach(item => {

      if (
        item.dataset.path === current
      ) {

        item.classList.add(
          "active"
        );

      }

    });

  // =========================
  // BACKDROP
  // =========================

  const backdrop =
    document.createElement("div");

  backdrop.className =
    "mobile-menu-backdrop";

  document.body.appendChild(
    backdrop
  );

  // =========================
  // STYLES
  // =========================

  const style =
    document.createElement("style");

  style.textContent = `

    /* =========================
       MENU VISIBLE
       ========================= */

    .hero-steps{
      visibility:visible !important;
    }

    /* =========================
       BACKDROP
       ========================= */

    .mobile-menu-backdrop{

      position:fixed;
      inset:0;

      z-index:1190;

      background:
        rgba(0,0,0,.14);

      backdrop-filter:
        blur(10px);

      -webkit-backdrop-filter:
        blur(10px);

      opacity:0;
      pointer-events:none;

      transition:
        opacity .22s ease;
    }

    .mobile-menu-backdrop.show{
      opacity:1;
      pointer-events:auto;
    }

    /* =========================
       MENU PANEL
       ========================= */

    .hero-steps{

      position:fixed !important;

      top:72px;
      left:50%;

      width:min(86vw, 320px);

      padding:
        52px 18px 16px;

      box-sizing:border-box;

      display:flex;
      flex-direction:column;
      gap:0;

      transform:
        translateX(-50%)
        translateY(-6px)
        scale(.985);

      opacity:0;
      pointer-events:none;

      z-index:1200;

      border-radius:32px;

      background:
        rgba(255,255,255,.94);

      backdrop-filter:
        blur(14px)
        saturate(180%);

      -webkit-backdrop-filter:
        blur(14px)
        saturate(180%);

      box-shadow:
        0 12px 40px rgba(0,0,0,.16),
        0 2px 10px rgba(0,0,0,.06),
        inset 0 1px 0 rgba(255,255,255,.7);

      transition:
        opacity .22s ease,
        transform .34s cubic-bezier(.22,1,.36,1);
    }

    .hero-steps.show{

      opacity:1;
      pointer-events:auto;

      transform:
        translateX(-50%)
        translateY(0)
        scale(1);
    }

    /* =========================
       MENU ITEMS
       ========================= */

    .hero-steps span{

      display:flex;
      align-items:center;

      min-height:44px;

      padding:0 2px 0 10px;

      box-sizing:border-box;

      border-bottom:
        1px solid rgba(0,0,0,.06);

      color:#9b111e !important;

      font-size:15px !important;
      font-weight:500;

      letter-spacing:-0.01em;

      background:none !important;
      box-shadow:none !important;

      transform:none !important;
      opacity:1 !important;

      border-radius:14px;

      transition:
        background .16s ease,
        color .16s ease;
    }

    .hero-steps span:last-child{
      border-bottom:none;
    }

    /* =========================
       ACTIVE PAGE
       ========================= */

    .hero-steps span.active{

      background:
        rgba(0,0,0,.06);

      font-weight:600;

      color:#9b111e !important;

      border-bottom:none;
    }

    /* =========================
       TAP
       ========================= */

    .hero-steps span:active{

      background:
        rgba(0,0,0,.08);
    }

    /* =========================
       CLOSE BUTTON
       ========================= */

    .menu-close{

      position:absolute;

      top:14px;
      left:14px;

      width:28px;
      height:28px;

      display:flex;
      align-items:center;
      justify-content:center;

      border-radius:50%;

      background:
        rgba(255,255,255,.88);

      color:#111;

      font-size:17px;
      line-height:1;

      box-shadow:
        0 4px 12px rgba(0,0,0,.12);

      cursor:pointer;

      z-index:2;
    }

    .menu-close:active{

      transform:scale(.94);
    }

    /* =========================
       BURGER
       ========================= */

.burger{

  position:fixed;

  top:14px;
  left:12px;

  width:46px;
  height:46px;

  display:flex;
  align-items:center;
  justify-content:center;

  font-size:36px;
  line-height:1;

  color:#fff;

  cursor:pointer;

  z-index:1300;
}

  `;

  document.head.appendChild(
    style
  );

  // =========================
  // OPEN
  // =========================

  function openMenu() {

    menu.classList.add(
      "show"
    );

    backdrop.classList.add(
      "show"
    );

    document.body.style.overflow =
      "hidden";

  }

  // =========================
  // CLOSE
  // =========================

  function closeMenu() {

    menu.classList.remove(
      "show"
    );

    backdrop.classList.remove(
      "show"
    );

    document.body.style.overflow =
      "";

  }

  // =========================
  // EVENTS
  // =========================

  burger.addEventListener(
    "click",
    openMenu
  );

  backdrop.addEventListener(
    "click",
    closeMenu
  );

  document
    .querySelector(".menu-close")
    ?.addEventListener(
      "click",
      closeMenu
    );

  menu
    .querySelectorAll("span")
    .forEach(item => {

      item.addEventListener(
        "click",
        closeMenu
      );

    });

})();