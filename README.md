
# Visual Kitha - Sistem Manajemen Konten & Booking

Selamat datang di Visual Kitha! Ini adalah aplikasi web lengkap yang dibuat dengan Next.js, Firebase, dan Tailwind CSS, yang dirancang untuk mengelola bisnis penyewaan peralatan event, khususnya videotron. Aplikasi ini terdiri dari dua bagian utama: situs web publik (frontend) untuk menampilkan layanan, dan panel admin (backend) yang kuat untuk mengelola semua aspek bisnis.

## Fitur Utama

### Panel Admin (/admin)

- **Dasbor Admin:** Gambaran umum bisnis Anda, menampilkan statistik kunci, event mendatang, dan pembayaran yang tertunda.
- **Manajemen Booking:** Buat, edit, dan lacak semua booking event. Tetapkan status (Draf, Dikonfirmasi, Selesai, dll.) dan status pembayaran (Belum Bayar, DP, Lunas).
- **Manajemen Klien:** Kelola basis data klien Anda, termasuk informasi kontak, perusahaan, dan catatan khusus.
- **Manajemen Tim:** Tambah dan kelola anggota tim teknis Anda, tetapkan peran, dan lacak status ketersediaan mereka (Tersedia, Bertugas, Cuti).
- **Manajemen Inventaris:** Lacak semua peralatan Anda (Videotron, kabel, dll.). Kelola status setiap item (Tersedia, Dipinjam, Maintenance).
- **Kalender Jadwal:** Tampilan kalender visual dari semua event yang telah dibooking, dengan kode warna berdasarkan status acara untuk perencanaan yang mudah.
- **Pembuatan Faktur:** Hasilkan faktur PDF yang terlihat profesional secara otomatis dari data booking. Termasuk fitur untuk mencetak dan membagikan ringkasan via WhatsApp.
- **Manajemen Konten Situs:**
    - **Blog:** Tulis dan kelola artikel blog dengan kategori dan status (Diterbitkan/Draf).
    - **Halaman:** Edit konten halaman statis seperti "Tentang Kami".
    - **Gambar Situs:** Perbarui gambar-gambar utama yang ditampilkan di seluruh situs web publik.
- **Otentikasi Aman:** Halaman login yang aman untuk mengakses panel admin, didukung oleh Firebase Authentication.

### Situs Web Publik (Frontend)

- **Desain Modern & Responsif:** Antarmuka yang bersih dan profesional yang terlihat bagus di semua perangkat.
- **Halaman Dinamis:** Konten untuk halaman seperti "Tentang Kami", "Layanan", dan "Blog" diambil langsung dari CMS, membuatnya mudah diperbarui.
- **Portofolio & Layanan:** Menampilkan katalog layanan dan peralatan yang diambil dari inventaris di CMS.
- **Blog:** Menampilkan artikel yang diterbitkan dari CMS untuk berbagi berita, tips, dan update.
- **Formulir Kontak:** Formulir kontak yang terintegrasi dengan WhatsApp untuk pertanyaan pelanggan yang mudah.

## Tumpukan Teknologi

- **Framework:** Next.js (dengan App Router)
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS
- **Komponen UI:** ShadCN UI
- **Database & Otentikasi:** Firebase (Firestore, Authentication, Storage)
- **Fungsi AI:** Genkit (untuk fitur seperti pembuatan deskripsi produk)

## Panduan Memulai

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

### 1. Prasyarat

- Node.js (v18 atau lebih baru)
- NPM atau Yarn

### 2. Kloning Repositori

```bash
git clone https://github.com/your-username/visual-kitha-cms.git
cd visual-kitha-cms
```

### 3. Instal Dependensi

```bash
npm install
```

### 4. Konfigurasi Variabel Lingkungan

Buat file `.env` di direktori root proyek dan tambahkan kredensial Firebase Anda. Anda bisa mendapatkan kredensial ini dari konsol Firebase proyek Anda.

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. Jalankan Server Pengembangan

```bash
npm run dev
```

Aplikasi sekarang akan berjalan di `http://localhost:9002`. Panel admin dapat diakses di `http://localhost:9002/admin`.

## Struktur Proyek

Berikut adalah gambaran singkat tentang struktur direktori utama:

```
.
├── src
│   ├── app
│   │   ├── (admin)         # Rute dan UI untuk panel admin
│   │   ├── (frontend)      # Rute dan UI untuk situs web publik
│   │   ├── api             # Rute API (jika diperlukan)
│   │   └── layout.tsx      # Layout root
│   ├── components
│   │   ├── admin           # Komponen React khusus untuk admin
│   │   ├── frontend        # Komponen React khusus untuk frontend
│   │   └── ui              # Komponen UI ShadCN yang dapat digunakan kembali
│   ├── lib
│   │   ├── actions.ts      # Server Actions untuk mutasi data
│   │   ├── data.ts         # Fungsi untuk mengambil data dari Firestore
│   │   ├── firebase.ts     # Konfigurasi inisialisasi Firebase
│   │   └── types.ts        # Definisi tipe TypeScript untuk seluruh aplikasi
│   └── ai
│       ├── flows           # Alur kerja Genkit untuk fitur AI
│       └── genkit.ts       # Konfigurasi Genkit
└── ...
```

## Deployment

Aplikasi ini siap untuk di-deploy ke platform hosting mana pun yang mendukung Next.js. File `apphosting.yaml` sudah dikonfigurasi untuk deployment mudah ke **Firebase App Hosting**. Anda juga dapat mendeploynya ke Vercel, Netlify, atau layanan serupa.
