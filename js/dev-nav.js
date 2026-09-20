(function () {
  const root = document.querySelector("[data-dev-nav]");
  if (!root) return;

  const toggle = root.querySelector(".dev-nav__toggle");
  const panel = root.querySelector(".dev-nav__panel");
  if (!toggle || !panel) return;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    panel.hidden = !open;
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
    }
  });
})();
