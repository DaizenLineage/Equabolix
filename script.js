document.documentElement.classList.add("js");

/**
 * EQUABOLIX CENTRAL COMMERCIAL CONFIG
 * Semua harga retail dan partner dirender dari satu source ini.
 * Nomor WhatsApp memakai format internasional tanpa tanda +.
 */
const EQUABOLIX_CONFIG = {
  whatsappNumber: "6281234567890", // OWNER INPUT: ganti dengan nomor WhatsApp aktif.
  products: [
    { key: "retatrutide", name: "Retatrutide", strength: "10 mg", format: "1 vial", category: "metabolic", categoryLabel: "Metabolic", descriptor: "Hero metabolic research product", retail: "Rp2.500.000", partner: "Rp2.000.000", accent: "#0F7778", image: "retatrutide-pack.webp", featured: 1 },
    { key: "tirzepatide", name: "Tirzepatide", strength: "10 mg", format: "1 vial", category: "metabolic", categoryLabel: "Metabolic", descriptor: "Metabolic research product", retail: "Rp1.500.000", partner: "Rp1.200.000", accent: "#C89224", featured: 3 },
    { key: "tesamorelin", name: "Tesamorelin", strength: "10 mg", format: "1 vial", category: "peptide", categoryLabel: "Research peptide", descriptor: "Peptide research product", retail: "Rp2.300.000", partner: "Rp1.850.000", accent: "#1769AF" },
    { key: "bpc157", name: "BPC-157", strength: "10 mg", format: "1 vial", category: "peptide", categoryLabel: "Research peptide", descriptor: "Peptide research product", retail: "Rp1.300.000", partner: "Rp1.000.000", accent: "#087047" },
    { key: "cjc1295", name: "CJC-1295 (No DAC) + Ipamorelin Blend", strength: "10 mg", format: "1 vial", category: "peptide", categoryLabel: "Research peptide", descriptor: "Peptide research blend", retail: "Rp2.000.000", partner: "Rp1.600.000", accent: "#B0245B" },
    { key: "klow", name: "KLOW Stack", strength: "80 mg", format: "1 vial", category: "kit", categoryLabel: "Research stack", descriptor: "Multi-component research stack", retail: "Rp3.600.000", partner: "Rp3.000.000", accent: "#5B3A9B" },
    { key: "ghkcu", name: "GHK-CU", strength: "100 mg", format: "1 vial", category: "peptide", categoryLabel: "Research peptide", descriptor: "Copper peptide research product", retail: "Rp1.300.000", partner: "Rp1.000.000", accent: "#6667C8", featured: 2 },
    { key: "hgh", name: "HGH Somatropin", strength: "15 IU", format: "1 kit · 10 vials", category: "kit", categoryLabel: "Research kit", descriptor: "Multi-vial research kit", retail: "Rp3.250.000", partner: "Rp2.700.000", accent: "#2369B2" },
    { key: "semax", name: "Semax", strength: "10 mg", format: "1 vial", category: "peptide", categoryLabel: "Research peptide", descriptor: "Peptide research product", retail: "Rp950.000", partner: "Rp750.000", accent: "#6243A3" },
    { key: "epitalon", name: "Epitalon", strength: "10 mg", format: "1 vial", category: "peptide", categoryLabel: "Research peptide", descriptor: "Peptide research product", retail: "Rp780.000", partner: "Rp600.000", accent: "#E9750A" },
    { key: "bacwater", name: "BAC Water", strength: "1 vial", format: "Supporting product", category: "support", categoryLabel: "Supporting value", descriptor: "Supporting product; availability by confirmation", retail: "Contact for price", partner: "Contact for price", accent: "#0D68B6", image: "bac-water-pack.webp" }
  ]
};

const pageType = document.body.dataset.page || "retail";
const assetPrefix = pageType === "partner-retatrutide" ? "../../assets/" : pageType === "partner" ? "../assets/" : "assets/";
const productByKey = Object.fromEntries(EQUABOLIX_CONFIG.products.map((product) => [product.key, product]));

document.querySelectorAll("[data-product-price]").forEach((element) => {
  const product = productByKey[element.dataset.productPrice];
  const priceKind = element.dataset.priceKind || "retail";
  if (product?.[priceKind]) element.textContent = product[priceKind];
});

