# Web Portofolio — Rahmat Ramadhani

Website portofolio pribadi **Rahmat Ramadhani**, siswa jurusan **Rekayasa Perangkat Lunak (RPL)** di **SMK Krian 1 Sidoarjo**. Dibangun menggunakan HTML5, CSS3, dan Vanilla JavaScript dengan desain modern bernuansa *glassmorphism*, dukungan tema ganda (*Dark & Light Mode*), serta fitur interaktif untuk menjelajahi proyek, keahlian, pendidikan, dan sertifikasi resmi.

---

## Fitur Utama

- **Tema Ganda (Dark & Light Mode)**: Pengalih tema di header dengan penyimpanan preferensi otomatis ke `localStorage` dan skrip anti-kedipan (*no-FOUC*) saat halaman dimuat.
- **Command Palette (`Ctrl + K` / `/`)**: Pencarian cepat bergaya modern untuk melompat ke seksi halaman, membuka detail proyek atau sertifikat, mengganti tema, menyalin email, serta mengakses CV.
- **Filter & Pencarian Proyek Instan**: Penyaringan proyek berdasarkan kategori (`Semua`, `UI/UX`, `Farm`, `Python`, `IoT`, `Web`, `AI`), kotak pencarian kata kunci real-time, penghitung hasil, dan tombol reset.
- **Filter Sertifikat per Penerbit**: Penyaringan kredensial berdasarkan penerbit (`Semua`, `Sololearn`, `Dicoding Academy`) beserta penghitung jumlah sertifikat.
- **Modal Detail Interaktif + Navigasi Prev/Next & Lightbox**: Popup detail proyek dan sertifikat dengan tombol **Sebelumnya (`←`)** / **Berikutnya (`→`)**, salin ID kredensial ke *clipboard*, dan perbesar gambar penuh (*lightbox*).
- **CV Web Siap Cetak (`cv_template.html`)**: Halaman pratinjau CV interaktif yang dapat dicetak atau disimpan ke PDF langsung melalui browser, melengkapi berkas `assets/CV_Rahmat_Ramadhani.pdf`.
- **Formulir Kontak Multi-Opsi**: Validasi input real-time dengan tiga cara pengiriman: aplikasi email default (`mailto:`), buka draf langsung di **Gmail Web**, atau **Salin Draf** ke *clipboard*.
- **Animasi & Efek Visual Halus**: *Role rotator* di Hero, *spotlight hover* mengikuti kursor pada kartu, *scroll-reveal*, hitung naik statistik (*count-up*), animasi bar keahlian, serta tombol *Kembali ke Atas* dengan *circular progress ring*.

---

## Teknologi yang Digunakan

- **HTML5** — Struktur semantik halaman, landmark aksesibilitas, dan dukungan dialog ARIA.
- **CSS3** — CSS Custom Properties untuk tema Dark/Light, *glassmorphism* (`backdrop-filter`), pola grid arsitektural, CSS Grid & Flexbox responsif, serta dukungan `prefers-reduced-motion`.
- **Vanilla JavaScript (ES6+)** — Pengelolaan tema, Command Palette, filter & pencarian, modal & lightbox, validasi formulir, `IntersectionObserver`, dan Clipboard API tanpa *framework* eksternal.
- **Google Fonts** — `Plus Jakarta Sans` dan `JetBrains Mono`.

---

## Daftar Proyek (8 Proyek)

1. **Mobile App Design** (`UI/UX`) — Prototipe aplikasi mobile interaktif di Figma untuk lomba Web Design 17 Agustus.
2. **Menanam Kangkung: Tugas Ketahanan Pangan Mapel PPLG** (`Farm`) — Proyek budidaya tanaman kangkung untuk mendukung ketahanan pangan.
3. **Menanam 10 Jenis TOGA: Projek Kesehatan Mandiri dan Lingkungan** (`Farm`) — Budidaya 10 jenis Tanaman Obat Keluarga (TOGA) dan katalogisasi digital manfaatnya.
4. **Extrakurikuler : AI Study Club** (`Python`) — Eksplorasi sintaksis Python, pengolahan data, dan pengenalan Machine Learning menggunakan Jupyter Notebook.
5. **Extrakurikuler : Skarisa Robotic** (`IoT`) — Pemrograman mikrokontroler Arduino dan ESP32, integrasi sensor, serta komunikasi IoT nirkabel.
6. **Blogger : TJK Rahmat Ramadhani** (`Web`) — Blog edukatif berisi artikel, tutorial, dan dokumentasi praktikum Teknik Jaringan Komputer.
7. **AI Model Rock Paper Scissors : With TeachableMachine** (`AI`) — Game Batu Gunting Kertas berbasis deteksi gestur tangan *real-time* di browser menggunakan Teachable Machine dan TensorFlow.js.
8. **AI Ekspresi Wajah : Real-Time Facial Emotion Detection** (`AI`) — Aplikasi web Computer Vision untuk mendeteksi ekspresi wajah (*senang*, *sedih*, *netral*) secara *real-time* menggunakan Teachable Machine dan TensorFlow.js (*live demo* di Vercel).

---

## Sertifikasi Resmi (7 Sertifikat)

| Judul Sertifikat | Penerbit | Tanggal / Tahun | ID Kredensial |
| :--- | :--- | :--- | :--- |
| **Introduction to Python** | Sololearn | 08 November 2026 | `CC-RQLCTKWP` |
| **Introduction to HTML** | Sololearn | 26 November 2026 | `CC-7IATYSQ3` |
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
├── style.css                         # Stylesheet utama (Dark & Light theme, responsif)
├── script.js                         # Logika interaktif, Command Palette, filter, modal, & lightbox
├── cv_template.html                  # Halaman CV Web interaktif siap cetak (A4)
├── README.md                         # Dokumentasi proyek
└── assets/
    ├── CV_Rahmat_Ramadhani.pdf       # Berkas CV PDF resmi
    ├── profile.jpg                   # Foto profil utama
    ├── certificates/                 # Gambar sertifikat (cert-1.jfif s/d cert-5.png, cert-9.png, cert-10.jpg)
    └── projects/                     # Gambar thumbnail proyek (project-1.jpg s/d project-8.png)
```

---

## Cara Menjalankan Secara Lokal

Proyek ini adalah situs web statis (*static site*) tanpa proses *build* tambahan:

1. **Membuka Langsung**: Buka `index.html` di peramban web (*browser*).
2. **Menggunakan Live Server (VS Code)**: Klik kanan `index.html` lalu pilih **Open with Live Server**.
3. **Menggunakan Server HTTP Lokal**:
   ```bash
   python -m http.server 8000
   ```
   Lalu akses `http://localhost:8000` di peramban web.

---

## Kontak

- **Nama**: Rahmat Ramadhani
- **Sekolah**: SMK Krian 1 Sidoarjo — Rekayasa Perangkat Lunak (RPL)
- **Lokasi**: Sidoarjo, Jawa Timur, Indonesia
- **Email**: `ramadhanirahmat47@gmail.com`
- **GitHub**: [github.com/ramadhanirahmat47-rgb](https://github.com/ramadhanirahmat47-rgb)
- **LinkedIn**: [linkedin.com/in/rahmat-ramadhani01](https://linkedin.com/in/rahmat-ramadhani01)
- **Instagram**: [instagram.com/matrahmat_t](https://instagram.com/matrahmat_t/)
