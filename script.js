const EQUABOLIX_CONFIG = {
  whatsappNumber: "6281234567890",
  displayPrice: "Rp1.690.000"
};

document.querySelectorAll("[data-price]").forEach((el) => {
  el.textContent = EQUABOLIX_CONFIG.displayPrice;
});

function getUTMString() {
  const params = new URLSearchParams(window.location.search);
  const allowed = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const collected = allowed
    .map((key) => params.get(key) ? `${key}:${params.get(key)}` : null)
    .filter(Boolean);
  return collected.length ? ` | ${collected.join(", ")}` : "";
}

document.querySelectorAll(".js-wa").forEach((link) => {
  const baseMessage = link.dataset.message || "Halo Equabolix, saya ingin cek stok.";
  const message = `${baseMessage}${getUTMString()}`;
  link.href = `https://wa.me/${EQUABOLIX_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  link.addEventListener("click", () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "whatsapp_click",
      label: baseMessage
    });
  });
});

const toggle = document.querySelector(".nav__toggle");
if (toggle) {
  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

document.querySelectorAll(".nav__menu a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  });
});

const revealTargets = document.querySelectorAll(
  ".hero-card, .trust-strip__grid > div, .bundle-card, .benefit-card, .lifestyle-card, .testimonial-card, .faq-list details"
);

revealTargets.forEach((el) => el.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
}