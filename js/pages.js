(function () {
  if (!document.body.classList.contains("page-faq")) {
    return;
  }

  document.querySelectorAll(".faq-item__q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      if (!item) return;
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  document.querySelectorAll(".faq-topic__head").forEach((btn) => {
    btn.addEventListener("click", () => {
      const topic = btn.closest(".faq-topic");
      if (!topic) return;
      const panel = topic.querySelector(".faq-topic__panel");
      if (!panel) return;
      const nextOpen = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", nextOpen ? "true" : "false");
      panel.hidden = !nextOpen;
      topic.classList.toggle("is-open", nextOpen);
    });
  });

  document.querySelectorAll(".faq-tags__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".faq-tags__btn").forEach((tag) => {
        tag.classList.remove("is-active");
        tag.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
    });
  });
})();
