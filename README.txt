EQUABOLIX STATIC SITE V5.1
==========================

ROUTES
------
1. /                         Retail masterbrand and complete product catalog
2. /partner/                 General B2B / reseller page
3. /partner/retatrutide/     High-intent Retatrutide partner landing page

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
The project currently contains official Retatrutide and BAC Water visuals.
Other SKU cards use a branded vial fallback so no broken image URLs ship.
When the remaining official PNG files are available inside this project, add
them to assets/products/ and map their filename in EQUABOLIX_CONFIG.products.

DEPLOYMENT
----------
This is a static site. Upload the complete folder while preserving all paths.
Open index.html locally for a basic preview, or serve the folder through any
static HTTP server for full route testing.

PRE-LAUNCH CHECKLIST
--------------------
[ ] Replace the WhatsApp placeholder number.
[ ] Add remaining official SKU product images.
[ ] Confirm current stock and commercial terms.
[ ] Add a canonical production URL if available.
[ ] Connect production analytics if required.
