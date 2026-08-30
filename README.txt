EQUABOLIX STATIC WEBSITE — MASTERBRAND + PARTNER V5
====================================================

STATUS
------
Static HTML/CSS/JS site. No build step is required.
Open index.html locally or upload the complete folder to static hosting.

IMPORTANT CONFIG BEFORE LIVE
----------------------------
Open script.js and update EQUABOLIX_CONFIG:

1. whatsappNumber
   Use the real international number without the + sign.
   The included value 6281234567890 is a placeholder inherited from V3.

2. launchPrice
   The current Launch Price is Rp1.100.000.
   Changing it once updates every [data-price] element and WhatsApp analytics event.

3. regularPrice
   The current regular reference price is Rp1.250.000.
   Changing it once updates every [data-regular-price] element and WhatsApp analytics event.

FINAL DECISION JOURNEY
----------------------
1. Product status + hero offer
2. Category friction
3. Bundle and fair value
4. Accessible Value Challenger positioning
5. Product detail + visual proof
6. Trust by design
7. Low-friction WhatsApp flow
8. Masterbrand progress territory
9. FAQ
10. Final WhatsApp CTA

V5 COMMERCIAL ROUTES
--------------------
Direct: /index.html
- Retatrutide-led product, value, trust, offer, and direct WhatsApp flow.

Partner: /partner/
- Dedicated B2B funnel for qualified reseller leads, catalog interest,
  partner economics, supply/support, short qualification, and WhatsApp.
- Wholesale prices are not published publicly.
- Retatrutide remains the hero product and launch wedge.

FINAL COPY BY SECTION
---------------------
Hero
- Eyebrow: EQUABOLIX RESEARCH SERIES
- Headline: Retatrutide 10 mg. Paket lebih masuk akal.
- Proposition: status transparent, price and bundle visible, direct WhatsApp confirmation.

Category friction
- Harga terlihat dari awal.
- Isi paket tidak tersebar.
- Status tidak disamarkan.

Offer
- Headline: Value yang bisa langsung dinilai.
- Retatrutide remains the commercial anchor.
- BAC Water, syringe, and alcohol swab remain supporting value.

Value
- Headline: Bukan sekadar harga menarik.
- Pillars: Fair value / Clear choice / Accessible confidence.

Product
- Retatrutide 10 mg
- Research use only. Not for human use.
- No efficacy, dosage, injection, or guaranteed-outcome claims.

Trust
- Headline: Confidence dimulai dari hal yang bisa diperiksa.
- Proof is based on clarity, consistency, status transparency, and direct confirmation.

Order flow
- See the offer / click WhatsApp / confirm current stock and price.

Progress
- Headline: Brand yang terasa dekat dengan kehidupan nyata.
- Lifestyle imagery is explicitly framed as masterbrand territory, not a product claim.

ASSET MAPPING
-------------
assets/equabolix-logo-master.png
- Header and footer masterbrand logo.

assets/retatrutide-vial-master.png
- Hero and product-detail commercial anchor.

assets/retatrutide-pack.webp
- Retatrutide bundle card.

assets/bac-water-pack.webp
- Supporting BAC Water bundle card.

assets/bac-water-bottle.png
- Small supporting bonus visual in the hero.

assets/retatrutide-packaging-board.png
- Retatrutide visual product proof.

assets/bac-water-packaging-board.png
- BAC Water supporting visual proof.

assets/active-woman.png + assets/active-man.png
- Masterbrand progress / balanced-life section only.

assets/fontawesome/
- Self-hosted Font Awesome Free 7.3.1 used for the three order-step icons.
- Includes the required CSS, solid webfont, and Font Awesome LICENSE.txt.

WHAT CHANGED FROM V3
--------------------
- Preserved the clean, bright, teal/coral visual DNA, spacing, typography, cards,
  rounded geometry, section rhythm, and WhatsApp funnel.
- Added Equabolix Research Series as a consistent product-status layer.
- Fixed the desktop hero collision/crop by constraining grid columns and headline size.
- Replaced the SVG lifestyle placeholder with the supplied human lifestyle imagery.
- Repaired missing packaging-board references using the supplied files.
- Rewrote internal-facing copy into customer-facing value and trust language.
- Added a visible value check without competitor claims or fake trust badges.
- Kept BAC Water subordinate to Retatrutide in hierarchy and labeling.
- Added keyboard-friendly menu behavior and single-open FAQ interaction.
- Preserved UTM attribution and the whatsapp_click dataLayer event.

WHAT CHANGED IN V5
------------------
- Added a compact Equabolix Partner entry point to the homepage and navigation.
- Added the static /partner route without changing the direct homepage hierarchy.
- Added a reusable, data-driven partner catalog in script.js.
- Separated direct and partner WhatsApp intent and analytics.
- Added partner qualification that continues directly to WhatsApp.
- Added B2B SEO metadata, mobile catalog behavior, and a compact sticky partner CTA.

V5 ANALYTICS EVENTS
-------------------
- whatsapp_click (legacy continuity)
- direct_whatsapp_start
- partner_whatsapp_start
- partner_cta_click
- catalog_product_click
- partner_product_interest
- partner_catalog_filter
- partner_qualification_submit

OWNER INPUT STILL REQUIRED
--------------------------
- Replace the placeholder WhatsApp number 6281234567890.
- Confirm MOQ and current partner commercial terms per SKU.
- Confirm current availability before publishing operational claims.
- Add approved product imagery for Tirzepatide, BPC-157, CJC-1295 blend,
  Epitalon, GHK-CU, HGH Somatropin, KLOW Stack, Semax, and Tesamorelin.
- Confirm which product information sheets, testing documents, and approved
  descriptions are verified and ready for partner distribution.

CONTENT GUARDRAILS
------------------
- Retatrutide 10 mg is consistently identified as Research Series.
- Research use only / Not for human use is never hidden.
- No medical claims, efficacy claims, guaranteed outcomes, dosing protocols,
  injection instructions, diagnosis, or prescription content is included.
- Healthy lifestyle imagery describes the Equabolix masterbrand territory only.

DEPLOYMENT CHECKLIST
--------------------
[ ] Replace the placeholder WhatsApp number in script.js.
[ ] Confirm the live launchPrice, regularPrice, and bundle contents.
[ ] Upload index.html, partner/index.html, styles.css, script.js, robots.txt, and the complete assets folder.
[ ] Test one WhatsApp CTA on the live domain.
[ ] Confirm analytics receives direct and partner events if a dataLayer consumer is used.
