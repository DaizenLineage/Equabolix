document.documentElement.classList.add("js");

/**
 * EQUABOLIX SITE CONFIG
 * Ganti 3 nilai ini saja untuk update nomor WhatsApp, Launch Price, dan harga reguler.
 */
const EQUABOLIX_CONFIG = {
  whatsappNumber: "6281234567890", // GANTI. Format internasional tanpa tanda +
  launchPrice: "Rp1.100.000",
  regularPrice: "Rp1.250.000"
};

document.querySelectorAll("[data-price]").forEach((el) => {
  el.textContent = EQUABOLIX_CONFIG.launchPrice;
});

document.querySelectorAll("[data-regular-price]").forEach((el) => {
  el.textContent = EQUABOLIX_CONFIG.regularPrice;
});

const applyPriceTokens = (message) => message
  .replaceAll("{{launchPrice}}", EQUABOLIX_CONFIG.launchPrice)
  .replaceAll("{{regularPrice}}", EQUABOLIX_CONFIG.regularPrice);

const PARTNER_PRODUCTS = [
  { name: "Retatrutide", strength: "10 mg", category: "metabolic", categoryLabel: "Metabolic", pack: "1 vial", accent: "#0F7778", image: "../assets/retatrutide-vial-master.png", hero: true },
  { name: "Tirzepatide", strength: "10 mg", category: "metabolic", categoryLabel: "Metabolic", pack: "1 vial", accent: "#C89224" },
  { name: "BPC-157", strength: "10 mg", category: "peptide", categoryLabel: "Research peptide", pack: "1 vial", accent: "#087047" },
  { name: "CJC-1295 + Ipamorelin Blend", strength: "10 mg", category: "peptide", categoryLabel: "Research peptide", pack: "1 vial", accent: "#B0245B" },
  { name: "Epitalon", strength: "10 mg", category: "peptide", categoryLabel: "Research peptide", pack: "1 vial", accent: "#E9750A" },
  { name: "GHK-CU", strength: "100 mg", category: "peptide", categoryLabel: "Research peptide", pack: "1 vial", accent: "#6667C8" },
  { name: "Semax", strength: "10 mg", category: "peptide", categoryLabel: "Research peptide", pack: "1 vial", accent: "#6243A3" },
  { name: "Tesamorelin", strength: "10 mg", category: "peptide", categoryLabel: "Research peptide", pack: "1 vial", accent: "#1769AF" },
  { name: "HGH Somatropin", strength: "15 IU", category: "kit", categoryLabel: "Research kit", pack: "1 kit · 10 vials", accent: "#2369B2" },
  { name: "KLOW Stack", strength: "80 mg", category: "kit", categoryLabel: "Research stack", pack: "1 vial", accent: "#5B3A9B" }
];

// Simpan sumber traffic supaya konteks bisa ikut terbawa ke WhatsApp.
const params = new URLSearchParams(window.location.search);
const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const attribution = attributionKeys
  .map((key) => params.get(key) ? `${key}=${params.get(key)}` : "")
  .filter(Boolean)
  .join(" | ");

if (attribution) sessionStorage.setItem("equabolix_attribution", attribution);
const savedAttribution = sessionStorage.getItem("equabolix_attribution") || "";

const pushAnalytics = (event, payload = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
};

