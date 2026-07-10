# Portofolio Imat Abu Kamal - Konversi React Modular

Aplikasi ini adalah hasil konversi dari sebuah halaman web HTML/CSS statis menjadi sebuah aplikasi **React 18+** dengan bundler **Vite** yang sangat modular, responsif, dan terstruktur dengan baik menggunakan **TypeScript**.

Seluruh struktur visual, animasi CSS asli, dan skema warna telah dipertahankan sepenuhnya tanpa ada perubahan pada estetika desain asli, melainkan ditransformasikan menjadi arsitektur berbasis komponen modern.

---

## 🚀 Fitur Utama & Keunggulan

1. **Komponen Modular & Reusable**: Memecah halaman monolitik asli menjadi komponen-komponen React kecil yang memiliki tugas khusus (Single Responsibility Principle).
2. **Koneksi Google Sheets API**: Integrasi asli secara asinkronus ke Google Apps Script Web App untuk menarik data beranda, tentang saya, keahlian, detail kontak, dan tautan sosial secara langsung.
3. **Formulir Interaktif (Kirim Pesan)**:
   - Validasi formulir secara *real-time* (pada saat di-blur dan saat mengetik).
   - Validasi khusus nomor telepon (harus diawali angka 0 dan minimal 8 digit).
   - Efek progres pengiriman visual (*simulated progress bar*).
   - Integrasi langsung ke Google Sheets untuk menyimpan kiriman pesan pengguna.
   - Menggunakan **SweetAlert2** untuk memberikan respons dialog yang indah.
4. **Navigasi Single-Page Application (SPA)**: Perpindahan tab antar-halaman yang mulus (`Beranda`, `Tentang`, `Gallery`, `Kontak`) dengan penanganan transisi CSS asli.
5. **Back to Top**: Tombol melayang pintar yang hanya muncul saat pengguna menggulir ke bawah, dengan fungsi gulir halus kembali ke atas.
6. **Responsif & Ramah Seluler**: Menu hamburger khusus seluler yang terintegrasi secara dinamis dengan penanganan *overflow scroll* tubuh halaman.

---

## 📂 Struktur Folder Proyek

```text
/
├── index.html               # Entry point HTML utama (memuat Google Fonts & FontAwesome)
├── metadata.json            # Metadata aplikasi untuk Google AI Studio
├── package.json             # Konfigurasi dependensi npm & skrip build
├── tsconfig.json            # Konfigurasi TypeScript
├── vite.config.ts           # Konfigurasi Vite
└── src/
    ├── main.tsx             # Entry point React
    ├── App.tsx              # Koordinator utama state aplikasi, fetch API, dan layout halaman
    ├── index.css            # Gaya CSS global, termasuk semua styling & animasi asli
    ├── types.ts             # Definisi tipe & interface TypeScript untuk seluruh data portofolio
    └── components/          # Komponen UI modular
        ├── Navbar.tsx       # Navigasi atas, logo responsif, dan menu hamburger seluler
        ├── BerandaSection.tsx # Section Hero (Beranda) dinamis dengan pemuatan asinkronus
        ├── TentangSection.tsx # Section Tentang Saya dengan foto profil dan detail keahlian
        ├── GallerySection.tsx # Bento-grid kartu keahlian/gallery dengan efek hover interaktif
        ├── ContactSection.tsx # Detail kontak interaktif & integrasi peta (iframe)
        ├── MessageModal.tsx   # Modal kirim pesan, validasi formulir, & integrasi Apps Script
        ├── Footer.tsx         # Footer dengan hak cipta dinamis dan tautan media sosial
        └── BackToTop.tsx      # Tombol melayang "Kembali ke Atas"
```

---

## 🛠️ Cara Menjalankan Aplikasi di Lokal

### Prasyarat
Pastikan Anda sudah menginstal **Node.js** di komputer Anda.

### Langkah-langkah
1. **Instalasi Dependensi**:
   ```bash
   npm install
   ```

2. **Menjalankan Server Pengembangan (Dev)**:
   ```bash
   npm run dev
   ```
   Buka browser Anda di `http://localhost:3000` (atau port default yang disiapkan oleh lingkungan Anda).

3. **Membangun untuk Produksi (Build)**:
   ```bash
   npm run build
   ```
   Hasil build akhir yang dioptimalkan akan berada di dalam folder `/dist`.

---

## 💻 Penjelasan Komponen

### 1. `src/types.ts`
Menyediakan kontrak tipe data yang ketat untuk menjamin keamanan tipe (*type safety*) di seluruh aplikasi. Ini mendefinisikan interface seperti `LogoData`, `BerandaData`, `TentangData`, `GalleryItem`, `ContactData`, dan `FooterData`.

### 2. `src/App.tsx`
Bertindak sebagai *smart container* yang menangani pengambilan data portofolio dari URL Google Apps Script menggunakan `Promise.all`. Komponen ini mengatur status pemuatan (*loading*), galat (*error*), tab aktif, serta memicu kemunculan modal pesan.

### 3. `src/components/Navbar.tsx` & `BackToTop.tsx`
- **Navbar**: Mengubah sistem navigasi statis menjadi reaktif terhadap state halaman saat ini. Menangani pembukaan dan penutupan menu seluler dengan mencegah scroll pada body saat menu terbuka.
- **BackToTop**: Mendengarkan event scroll window secara efisien dan memperbarui state visibilitas tombol secara dinamis.

### 4. `src/components/MessageModal.tsx`
Mengimplementasikan semua logika pengiriman pesan yang canggih dengan SweetAlert2. Formulir ini divalidasi secara ketat dan mengirimkan data menggunakan objek `FormData` ke API eksternal yang dituju.
