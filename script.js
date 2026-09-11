document.documentElement.classList.add("js");

/**
 * EQUABOLIX CENTRAL COMMERCIAL CONFIG
 * Semua harga retail dan partner dirender dari satu source ini.
 * Nomor WhatsApp memakai format internasional tanpa tanda +.
 */
const EQUABOLIX_CONFIG = {
  whatsappNumber: "6281234567890", // OWNER INPUT: ganti dengan nomor WhatsApp aktif.
  partnerAccessCode: "EQUA2026",
  products: [
    { key: "retatrutide", name: "Retatrutide", strength: "10 mg", format: "1 vial", category: "retatrutide", categoryLabel: "Retatrutide", descriptor: "Hero metabolic research product", retail: "Rp1.200.000", partner: "Rp900.000", accent: "#0F7778", image: "retatrutide-pack.webp", featured: 1 },
    { key: "retatrutide30", name: "Retatrutide", strength: "30 mg", format: "1 vial", category: "retatrutide", categoryLabel: "Retatrutide", descriptor: "Higher-strength metabolic research product", retail: "Rp1.900.000", partner: "Rp1.500.000", accent: "#0F7778", image: "products/Retatrutide30.png", featured: 2 },
    { key: "ghkcu", name: "GHK-Cu", strength: "100 mg", format: "1 vial", category: "peptide", categoryLabel: "Research peptide", descriptor: "Copper peptide research product", retail: "Rp650.000", partner: "Rp500.000", accent: "#6667C8", image: "products/GHK-CU.png", featured: 3 },
    { key: "tesamorelin", name: "Tesamorelin", strength: "", format: "1 vial", category: "peptide", categoryLabel: "Research peptide", descriptor: "Peptide research product", retail: "Rp1.200.000", partner: "Rp900.000", accent: "#1769AF", image: "products/Tesamorelin.png" },
    { key: "tirzepatide", name: "Tirzepatide", strength: "", format: "1 vial", category: "metabolic", categoryLabel: "Metabolic", descriptor: "Metabolic research product", retail: "Rp800.000", partner: "Rp600.000", accent: "#C89224", image: "products/Tirzepatide.png" },
    { key: "cjc1295", name: "CJC-1295 + Ipamorelin", strength: "10 mg", format: "1 vial", category: "peptide", categoryLabel: "Research peptide", descriptor: "Peptide research blend", retail: "Rp1.200.000", partner: "Rp900.000", accent: "#B0245B", image: "products/CJC-1295.png" },
    { key: "bpc157", name: "BPC-157", strength: "10 mg", format: "1 vial", category: "peptide", categoryLabel: "Research peptide", descriptor: "Peptide research product", retail: "Rp650.000", partner: "Rp500.000", accent: "#087047", image: "products/BPC-157.png" },
    { key: "bpc157tb500", name: "BPC-157 + TB-500", strength: "20 mg", format: "1 vial", category: "peptide", categoryLabel: "Research peptide", descriptor: "Peptide research blend", retail: "Rp1.200.000", partner: "Rp900.000", accent: "#B0245B", image: "products/BPC-157 + TB-500.png" },
    { key: "motsc", name: "MOTS-C", strength: "40 mg", format: "1 vial", category: "peptide", categoryLabel: "Research peptide", descriptor: "Mitochondrial peptide research product", retail: "Rp1.500.000", partner: "Rp1.200.000", accent: "#9B102A", image: "products/MOTS-C.png" },
    { key: "selank", name: "Selank", strength: "10 mg", format: "1 vial", category: "peptide", categoryLabel: "Research peptide", descriptor: "Peptide research product", retail: "Rp520.000", partner: "Rp400.000", accent: "#4967CE", image: "products/Selank.png" },
    { key: "semax", name: "Semax", strength: "10 mg", format: "1 vial", category: "peptide", categoryLabel: "Research peptide", descriptor: "Peptide research product", retail: "Rp520.000", partner: "Rp400.000", accent: "#6243A3", image: "products/Semax.png" },
    { key: "pt141", name: "PT-141", strength: "10 mg", format: "1 vial", category: "peptide", categoryLabel: "Research peptide", descriptor: "Peptide research product", retail: "Rp520.000", partner: "Rp400.000", accent: "#B0245B", image: "products/PT-141.png" }
  ]
};

const pageType = document.body.dataset.page || "retail";
const assetPrefix = pageType.endsWith("retatrutide") ? "../../assets/" : pageType.startsWith("partner") ? "../assets/" : "assets/";
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

const partnerGate = document.querySelector("[data-partner-gate]");
if (partnerGate) {
  const gateForm = partnerGate.querySelector("[data-partner-gate-form]");
  const gateInput = partnerGate.querySelector("[data-partner-gate-input]");
  const gateError = partnerGate.querySelector("[data-partner-gate-error]");
  const accessKey = "equabolix_partner_access";
  const unlockPartnerPage = () => {
    document.body.classList.remove("partner-gated");
    partnerGate.hidden = true;
    try { sessionStorage.setItem(accessKey, "granted"); } catch (_) { /* Session storage is optional. */ }
    pushAnalytics("partner_access_granted", { source_page: pageType });
  };

  try {
    if (sessionStorage.getItem(accessKey) === "granted") unlockPartnerPage();
  } catch (_) { /* Keep the gate visible when storage is unavailable. */ }

  gateForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (gateInput?.value.trim() === EQUABOLIX_CONFIG.partnerAccessCode) {
      unlockPartnerPage();
      return;
    }
    if (gateError) gateError.hidden = false;
    gateInput?.setAttribute("aria-invalid", "true");
    gateInput?.focus();
    pushAnalytics("partner_access_denied", { source_page: pageType });
  });

  gateInput?.addEventListener("input", () => {
    if (gateError) gateError.hidden = true;
    gateInput.removeAttribute("aria-invalid");
  });
}