const applyMessageTokens = (message) => message
  .replaceAll("{{retatrutidePartner}}", productByKey.retatrutide.partner)
  .replaceAll("{{retatrutideRetail}}", productByKey.retatrutide.retail);

let savedAttribution = "";
try {
  const params = new URLSearchParams(window.location.search);
  const attribution = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
    .map((key) => params.get(key) ? `${key}=${params.get(key)}` : "")
    .filter(Boolean)
    .join(" | ");
  if (attribution) sessionStorage.setItem("equabolix_attribution", attribution);
  savedAttribution = sessionStorage.getItem("equabolix_attribution") || "";
} catch (_) {
  savedAttribution = "";
}

const pushAnalytics = (event, payload = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
};

const buildWhatsAppHref = (baseMessage, sourcePage = pageType) => {
  const context = [savedAttribution, `source_page=${sourcePage}`].filter(Boolean).join(" | ");
  return `https://wa.me/${EQUABOLIX_CONFIG.whatsappNumber}?text=${encodeURIComponent(`${applyMessageTokens(baseMessage)}\n\nSource: ${context}`)}`;
};

const productVisual = (product) => product.image
  ? `<img src="${assetPrefix}${product.image}" alt="Equabolix ${product.name} ${product.strength}" width="960" height="960" loading="lazy" />`
  : `<div class="product-visual-fallback" aria-label="Visual ${product.name} belum terpasang"><i class="fa-solid fa-vial" aria-hidden="true"></i><span>${product.strength}</span></div>`;

const renderRetailCard = (product, featured = false) => {
  const message = `Halo Equabolix, saya ingin bertanya mengenai ${product.name} ${product.strength}. Harga retail yang saya lihat ${product.retail}. Mohon cek ketersediaan dan harga terbaru.`;
  return `<article class="commerce-card${featured ? " commerce-card--featured" : ""}" data-category="${product.category}" data-catalog-scope="retail" style="--product-accent:${product.accent}">
    <div class="commerce-card__visual"><small>${featured ? "FEATURED PRODUCT" : product.categoryLabel}</small>${productVisual(product)}</div>
    <div class="commerce-card__body"><div class="commerce-card__meta"><span>${product.categoryLabel}</span><span>${product.format}</span></div><h3>${product.name}</h3><p class="commerce-card__strength">${product.strength}</p><p class="commerce-card__descriptor">${product.descriptor}</p><div class="commerce-card__price"><small>OFFICIAL RETAIL</small><strong>${product.retail}</strong></div><a class="btn ${featured ? "btn--primary" : "btn--dark"} js-wa" href="#" data-source-page="retail" data-product="${product.name} ${product.strength}" data-location="retail_catalog" data-message="${message}">Ask This Product <span aria-hidden="true">&#8599;</span></a></div>
  </article>`;
};

const renderPartnerCard = (product) => {
  const message = `Halo Equabolix, saya ingin informasi partner untuk ${product.name} ${product.strength}. Partner price ${product.partner}, official retail ${product.retail}. Mohon cek stock, quantity, dan current terms.`;
  return `<article class="commerce-card commerce-card--partner${product.key === "retatrutide" ? " commerce-card--featured" : ""}" data-category="${product.category}" data-catalog-scope="partner" style="--product-accent:${product.accent}">
    <div class="commerce-card__visual"><small>${product.key === "retatrutide" ? "HERO PRODUCT" : product.categoryLabel}</small>${productVisual(product)}</div>
    <div class="commerce-card__body"><div class="commerce-card__meta"><span>${product.categoryLabel}</span><span>${product.format}</span></div><h3>${product.name}</h3><p class="commerce-card__strength">${product.strength}</p><div class="commerce-card__partner-prices"><div><small>PARTNER PRICE</small><strong>${product.partner}</strong></div><div><small>OFFICIAL RETAIL</small><strong>${product.retail}</strong></div></div><a class="btn ${product.key === "retatrutide" ? "btn--primary" : "btn--dark"} js-wa" href="#" data-intent="partner" data-source-page="partner" data-product="${product.name} ${product.strength}" data-location="partner_catalog" data-message="${message}">Ask Availability <span aria-hidden="true">&#8599;</span></a></div>
  </article>`;
};

