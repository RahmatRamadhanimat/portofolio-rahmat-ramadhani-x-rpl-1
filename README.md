# Web Portofolio — Rahmat Ramadhani

Website portofolio pribadi **Rahmat Ramadhani**, siswa jurusan **Rekayasa Perangkat Lunak (RPL)** di **SMK Krian 1 Sidoarjo**. Dibangun menggunakan HTML, CSS, dan Vanilla JavaScript untuk menampilkan profil, keahlian teknis, koleksi proyek, riwayat pendidikan, sertifikasi resmi, serta informasi kontak.

---

## Fitur Utama

- **Navigasi Responsif & Scroll-Spy**: Navbar tetap (*sticky*) dengan penanda seksi aktif otomatis saat halaman digulir, indikator progres *scroll* di bagian atas, serta menu *hamburger* untuk perangkat seluler.
- **Filter Proyek Interaktif**: Penyaringan daftar proyek berdasarkan kategori (`Semua`, `UI/UX`, `Farm`, `Python`, `IoT`, `Web`, dan `AI`).
- **Popup Modal Detail**: Jendela detail dinamis untuk setiap proyek dan sertifikat (gambar pratinjau, deskripsi lengkap, daftar poin sorotan/kompetensi, teknologi/topik terkait, tombol salin ID kredensial, dan tautan eksternal/verifikasi).
- **Animasi Bar Keahlian**: Pengisian bar tingkat kompetensi yang terpicu saat bagian *Keahlian* masuk ke area pandang layar (`IntersectionObserver`).
- **Salin ke Clipboard & Notifikasi Toast**: Kemudahan menyalin alamat email dan ID kredensial sertifikat disertai umpan balik notifikasi *toast*.
- **Formulir Kontak & Unduh CV**: Formulir pengiriman pesan langsung melalui aplikasi email (`mailto:`) serta tombol unduh CV resmi dalam format PDF.

---

## Teknologi yang Digunakan

- **HTML5** — Struktur semantik halaman dan atribut aksesibilitas (`aria-label`, `role`, `aria-modal`).
- **CSS3** — Tata letak responsif dengan CSS Grid & Flexbox, variabel tema gelap (`:root`), efek *blur* (`backdrop-filter`), dan transisi animasi.
- **Vanilla JavaScript (ES6+)** — Pengelolaan DOM, data modal proyek & sertifikat (`modalData`), filter kategori, *IntersectionObserver*, dan Clipboard API tanpa dependensi eksternal.
- **Google Fonts** — `Plus Jakarta Sans` dan `JetBrains Mono`.

---

## Bagian Halaman

| Bagian | ID Seksi | Ringkasan Konten |
| :--- | :--- | :--- |
| **Beranda** | `#home` | Pengenalan singkat, status ketersediaan magang/kolaborasi, tombol aksi, tautan media sosial, dan foto profil. |
| **Tentang** | `#about` | Profil, filosofi rekayasa perangkat lunak, biodata ringkas, dan statistik pencapaian. |
| **Keahlian** | `#skills` | Kompetensi teknis yang dibagi ke dalam kategori *Frontend Development*, *Programming & Logic*, dan *Tools*. |
| **Proyek** | `#projects` | 8 proyek pilihan lintas bidang (UI/UX, Farm, Python, IoT, Web, dan AI) lengkap dengan filter dan popup detail. |
| **Pendidikan** | `#education` | Latar belakang pendidikan kejuruan di SMK Krian 1 Sidoarjo, mata pelajaran utama, dan prestasi. |
| **Sertifikat** | `#certificates` | 6 sertifikasi kompetensi resmi dari **Sololearn** dan **Dicoding Academy** beserta ID kredensial dan tautan verifikasi. |
| **Kontak** | `#contact` | Informasi kontak langsung, tombol salin email, tautan sosial media, dan formulir pesan `mailto:`. |

---

## Daftar Proyek

