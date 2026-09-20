(function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const headerInner = document.querySelector(".site-header__inner");
  const closeBtn = nav && nav.querySelector(".nav-close");
  /* Must match CSS: drawer below 1024px, inline header at 1024+ */
  const mq = window.matchMedia("(max-width: 1023px)");

  if (toggle && nav && headerInner) {
    const backdrop = document.createElement("button");
    backdrop.type = "button";
    backdrop.className = "nav-backdrop";
    backdrop.setAttribute("aria-label", "Close menu");
    backdrop.hidden = true;
    document.body.appendChild(backdrop);

    const setNavOpen = (open) => {
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      backdrop.hidden = !open;
    };

    const placeNav = () => {
      if (mq.matches) {
        document.body.appendChild(nav);
      } else {
        setNavOpen(false);
        headerInner.appendChild(nav);
      }
    };

    toggle.addEventListener("click", () => {
      setNavOpen(!nav.classList.contains("is-open"));
    });

    closeBtn?.addEventListener("click", () => setNavOpen(false));
    backdrop.addEventListener("click", () => setNavOpen(false));

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setNavOpen(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) setNavOpen(false);
    });

    mq.addEventListener("change", placeNav);
    placeNav();
  }

  document.querySelectorAll(".audio-item__play").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.setAttribute("aria-pressed", btn.getAttribute("aria-pressed") === "true" ? "false" : "true");
    });
  });
})();
