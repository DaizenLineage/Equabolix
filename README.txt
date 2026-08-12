EQUABOLIX STATIC SITE V2
=========================

PERUBAHAN DARI VERSI SEBELUMNYA
- Hero visual diperbaiki agar tidak terpotong di desktop.
- Section "Product Visuals Packaging yang konsisten, bukan template acak" dihapus.
- Fokus halaman dipindahkan ke:
  1. Retatrutide 10 mg
  2. Bonus BAC Water
  3. Bonus 4 syringe
  4. Bonus 4 alcohol swab
  5. Lifestyle / balanced life visual
  6. Testimonials
- Layout dibangun ulang dari awal.

FILE UTAMA
- index.html
- styles.css
- script.js
- assets/

ASSET YANG DIPAKAI
- assets/equabolix-logo.png
- assets/retatrutide-packaging.png
- assets/bac-water-packaging.png
- assets/lifestyle-active.svg
- assets/lifestyle-nutrition.svg
- assets/lifestyle-balance.svg

YANG WAJIB DIGANTI SEBELUM PUBLIKASI
Buka script.js, lalu ganti:
- whatsappNumber
- displayPrice

CONTOH:
const EQUABOLIX_CONFIG = {
  whatsappNumber: "6281234567890",
  displayPrice: "Rp1.690.000"
};

CATATAN
- Website tidak memberi dosis, instruksi injeksi, atau protokol penggunaan.
- Testimoni ditulis untuk menekankan value, clarity, dan experience, bukan klaim hasil berlebihan.
- UTM dibawa ke WhatsApp untuk memudahkan tracking sumber lead.
