(() => {
  const toggle = document.querySelector(".nav-toggle");
  const inner = toggle?.closest(".topbar-inner");
  if (toggle && inner) {
    toggle.addEventListener("click", () => {
      const open = inner.classList.toggle("menu-active");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    inner.querySelectorAll(".nav a").forEach((link) => {
      link.addEventListener("click", () => {
        inner.classList.remove("menu-active");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 980 && inner.classList.contains("menu-active")) {
        inner.classList.remove("menu-active");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }
})();

(() => {
  const lightbox = document.querySelector("dialog.lightbox");
  if (!lightbox) return;

  const titleEl = lightbox.querySelector("[data-lightbox-title]");
  const imgEl = lightbox.querySelector("[data-lightbox-img]");
  const captionEl = lightbox.querySelector("[data-lightbox-caption]");
  const prevBtn = lightbox.querySelector("[data-lightbox-prev]");
  const nextBtn = lightbox.querySelector("[data-lightbox-next]");
  const closeBtn = lightbox.querySelector("[data-lightbox-close]");

  const items = Array.from(document.querySelectorAll("[data-lightbox-item]"));
  if (items.length === 0) return;

  let currentIndex = 0;

  const setIndex = (nextIndex) => {
    currentIndex = (nextIndex + items.length) % items.length;
    const item = items[currentIndex];

    const full = item.getAttribute("href");
    const caption = item.getAttribute("data-caption") || item.getAttribute("aria-label") || "";
    const title = item.getAttribute("data-title") || "Screenshots";
    const alt = item.querySelector("img")?.getAttribute("alt") || caption || "Screenshot";

    if (titleEl) titleEl.textContent = title;
    if (imgEl) {
      imgEl.src = full;
      imgEl.alt = alt;
    }
    if (captionEl) captionEl.textContent = caption;
  };

  const openAt = (index) => {
    setIndex(index);
    if (typeof lightbox.showModal === "function") {
      lightbox.showModal();
    } else {
      window.open(items[currentIndex].getAttribute("href"), "_blank", "noopener,noreferrer");
    }
  };

  items.forEach((item, index) => {
    item.addEventListener("click", (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      openAt(index);
    });
  });

  const safeClose = () => {
    if (lightbox.open) lightbox.close();
  };

  closeBtn?.addEventListener("click", () => safeClose());
  prevBtn?.addEventListener("click", () => setIndex(currentIndex - 1));
  nextBtn?.addEventListener("click", () => setIndex(currentIndex + 1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) safeClose();
  });

  window.addEventListener("keydown", (event) => {
    if (!lightbox.open) return;
    if (event.key === "ArrowLeft") setIndex(currentIndex - 1);
    if (event.key === "ArrowRight") setIndex(currentIndex + 1);
  });
})();