1. **Mobile App Design** (`UI/UX`) — Prototipe aplikasi mobile interaktif di Figma untuk lomba Web Design 17 Agustus.
2. **Menanam Kangkung: Tugas Ketahanan Pangan Mapel PPLG** (`Farm`) — Proyek budidaya tanaman kangkung untuk mendukung ketahanan pangan.
3. **Menanam 10 Jenis TOGA: Projek Kesehatan Mandiri dan Lingkungan** (`Farm`) — Budidaya 10 jenis Tanaman Obat Keluarga (TOGA) dan katalogisasi digital manfaatnya.
4. **Extrakurikuler : AI Study Club** (`Python`) — Eksplorasi sintaksis Python, pengolahan data, dan pengenalan Machine Learning menggunakan Jupyter Notebook.
5. **Extrakurikuler : Skarisa Robotic** (`IoT`) — Pemrograman mikrokontroler Arduino dan ESP32, integrasi sensor, serta komunikasi IoT nirkabel.
6. **Blogger : TJK Rahmat Ramadhani** (`Web`) — Blog edukatif berisi artikel, tutorial, dan dokumentasi praktikum Teknik Jaringan Komputer.
7. **AI Model Rock Paper Scissors : With TeachableMachine** (`AI`) — Game Batu Gunting Kertas berbasis deteksi gestur tangan *real-time* di browser menggunakan Teachable Machine dan TensorFlow.js.
8. **AI Ekspresi Wajah : Real-Time Facial Emotion Detection** (`AI`) — Aplikasi web Computer Vision untuk mendeteksi ekspresi wajah (*senang*, *sedih*, *netral*) secara *real-time* menggunakan Teachable Machine dan TensorFlow.js (*live demo* di Vercel).

---

## Sertifikasi Resmi

| Judul Sertifikat | Penerbit | Tahun / Tanggal | ID Kredensial |
| :--- | :--- | :--- | :--- |
| **Introduction to Python** | Sololearn | 08 November 2026 | `CC-RQLCTKWP` |
| **Belajar Dasar AI** | Dicoding Academy | 2026 | `NVP7WY21RZR0` |
| **Memulai Pemrograman Dengan Python** | Dicoding Academy | 2026 | `07Z6QR412ZQR` |
| **Introduction To Financial Literacy** | DBS Foundation × Dicoding | 2026 | `ERZR79RWMZYV` |
| **Belajar Strategi Pengembangan Diri** | Dicoding Academy | 2026 | `JLX1KL1KJP72` |
| **Spec-Driven Development dengan Kiro** | Dicoding Academy | 2026 | `KEXLM1KEYZG2` |

---

## Struktur Direktori

```text
.
├── index.html                        # Halaman utama portofolio
├── style.css                         # Stylesheet utama (tema gelap & responsif)
├── script.js                         # Logika interaktif, filter proyek, & data modal
├── README.md                         # Dokumentasi proyek
└── assets/
    ├── CV_Rahmat_Ramadhani.pdf       # Berkas CV PDF
    ├── profile.jpg                   # Foto profil utama
    ├── certificates/                 # Gambar sertifikat (cert-1.jfif s/d cert-5.png, cert-9.png)
    └── projects/                     # Gambar thumbnail proyek (project-1.jpg s/d project-8.png)
```

---


---

## Kontak

- **Nama**: Rahmat Ramadhani
- **Sekolah**: SMK Krian 1 Sidoarjo — Rekayasa Perangkat Lunak (RPL)
- **Lokasi**: Sidoarjo, Jawa Timur, Indonesia
- **Email**: `ramadhanirahmat47@gmail.com`
- **GitHub**: [github.com/ramadhanirahmat47-rgb](https://github.com/ramadhanirahmat47-rgb)
- **LinkedIn**: [linkedin.com/in/rahmat-ramadhani01](https://linkedin.com/in/rahmat-ramadhani01)
- **Instagram**: [instagram.com/matrahmat_t](https://instagram.com/matrahmat_t/)
