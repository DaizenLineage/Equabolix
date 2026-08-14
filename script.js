document.documentElement.classList.add("js");

/**
 * EQUABOLIX SITE CONFIG
 * Ganti 2 nilai ini saja untuk update nomor WhatsApp dan harga di seluruh website.
 */
const EQUABOLIX_CONFIG = {
  whatsappNumber: "6281234567890", // GANTI. Format internasional tanpa tanda +
  displayPrice: "Rp1.690.000"
};

document.querySelectorAll("[data-price]").forEach((el) => {
  el.textContent = EQUABOLIX_CONFIG.displayPrice;
});

// Simpan sumber traffic supaya konteks bisa ikut terbawa ke WhatsApp.
const params = new URLSearchParams(window.location.search);
const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const attribution = attributionKeys
  .map((key) => params.get(key) ? `${key}=${params.get(key)}` : "")
  .filter(Boolean)
  .join(" | ");

if (attribution) sessionStorage.setItem("equabolix_attribution", attribution);
const savedAttribution = sessionStorage.getItem("equabolix_attribution") || "";

document.querySelectorAll(".js-wa").forEach((link) => {
  const baseMessage = link.dataset.message || "Halo Equabolix, saya ingin cek stok Retatrutide 10 mg bundle.";
  const message = savedAttribution ? `${baseMessage}\n\nSource: ${savedAttribution}` : baseMessage;
  link.href = `https://wa.me/${EQUABOLIX_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.addEventListener("click", () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "whatsapp_click", product: "Retatrutide 10 mg Bundle", price: EQUABOLIX_CONFIG.displayPrice });
  });
});

const toggle = document.querySelector(".nav__toggle");
const navLinks = document.querySelector(".nav__links");
if (toggle && navLinks) {
  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  });
  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Buka menu");
  }));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Buka menu");
    }
  });
}

const faqItems = document.querySelectorAll(".faq-list details");
faqItems.forEach((item) => item.addEventListener("toggle", () => {
  if (!item.open) return;
  faqItems.forEach((other) => {
    if (other !== item) other.open = false;
  });
}));

const revealTargets = document.querySelectorAll(".friction-card,.bundle-card,.value-card,.comparison-panel,.product-media,.product-copy,.product-proof__head,.trust-copy,.trust-card,.packaging-gallery figure,.step,.faq-list details,.people-copy,.people-stage");
revealTargets.forEach((el) => el.classList.add("reveal"));
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .10 });
  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
}