const buildWhatsAppHref = (baseMessage, sourcePage = "") => {
  const sourceContext = [savedAttribution, sourcePage ? `source_page=${sourcePage}` : ""].filter(Boolean).join(" | ");
  const message = sourceContext ? `${applyPriceTokens(baseMessage)}\n\nSource: ${sourceContext}` : applyPriceTokens(baseMessage);
  return `https://wa.me/${EQUABOLIX_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

const renderPartnerCatalog = () => {
  const catalog = document.querySelector("[data-partner-catalog]");
  if (!catalog) return;

  catalog.innerHTML = PARTNER_PRODUCTS.map((product) => {
    const visual = product.image
      ? `<img src="${product.image}" alt="Equabolix ${product.name} ${product.strength}" loading="lazy" />`
      : '<i class="fa-solid fa-vial" aria-hidden="true"></i>';
    const message = `Halo Equabolix, saya tertarik partner/reseller dan ingin menanyakan wholesale price, current availability, serta quantity untuk ${product.name} ${product.strength}.`;
    return `<article class="catalog-card${product.hero ? " catalog-card--hero" : ""}" data-category="${product.category}" style="--product-accent:${product.accent}">
      <div class="catalog-card__visual"><small>${product.hero ? "HERO PRODUCT" : "EQUABOLIX RESEARCH"}</small>${visual}</div>
      <div class="catalog-card__body">
        <div class="catalog-card__meta"><span>${product.categoryLabel}</span><span class="catalog-card__status">Check availability</span></div>
        <h3>${product.name} <span>${product.strength}</span></h3>
        <p>${product.pack} · factual product specification · wholesale terms by qualification.</p>
        <a class="btn ${product.hero ? "btn--primary" : "btn--dark"} js-wa" href="#" data-intent="partner" data-source-page="partner" data-event="partner_product_interest" data-product="${product.name} ${product.strength}" data-location="partner_catalog" data-message="${message}">Ask Wholesale Price <span aria-hidden="true">&#8599;</span></a>
      </div>
    </article>`;
  }).join("");
};

const initWhatsAppLinks = (root = document) => {
  root.querySelectorAll(".js-wa:not([data-wa-ready])").forEach((link) => {
    const intent = link.dataset.intent || (document.body.dataset.page === "partner" ? "partner" : "direct");
    const sourcePage = link.dataset.sourcePage || "";
    const product = link.dataset.product || (intent === "direct" ? "Retatrutide 10 mg Bundle" : "Partner catalog");
    const baseMessage = link.dataset.message || (intent === "partner"
      ? "Halo Equabolix, saya tertarik partner/reseller dan ingin melihat wholesale pricing."
      : "Halo Equabolix, saya ingin cek stok Retatrutide 10 mg bundle.");

    link.href = buildWhatsAppHref(baseMessage, sourcePage);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.dataset.waReady = "true";
    link.addEventListener("click", () => {
      const common = { intent, product, source_page: sourcePage || "home", location: link.dataset.location || "unspecified" };
      pushAnalytics("whatsapp_click", {
        ...common,
        price: intent === "direct" ? EQUABOLIX_CONFIG.launchPrice : undefined,
        regular_price: intent === "direct" ? EQUABOLIX_CONFIG.regularPrice : undefined,
        price_type: intent === "direct" ? "launch" : undefined
      });
      pushAnalytics(intent === "partner" ? "partner_whatsapp_start" : "direct_whatsapp_start", common);
      if (link.dataset.event) pushAnalytics(link.dataset.event, common);
      if (link.closest(".catalog-card")) pushAnalytics("catalog_product_click", common);
    });
  });
};

renderPartnerCatalog();
initWhatsAppLinks();

document.querySelectorAll(".js-track").forEach((link) => {
  link.addEventListener("click", () => pushAnalytics(link.dataset.event || "site_link_click", {
    location: link.dataset.location || "unspecified",
    destination: link.getAttribute("href")
  }));
});

const catalogFilters = document.querySelectorAll(".catalog-filter");
catalogFilters.forEach((button) => button.addEventListener("click", () => {
  const filter = button.dataset.filter || "all";
  catalogFilters.forEach((item) => {
    const active = item === button;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll(".catalog-card").forEach((card) => {
    card.hidden = filter !== "all" && card.dataset.category !== filter;
  });
  pushAnalytics("partner_catalog_filter", { filter, source_page: "partner" });
}));

const partnerForm = document.querySelector("[data-partner-form]");
if (partnerForm) {
  partnerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(partnerForm);
    const product = formData.get("product");
    const message = [
      "Halo Equabolix, saya tertarik menjadi partner/reseller.",
      `Nama / business: ${formData.get("business")}`,
      `Saat ini menjual: ${formData.get("category")}`,
      `Typical quantity / demand: ${formData.get("demand")}`,
      `Produk yang diminati: ${product}`,
      `Kota / destination: ${formData.get("city")}`,
      "Saya ingin melihat current availability dan wholesale pricing."
    ].join("\n");
    pushAnalytics("partner_qualification_submit", { product, source_page: "partner" });
    pushAnalytics("partner_whatsapp_start", { intent: "partner", product, source_page: "partner", location: "qualification_form" });
    window.open(buildWhatsAppHref(message, "partner"), "_blank", "noopener,noreferrer");
  });
}

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

const revealTargets = document.querySelectorAll(".friction-card,.bundle-card,.value-card,.comparison-panel,.product-media,.product-copy,.product-proof__head,.trust-copy,.trust-card,.packaging-gallery figure,.step,.faq-list details,.people-copy,.people-stage,.partner-entry,.partner-card,.partner-value-card,.partner-product-visual,.partner-product-copy,.catalog-card,.catalog-pricing-note,.economics-layout,.ops-grid article,.reseller-support__intro,.support-list>div,.partner-steps article,.qualification-copy,.qualification-form");
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
