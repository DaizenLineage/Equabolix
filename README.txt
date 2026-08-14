EQUABOLIX STATIC WEBSITE — BRAND BIBLE V2 UPDATE
=================================================

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

2. displayPrice
   The current display value is Rp1.690.000.
   Changing it once updates every [data-price] element and WhatsApp analytics event.

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
[ ] Confirm the live displayPrice and bundle contents.
[ ] Upload index.html, styles.css, script.js, robots.txt, and the complete assets folder.
[ ] Test one WhatsApp CTA on the live domain.
[ ] Confirm analytics receives the whatsapp_click event if a dataLayer consumer is used.

