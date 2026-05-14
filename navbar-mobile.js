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
       HIDE DESKTOP MENU
       ========================= */

    .hero-steps{
      visibility: visible !important;
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
        opacity .24s ease;
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

      width:min(92vw, 360px);

      padding:
        18px 20px 20px;

      box-sizing:border-box;

      display:flex;
      flex-direction:column;
      gap:0;

      transform:
        translateX(-50%)
        translateY(-12px)
        scale(.96);

      opacity:0;
      pointer-events:none;

      z-index:1200;

      border-radius:32px;

      background:
        rgba(255,255,255,.72);

      backdrop-filter:
        blur(26px)
        saturate(180%);

      -webkit-backdrop-filter:
        blur(26px)
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

      min-height:54px;

      padding:0 4px;

      box-sizing:border-box;

      border-bottom:
        1px solid rgba(0,0,0,.06);

      color:#111 !important;

      font-size:16px !important;
      font-weight:500;

      letter-spacing:-0.01em;

      background:none !important;
      box-shadow:none !important;

      transform:none !important;
      opacity:1 !important;
    }

    .hero-steps span:last-child{
      border-bottom:none;
    }

    /* =========================
       CLOSE BUTTON
       ========================= */

    .menu-close{

      position:absolute;

      top:14px;
      right:14px;

      width:30px;
      height:30px;

      display:flex;
      align-items:center;
      justify-content:center;

      border-radius:50%;

      background:
        rgba(255,255,255,.88);

      color:#111;

      font-size:18px;

      box-shadow:
        0 4px 12px rgba(0,0,0,.12);

      cursor:pointer;
    }

    /* =========================
       BURGER
       ========================= */

    .burger{
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

  // close on menu click
  menu
    .querySelectorAll("span")
    .forEach(item => {

      item.addEventListener(
        "click",
        closeMenu
      );

    });

})();