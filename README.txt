EQUABOLIX STATIC SITE V5.3
==========================

ROUTES
------
1. /                         Retail masterbrand and complete product catalog
2. /partner/                 Partner page with session passcode gate
3. /partner/retatrutide/     Protected focused Retatrutide partner page
4. /partner-ads/             Partner page duplicate for ads, without passcode
5. /partner-ads/retatrutide/ Ads-focused Retatrutide page, without passcode

PARTNER ACCESS
--------------
The protected partner routes use passcode EQUA2026. Access is retained for the
current browser session. Because this is a static website, the gate is a
client-side access layer rather than server-side authentication.

CENTRAL COMMERCIAL CONFIG
-------------------------
All retail and partner prices are defined once in script.js under:

  EQUABOLIX_CONFIG.products

Each product has retail and partner values. Catalog cards, Retatrutide price
anchors, and WhatsApp messages are generated from that source.

WHATSAPP
--------
Update EQUABOLIX_CONFIG.whatsappNumber in script.js with the active number in
international format without a plus sign. The current value is a placeholder.

PRODUCT ASSETS
--------------
Product cards use the official product assets available in assets/products/.
The active catalog contains exactly 12 SKUs; Retatrutide 10 mg and 30 mg are
first. Cards without a locally available PNG use the existing branded vial
fallback so the catalog never ships a broken image.

DEPLOYMENT
----------
This is a static site. Upload the complete folder while preserving all paths.
Open index.html locally for a basic preview, or serve the folder through any
static HTTP server for full route testing.

PRE-LAUNCH CHECKLIST
--------------------
[ ] Replace the WhatsApp placeholder number.
[ ] Confirm all 12 official SKU product images are present in assets/products/.
[ ] Confirm current stock and commercial terms.
[ ] Add a canonical production URL if available.
[ ] Connect production analytics if required.