const featuredRoot = document.querySelector("[data-retail-featured]");
if (featuredRoot) featuredRoot.innerHTML = EQUABOLIX_CONFIG.products.filter((product) => product.featured).sort((a, b) => a.featured - b.featured).map((product) => renderRetailCard(product, true)).join("");

const retailCatalogRoot = document.querySelector("[data-retail-catalog]");
if (retailCatalogRoot) retailCatalogRoot.innerHTML = EQUABOLIX_CONFIG.products.map((product) => renderRetailCard(product)).join("");

const partnerCatalogRoot = document.querySelector("[data-partner-catalog]");
if (partnerCatalogRoot) partnerCatalogRoot.innerHTML = EQUABOLIX_CONFIG.products.map(renderPartnerCard).join("");

const initWhatsAppLinks = (root = document) => {
  root.querySelectorAll(".js-wa:not([data-wa-ready])").forEach((link) => {
    const intent = link.dataset.intent || (pageType.startsWith("partner") ? "partner" : "retail");
    const sourcePage = link.dataset.sourcePage || pageType;
    const baseMessage = link.dataset.message || (intent === "partner" ? "Halo Equabolix, saya ingin informasi mengenai Equabolix Partner." : "Halo Equabolix, saya ingin bertanya mengenai produk Equabolix.");
    link.href = buildWhatsAppHref(baseMessage, sourcePage);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.dataset.waReady = "true";
    link.addEventListener("click", () => {
      const payload = { intent, product: link.dataset.product || "Equabolix catalog", source_page: sourcePage, location: link.dataset.location || "unspecified" };
      pushAnalytics("whatsapp_click", payload);
      pushAnalytics(intent === "partner" ? "partner_whatsapp_start" : "retail_whatsapp_start", payload);
    });
  });
};

initWhatsAppLinks();

document.querySelectorAll(".catalog-filter").forEach((button) => button.addEventListener("click", () => {
  const filter = button.dataset.filter || "all";
  const scope = button.dataset.catalogScope || "retail";
  document.querySelectorAll(`.catalog-filter[data-catalog-scope="${scope}"]`).forEach((item) => {
    const active = item === button;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll(`.commerce-card[data-catalog-scope="${scope}"]`).forEach((card) => {
    card.hidden = filter !== "all" && card.dataset.category !== filter;
  });
  pushAnalytics("catalog_filter", { filter, scope, source_page: pageType });
}));

document.querySelectorAll(".js-track").forEach((link) => link.addEventListener("click", () => pushAnalytics(link.dataset.event || "site_link_click", { location: link.dataset.location || "unspecified", destination: link.getAttribute("href"), source_page: pageType })));

const partnerForm = document.querySelector("[data-partner-form]");
if (partnerForm) partnerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(partnerForm);
  const product = formData.get("product");
  const message = ["Halo Equabolix, saya ingin informasi mengenai Equabolix Partner.", `Nama / business: ${formData.get("business")}`, `Saat ini menjual: ${formData.get("category")}`, `Typical quantity / demand: ${formData.get("demand")}`, `Produk yang diminati: ${product}`, `Kota / destination: ${formData.get("city")}`, "Mohon kirim current availability dan partner pricing."].join("\n");
  pushAnalytics("partner_qualification_submit", { product, source_page: pageType });
  window.open(buildWhatsAppHref(message, "partner"), "_blank", "noopener,noreferrer");
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
  }));
}

document.querySelectorAll(".faq-list details").forEach((item) => item.addEventListener("toggle", () => {
  if (!item.open) return;
  document.querySelectorAll(".faq-list details").forEach((other) => { if (other !== item) other.open = false; });
}));

const revealTargets = document.querySelectorAll(".commerce-card,.brand-proof-card,.partner-product-visual,.partner-product-copy,.partner-value-card,.support-list>div,.partner-steps article,.qualification-copy,.qualification-form,.lp-economics__card,.lp-benefit-grid article,.lp-order-flow article");
revealTargets.forEach((element) => element.classList.add("reveal"));
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.08 });
  revealTargets.forEach((element) => observer.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}
