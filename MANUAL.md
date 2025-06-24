
# Buku Panduan Pengguna - Visual Kitha CMS

Selamat datang di buku panduan untuk **Visual Kitha Content Management System (CMS)**. Dokumen ini dirancang untuk membantu Anda, sebagai administrator, dalam mengelola seluruh aspek situs web dan operasional bisnis penyewaan peralatan event Anda.

## Daftar Isi
1. [Login ke Panel Admin](#1-login-ke-panel-admin)
2. [Memahami Dasbor](#2-memahami-dasbor)
3. [Menggunakan Kalender Jadwal](#3-menggunakan-kalender-jadwal)
4. [Manajemen Booking](#4-manajemen-booking)
5. [Manajemen Klien](#5-manajemen-klien)
6. [Manajemen Tim Teknis](#6-manajemen-tim-teknis)
7. [Manajemen Inventaris](#7-manajemen-inventaris)
8. [Faktur & Pembayaran](#8-faktur--pembayaran)
9. [Manajemen Situs (Konten)](#9-manajemen-situs-konten)
10. [Logout](#10-logout)

---

### 1. Login ke Panel Admin
Untuk memulai, Anda perlu masuk ke panel admin yang aman.

- **Akses:** Buka browser Anda dan navigasikan ke `[URLSitusAnda]/login`.
- **Kredensial:** Masukkan alamat email dan kata sandi yang telah terdaftar untuk akun admin.
- **Masuk:** Klik tombol **Login**. Jika berhasil, Anda akan diarahkan ke Dasbor Admin.

---

### 2. Memahami Dasbor
Dasbor adalah pusat kendali Anda. Halaman ini memberikan gambaran umum tentang bisnis Anda secara sekilas.

- **Kartu Statistik:** Menampilkan jumlah total Klien, Booking, Anggota Tim, Item Inventaris, dan Postingan Blog. Klik pada kartu mana pun untuk langsung menuju ke halaman manajemen terkait.
- **Notifikasi & Pengingat:**
    - **Event Mendatang:** Daftar acara yang dijadwalkan dalam 7 hari ke depan.
    - **Pembayaran Tertunda:** Daftar booking yang statusnya masih "Belum Bayar" atau "DP". Ini membantu Anda untuk melakukan tindak lanjut.
- **Ringkasan Terbaru:** Tabel yang menampilkan booking dan klien yang baru saja ditambahkan.

---

### 3. Menggunakan Kalender Jadwal
Fitur ini memberikan tampilan visual dari semua jadwal event Anda.

- **Navigasi:** Gunakan tombol `◄ Prev`, `Next ►`, dan `Hari Ini` untuk berpindah antar bulan. Anda juga bisa mengubah tampilan menjadi mingguan atau daftar.
- **Kode Warna:** Setiap event di kalender diberi warna sesuai statusnya:
    - **Biru:** Dikonfirmasi (Confirmed)
    - **Oranye:** Berjalan (Ongoing)
    - **Hijau:** Selesai (Completed)
    - **Merah:** Batal (Cancelled)
    - **Abu-abu:** Draf (Draft)
- **Lihat Detail:** Klik pada event mana pun untuk melihat detail ringkasnya dalam sebuah pop-up.

---

### 4. Manajemen Booking
Ini adalah fitur inti untuk mengelola semua pemesanan event.

**Membuat Booking Baru:**
1. Di halaman Manajemen Booking, klik tombol **"Booking Baru"**.
2. Sebuah formulir akan muncul. Isi detail berikut:
    - **Klien:** Pilih klien dari daftar yang sudah ada. Pastikan klien sudah ditambahkan terlebih dahulu di menu "Manajemen Klien".
    - **Detail Acara:** Isi Jenis Acara, Lokasi, dan pilih Tanggal Acara.
    - **Status:** Atur Status Booking (misalnya, "Dikonfirmasi") dan Status Pembayaran (misalnya, "DP").
    - **Keuangan:** Masukkan Total Tagihan dan Jumlah yang Sudah Dibayar.
    - **Penugasan Tim & Inventaris:** Centang anggota tim dan item inventaris yang akan ditugaskan untuk event ini.
    - **Checklist:** Tambahkan item pada "Checklist Kebutuhan Peralatan" dan "Checklist Tugas Tim" jika diperlukan.
3. Klik **"Buat Booking"** untuk menyimpan.

**Mengedit & Menghapus:**
- Gunakan tombol aksi (ikon titik tiga) di sebelah kanan setiap baris booking untuk **Mengedit** atau **Menghapus** data.

---

### 5. Manajemen Klien
Kelola semua data klien Anda di sini.

- **Menambah Klien Baru:** Klik tombol **"Klien Baru"**. Isi nama, perusahaan (opsional), kontak, dan catatan khusus.
- **Mengedit & Menghapus:** Gunakan tombol aksi untuk mengedit informasi atau menghapus klien. Menghapus klien tidak akan menghapus booking yang terkait dengannya.

---

### 6. Manajemen Tim Teknis
Kelola daftar kru atau tim teknis Anda.

- **Menambah Anggota Tim:** Klik **"Tambah Anggota Tim"**. Masukkan nama, peran/jabatan (misalnya, Teknisi Utama), dan atur status ketersediaannya.
- **Status Tim:**
    - **Tersedia (Available):** Siap untuk ditugaskan.
    - **Bertugas (On Duty):** Sedang mengerjakan event.
    - **Cuti (On Leave):** Tidak tersedia.
- **Mengedit & Menghapus:** Gunakan tombol aksi untuk memperbarui detail atau menghapus anggota tim.

---

### 7. Manajemen Inventaris
Lacak semua aset dan peralatan Anda.

- **Menambah Item Baru:** Klik **"Tambah Item"**.
- **Isi Detail:**
    - **Nama & URL Gambar:** Nama item dan link gambar produk.
    - **Status:** Atur status item (Tersedia, Dipinjam, Maintenance).
    - **Spesifikasi:** Tulis spesifikasi teknis utama (misalnya, "Pixel Pitch: 3.9mm").
    - **Deskripsi (dengan AI):** Setelah mengisi Nama dan Spesifikasi, Anda bisa mengklik tombol **"Hasilkan dengan AI"** untuk membuat deskripsi produk secara otomatis.
- **Mengedit & Menghapus:** Gunakan tombol aksi untuk memperbarui atau menghapus item dari daftar.

---

### 8. Faktur & Pembayaran
Buat dan kelola faktur untuk setiap booking.

1. Buka halaman **Manajemen Booking**.
2. Klik tombol aksi pada booking yang diinginkan, lalu pilih **"Lihat Faktur"**.
3. Halaman faktur akan dibuat secara otomatis berdasarkan data booking.
4. Di halaman ini, Anda bisa:
    - **Mencetak Faktur**
    - **Mengekspor ke PDF**
    - **Membagikan Ringkasan ke WhatsApp** klien.

---

### 9. Manajemen Situs (Konten)
Perbarui konten yang tampil di situs web publik Anda. Menu ini ada di sidebar kiri dalam bentuk dropdown.

- **Blog:** Tulis, edit, terbitkan, atau hapus artikel. Atur status menjadi "Diterbitkan" agar muncul di situs publik.
- **Kategori Blog:** Tambah atau hapus kategori untuk postingan blog Anda.
- **Halaman:** Edit konten untuk halaman statis seperti "Tentang Kami". Anda juga bisa mengedit Visi & Misi di sini.
- **Gambar Situs:** Ganti gambar-gambar utama yang ditampilkan di halaman Beranda, Tentang Kami, dan Layanan dengan memasukkan URL gambar yang baru.

---

### 10. Logout
Untuk keluar dari sesi admin Anda:
- Klik tombol **"Keluar"** di bagian bawah sidebar kiri.
- Anda akan diarahkan kembali ke halaman login.