const buildWhatsAppHref = (baseMessage, sourcePage = pageType) => {
  const context = [savedAttribution, `source_page=${sourcePage}`].filter(Boolean).join(" | ");
  return `https://wa.me/${EQUABOLIX_CONFIG.whatsappNumber}?text=${encodeURIComponent(`${applyMessageTokens(baseMessage)}\n\nSource: ${context}`)}`;
};

const productLabel = (product) => [product.name, product.strength].filter(Boolean).join(" ");

const productVisual = (product) => {
  if (!product.image) return "";
  return `<img src="${assetPrefix}${product.image}" alt="Equabolix ${productLabel(product)}" width="960" height="960" loading="lazy" data-product-image />`;
};

const renderRetailCard = (product, featured = false) => {
  const label = productLabel(product);
  const strength = product.strength ? `<p class="commerce-card__strength">${product.strength}</p>` : "";
  const message = `Halo Equabolix, saya ingin bertanya mengenai ${label}. Harga retail yang saya lihat ${product.retail}. Mohon cek ketersediaan dan harga terbaru.`;
  return `<article class="commerce-card${featured ? " commerce-card--featured" : ""}" data-category="${product.category}" data-catalog-scope="retail" style="--product-accent:${product.accent}">
    <div class="commerce-card__visual"><small>${featured ? "FEATURED PRODUCT" : product.categoryLabel}</small>${productVisual(product)}</div>
    <div class="commerce-card__body"><div class="commerce-card__meta"><span>${product.categoryLabel}</span><span>${product.format}</span></div><h3>${product.name}</h3>${strength}<p class="commerce-card__descriptor">${product.descriptor}</p><div class="commerce-card__price"><small>OFFICIAL RETAIL</small><strong>${product.retail}</strong></div><a class="btn ${featured ? "btn--primary" : "btn--dark"} js-wa" href="#" data-source-page="retail" data-product="${label}" data-location="retail_catalog" data-message="${message}">Ask This Product <span aria-hidden="true">&#8599;</span></a></div>
  </article>`;
};

const renderPartnerCard = (product) => {
  const label = productLabel(product);
  const strength = product.strength ? `<p class="commerce-card__strength">${product.strength}</p>` : "";
  const message = `Halo Equabolix, saya ingin informasi partner untuk ${label}. Partner Price ${product.partner}, Retail Price ${product.retail}. Mohon cek stock, quantity, dan current terms.`;
  return `<article class="commerce-card commerce-card--partner${product.key === "retatrutide" ? " commerce-card--featured" : ""}" data-category="${product.category}" data-catalog-scope="partner" style="--product-accent:${product.accent}">
    <div class="commerce-card__visual"><small>${product.key === "retatrutide" ? "HERO PRODUCT" : product.categoryLabel}</small>${productVisual(product)}</div>
    <div class="commerce-card__body"><div class="commerce-card__meta"><span>${product.categoryLabel}</span><span>${product.format}</span></div><h3>${product.name}</h3>${strength}<div class="commerce-card__partner-prices"><div><small>PARTNER PRICE</small><strong>${product.partner}</strong></div><div><small>RETAIL PRICE</small><strong>${product.retail}</strong></div></div><a class="btn ${product.key === "retatrutide" ? "btn--primary" : "btn--dark"} js-wa" href="#" data-intent="partner" data-source-page="${pageType}" data-product="${label}" data-location="partner_catalog" data-message="${message}">Ask Availability <span aria-hidden="true">&#8599;</span></a></div>
  </article>`;
};

const featuredRoot = document.querySelector("[data-retail-featured]");
if (featuredRoot) featuredRoot.innerHTML = EQUABOLIX_CONFIG.products.filter((product) => product.featured).sort((a, b) => a.featured - b.featured).map((product) => renderRetailCard(product, true)).join("");

const retailCatalogRoot = document.querySelector("[data-retail-catalog]");
if (retailCatalogRoot) retailCatalogRoot.innerHTML = EQUABOLIX_CONFIG.products.map((product) => renderRetailCard(product)).join("");

const partnerCatalogRoot = document.querySelector("[data-partner-catalog]");
if (partnerCatalogRoot) partnerCatalogRoot.innerHTML = EQUABOLIX_CONFIG.products.map(renderPartnerCard).join("");

document.querySelectorAll("[data-product-image]").forEach((image) => {
  const hideBrokenImage = () => { image.hidden = true; };
  image.addEventListener("error", hideBrokenImage, { once: true });
  if (image.complete && image.naturalWidth === 0) hideBrokenImage();
});

const initWhatsAppLinks = (root = document) => {
  root.querySelectorAll(".js-wa:not([data-wa-ready])").forEach((link) => {
    const intent = link.dataset.intent || (pageType.startsWith("partner") ? "partner" : "retail");
    const sourcePage = pageType.startsWith("partner-ads") ? pageType : (link.dataset.sourcePage || pageType);
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
  window.open(buildWhatsAppHref(message, pageType), "_blank", "noopener,noreferrer");
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
