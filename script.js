'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const EMAIL_ADDRESS = 'ramadhanirahmat47@gmail.com';
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------------------
     1. TEMA GELAP / TERANG (DARK & LIGHT THEME TOGGLE)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle-btn');

  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function applyTheme(theme, announce = false) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch (e) {
      // Abaikan jika penyimpanan lokal dibatasi
    }
    if (announce) {
      showToast(theme === 'light' ? 'Tema Terang diaktifkan' : 'Tema Gelap diaktifkan');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const nextTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme, true);
    });
  }

  /* --------------------------------------------------------------------------
     2. MENU NAVIGASI MOBILE (HAMBURGER MENU)
     -------------------------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  function closeMobileMenu() {
    if (!hamburgerBtn || !navMenu) return;
    hamburgerBtn.classList.remove('active');
    navMenu.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  /* --------------------------------------------------------------------------
     3. INDIKATOR SCROLL, HEADER GLASS, & BACK-TO-TOP PROGRESS RING
     -------------------------------------------------------------------------- */
  const scrollBar = document.getElementById('scroll-progress');
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');
  const toTopProgress = document.getElementById('to-top-progress');
  const RING_CIRCUMFERENCE = 2 * Math.PI * 19; // ~119.38

  function updateScrollIndicators() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = totalHeight > 0 ? Math.min(1, Math.max(0, scrollTop / totalHeight)) : 0;
    const scrollPercent = ratio * 100;

    if (scrollBar) {
      scrollBar.style.width = scrollPercent + '%';
    }

    if (toTopProgress) {
      toTopProgress.style.strokeDasharray = String(RING_CIRCUMFERENCE);
      toTopProgress.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - ratio));
    }

    if (header) {
      header.classList.toggle('scrolled', scrollTop > 24);
    }

    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', scrollTop > 280);
    }
  }

  window.addEventListener('scroll', updateScrollIndicators, { passive: true });
  updateScrollIndicators();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* --------------------------------------------------------------------------
     4. ROLE ROTATOR (EFEK KETIK HALUS DI HERO)
     -------------------------------------------------------------------------- */
  const roleRotatorEl = document.getElementById('role-rotator');
  if (roleRotatorEl && !prefersReducedMotion) {
    const roles = [
      'Software Engineering Student',
      'Web & UI/UX Enthusiast',
      'AI & IoT Explorer'
    ];
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let isDeleting = false;

    const tickRole = () => {
      const current = roles[roleIndex];
      if (isDeleting) {
        charIndex--;
        roleRotatorEl.textContent = current.slice(0, charIndex);
        if (charIndex <= 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(tickRole, 320);
          return;
        }
        setTimeout(tickRole, 32);
      } else {
        charIndex++;
        roleRotatorEl.textContent = current.slice(0, charIndex);
        if (charIndex >= current.length) {
          isDeleting = true;
          setTimeout(tickRole, 2200);
          return;
        }
        setTimeout(tickRole, 58);
      }
    };

    setTimeout(() => {
      isDeleting = true;
      tickRole();
    }, 2200);
  }

  /* --------------------------------------------------------------------------
     5. EFEK SPOTLIGHT KARTU (DESKTOP POINTER)
     -------------------------------------------------------------------------- */
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  if (!prefersReducedMotion && window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
    spotlightCards.forEach(card => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    });
  }

  /* --------------------------------------------------------------------------
     6. SCROLL REVEAL & ANIMASI STATISTIK + BAR KEAHLIAN
     -------------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

      revealEls.forEach((el, idx) => {
        el.style.transitionDelay = `${Math.min((idx % 4) * 55, 180)}ms`;
        revealObserver.observe(el);
      });
    } else {
      revealEls.forEach(el => el.classList.add('is-revealed'));
    }
  }

  const statCounters = document.querySelectorAll('.stat-count[data-count]');
  if (statCounters.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
    const countObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        if (isNaN(target)) return;

        const duration = 800;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = String(Math.round(target * eased));
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = String(target);
          }
        };
        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    }, { threshold: 0.45 });

    statCounters.forEach(el => countObserver.observe(el));
  }

  const skillBars = document.querySelectorAll('.bar-val');
  if (skillBars.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
    skillBars.forEach(bar => {
      bar.dataset.target = bar.style.width;
      bar.style.width = '0%';
    });

    const barObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target.querySelector('.bar-val');
          if (bar) bar.style.width = bar.dataset.target;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    skillBars.forEach(bar => barObserver.observe(bar.parentElement));
  }

  /* --------------------------------------------------------------------------
     7. FILTER KATEGORI & PENCARIAN PROYEK
     -------------------------------------------------------------------------- */
  const projectFilterBtns = document.querySelectorAll('#project-filter-tabs .filter-tab');
  const projectItems = document.querySelectorAll('.project-item');
  const projectSearchInput = document.getElementById('project-search');
  const projectSearchClear = document.getElementById('project-search-clear');
  const projectCountLabel = document.getElementById('project-count-label');
  const projectsEmpty = document.getElementById('projects-empty');
  const resetProjectsBtn = document.getElementById('reset-projects-btn');

  let activeProjectCategory = 'all';

  function applyProjectFilters() {
    const query = (projectSearchInput?.value || '').trim().toLowerCase();
    let visibleCount = 0;

    if (projectSearchClear) {
      projectSearchClear.classList.toggle('hidden', query.length === 0);
    }

    projectItems.forEach(item => {
      const category = item.getAttribute('data-category') || '';
      const textBlob = [
        item.querySelector('.item-title')?.textContent || '',
        item.querySelector('.item-desc')?.textContent || '',
        item.querySelector('.cat-badge')?.textContent || '',
        Array.from(item.querySelectorAll('.chip-tag')).map(el => el.textContent).join(' ')
      ].join(' ').toLowerCase();

      const matchesCat = activeProjectCategory === 'all' || category === activeProjectCategory;
      const matchesQuery = !query || textBlob.includes(query);
      const isVisible = matchesCat && matchesQuery;

      item.style.display = isVisible ? 'flex' : 'none';
      if (isVisible) visibleCount++;
    });

    if (projectCountLabel) {
      projectCountLabel.textContent = `${visibleCount} proyek`;
    }
    if (projectsEmpty) {
      projectsEmpty.classList.toggle('hidden', visibleCount > 0);
    }
  }

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeProjectCategory = btn.getAttribute('data-filter') || 'all';
      applyProjectFilters();
    });
  });

  if (projectSearchInput) {
    projectSearchInput.addEventListener('input', applyProjectFilters);
  }

  if (projectSearchClear) {
    projectSearchClear.addEventListener('click', () => {
      if (projectSearchInput) {
        projectSearchInput.value = '';
        projectSearchInput.focus();
      }
      applyProjectFilters();
    });
  }

  if (resetProjectsBtn) {
    resetProjectsBtn.addEventListener('click', () => {
      activeProjectCategory = 'all';
      projectFilterBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-filter') === 'all'));
      if (projectSearchInput) projectSearchInput.value = '';
      applyProjectFilters();
    });
  }

  /* --------------------------------------------------------------------------
     8. FILTER PENERBIT SERTIFIKAT
     -------------------------------------------------------------------------- */
  const certFilterBtns = document.querySelectorAll('#cert-filter-tabs .filter-tab');
  const certItems = document.querySelectorAll('.cert-item');
  const certCountLabel = document.getElementById('cert-count-label');

  certFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      certFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const selectedIssuer = btn.getAttribute('data-cert-filter') || 'all';
      let visibleCerts = 0;

      certItems.forEach(card => {
        const issuer = card.getAttribute('data-issuer') || '';
        const show = selectedIssuer === 'all' || issuer === selectedIssuer;
        card.style.display = show ? 'flex' : 'none';
        if (show) visibleCerts++;
      });

      if (certCountLabel) {
        certCountLabel.textContent = `${visibleCerts} sertifikat`;
      }
    });
  });

  /* --------------------------------------------------------------------------
     9. DATABASE MODAL DETAIL PROYEK & SERTIFIKAT
     -------------------------------------------------------------------------- */
  const modalEl = document.getElementById('detail-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body');

  const modalData = {
    'project-1': {
      type: 'project',
      badge: 'UI/UX Design',
      subBadge: 'Lomba 17 Agustus Web Design',
      title: 'Mobile App Design',
      img: 'assets/projects/project-1.jpg',
      info: [
        { label: 'Kategori', value: 'UI/UX Design' },
        { label: 'Acara / Event', value: 'Lomba 17 Agustus Web Design' },
        { label: 'Tools Utama', value: 'Figma' }
      ],
      description: 'Proyek hasil dari lomba Web Design 17 Agustus. Merupakan perancangan prototipe aplikasi mobile responsif berbasis User-Centered Design (UCD) yang menitikberatkan pada kemudahan interaksi pengguna, arsitektur informasi yang intuitif, serta keselarasan estetika visual modern.',
      highlightsTitle: 'Fitur & Sorotan Proyek',
      highlights: [
        'Karya kompetisi Web & App Design bertema kemerdekaan 17 Agustus.',
        'Perancangan alur interaksi pengguna (User Journey & Wireframing).',
        'Penerapan Design System dengan komponen reusable dan palet warna tematik.',
        'Prototipe interaktif clickable dengan transisi dan micro-interactions di Figma.'
      ],
      tags: ['Figma', 'UI/UX Design', 'Interactive Prototype', 'Mobile Design', 'User-Centered Design'],
      links: [
        {
          label: 'Buka Demo Interaktif Figma ↗',
          url: 'https://embed.figma.com/proto/Skd7WYRCNgcux2502m3PG9/RAHMAT-RAMADHANI-X-RPL-1?node-id=1-57&starting-point-node-id=1%3A3&embed-host=share',
          isPrimary: true
        },
        {
          label: 'Lihat Gambar Resolusi Penuh ↗',
          url: 'assets/projects/project-1.jpg',
          isPrimary: false
        }
      ]
    },
    'project-2': {
      type: 'project',
      badge: 'Farm',
      subBadge: 'Ketahanan Pangan PPLG',
      title: 'Menanam Kangkung: Tugas Ketahanan Pangan Mapel PPLG',
      img: 'assets/projects/project-2.jpg',
      info: [
        { label: 'Mata Pelajaran', value: 'PPLG SMK Krian 1 Sidoarjo' },
        { label: 'Kategori', value: 'Farm & Agrikultur Praktis' },
        { label: 'Peran', value: 'Dokumentator & Tim Agrikultur' }
      ],
      description: 'Proyek ketahanan pangan mata pelajaran Pengembangan Perangkat Lunak dan Gim (PPLG) berupa kegiatan budidaya tanaman kangkung, yang menggabungkan proses pembelajaran agrikultur praktis untuk mendukung kemandirian pangan.',
      highlightsTitle: 'Sorotan & Capaian Proyek',
      highlights: [
        'Praktik agrikultur penanaman kangkung darat secara mandiri.',
        'Pencatatan data berkala siklus pertumbuhan dari benih, pemupukan organik, hingga panen.',
        'Penerapan kedisiplinan dan kerja sama tim antarsiswa jurusan PPLG.',
        'Mendukung program sekolah hijau dan ketahanan pangan mandiri.'
      ],
      tags: ['PPLG', 'Farm', 'Agrikultur Praktis', 'Ketahanan Pangan', 'Dokumentasi Siklus'],
      links: [
        {
          label: 'Lihat Dokumentasi Lengkap ↗',
          url: 'assets/projects/project-2.jpg',
          isPrimary: true
        },
        {
          label: 'Diskusi & Info Proyek ✉',
          url: '#contact',
          isPrimary: false,
          isScroll: true
        }
      ]
    },
    'project-3': {
      type: 'project',
      badge: 'Farm',
      subBadge: 'Kesehatan Mandiri & Lingkungan',
      title: 'Menanam 10 Jenis TOGA: Projek Kesehatan Mandiri dan Lingkungan',
      img: 'assets/projects/project-3.jpg',
      info: [
        { label: 'Konsentrasi', value: 'PPLG & Edukasi Lingkungan' },
        { label: 'Jumlah Varietas', value: '10 Jenis Tanaman Obat' },
        { label: 'Peran', value: 'Kataloger Digital & Tim Budidaya' }
      ],
      description: 'Proyek ketahanan pangan dan pemanfaatan lahan sekolah melalui budidaya 10 jenis Tanaman Obat Keluarga (TOGA) pilihan, yang memadukan kegiatan agrikultur praktis dengan penerapan teknologi digital untuk mendukung kesehatan mandiri dan edukasi lingkungan.',
      highlightsTitle: 'Sorotan & Capaian Proyek',
      highlights: [
        'Budidaya 10 varietas TOGA seperti jahe, kunyit, temulawak, serai, dan lidah buaya.',
        'Katalogisasi digital manfaat farmakologi dan khasiat herbal tanaman.',
        'Edukasi pemanfaatan tanaman obat tradisional untuk kesehatan mandiri.',
        'Mendukung pelestarian keanekaragaman hayati dan lingkungan sekolah Adiwiyata.'
      ],
      tags: ['Farm', 'TOGA', 'Kesehatan Mandiri', 'Edukasi Lingkungan', 'Digital Catalog'],
      links: [
        {
          label: 'Lihat Dokumentasi Lengkap ↗',
          url: 'assets/projects/project-3.jpg',
          isPrimary: true
        },
        {
          label: 'Diskusi & Info Proyek ✉',
          url: '#contact',
          isPrimary: false,
          isScroll: true
        }
      ]
    },
    'project-4': {
      type: 'project',
      badge: 'Python',
      subBadge: 'Extrakurikuler AI Study Club',
      title: 'Extrakurikuler : AI Study Club',
      img: 'assets/projects/project-4.jpg',
      info: [
        { label: 'Kegiatan', value: 'Extrakurikuler AI Study Club' },
        { label: 'Bahasa', value: 'Python' },
        { label: 'Format', value: 'Jupyter Notebook' }
      ],
      description: 'Notebook Extrakurikuler AI Study Club yang memuat eksplorasi kode pemrograman Python, manipulasi data array, serta pengenalan algoritma pembelajaran mesin (Machine Learning). Proyek ini disusun sebagai dokumentasi belajar terstruktur dalam mendalami kecerdasan buatan.',
      highlightsTitle: 'Materi & Eksplorasi Notebook',
      highlights: [
        'Eksplorasi sintaksis dan struktur data Python untuk pemrosesan dataset.',
        'Implementasi konsep dasar Machine Learning dan pengolahan data numerik.',
        'Dokumentasi rapi berbasis Jupyter Notebook dengan visualisasi hasil eksekusi.',
        'Aktivitas rutin pembelajaran dan bedah algoritma di AI Study Club.'
      ],
      tags: ['Python', 'AI Study Club', 'Notebook', 'Machine Learning', 'Data Processing'],
      links: [
        {
          label: 'Lihat Dokumentasi Notebook ↗',
          url: 'assets/projects/project-4.jpg',
          isPrimary: true
        },
        {
          label: 'GitHub Profil ↗',
          url: 'https://github.com/ramadhanirahmat47-rgb',
          isPrimary: false
        }
      ]
    },
    'project-5': {
      type: 'project',
      badge: 'IoT',
      subBadge: 'Extrakurikuler Skarisa Robotic',
      title: 'Extrakurikuler : Skarisa Robotic',
      img: 'assets/projects/project-5.jpg',
      info: [
        { label: 'Kegiatan', value: 'Extrakurikuler Skarisa Robotic' },
        { label: 'Hardware', value: 'Arduino & ESP32' },
        { label: 'Bidang', value: 'Internet of Things (IoT)' }
      ],
      description: 'Project Extrakurikuler Skarisa Robotic di SMK Krian 1 Sidoarjo yang berfokus pada perancangan sistem mikrokontroler, pemrograman sensor, dan komunikasi perangkat berbasis Arduino serta mikrokontroler ESP32 dengan konektivitas nirkabel Wi-Fi/Bluetooth.',
      highlightsTitle: 'Komponen & Fitur Project',
      highlights: [
        'Pemrograman mikrokontroler Arduino dan modul ESP32.',
        'Integrasi sensor digital/analog untuk membaca data lingkungan secara real-time.',
        'Pengujian logika kendali aktuator, motor driver, dan sistem robotika.',
        'Penerapan komunikasi IoT nirkabel untuk monitoring jarak jauh.'
      ],
      tags: ['Arduino', 'ESP32', 'IoT', 'Robotics', 'Skarisa Robotic', 'Hardware'],
      links: [
        {
          label: 'Lihat Project Robotic ↗',
          url: 'assets/projects/project-5.jpg',
          isPrimary: true
        },
        {
          label: 'GitHub Profil ↗',
          url: 'https://github.com/ramadhanirahmat47-rgb',
          isPrimary: false
        }
      ]
    },
    'project-6': {
      type: 'project',
      badge: 'Web',
      subBadge: 'Web Blogger TJK',
      title: 'Blogger : TJK Rahmat Ramadhani',
      img: 'assets/projects/project-6.jpg',
      info: [
        { label: 'Platform', value: 'Web Blogger' },
        { label: 'Topik', value: 'Teknik Jaringan Komputer & IT' },
        { label: 'Penulis', value: 'Rahmat Ramadhani' }
      ],
      description: 'Web Blogger edukatif yang memuat artikel, tutorial, dan dokumentasi pembelajaran seputar dunia Teknik Komputer dan Jaringan (TJK) serta teknologi perangkat lunak. Dirancang untuk berbagi wawasan teknis kepada sesama siswa dan penggiat IT.',
      highlightsTitle: 'Konten & Fitur Blog',
      highlights: [
        'Publikasi artikel teknis seputar konfigurasi jaringan dan dasar komputasi.',
        'Dokumentasi praktikum sekolah dan tutorial langkah demi langkah.',
        'Desain blog yang rapi, responsif, dan mudah dibaca pembaca.',
        'Media literasi digital dan berbagi pengetahuan seputar TJK.'
      ],
      tags: ['TJK', 'Web Blogger', 'Web', 'Teknologi Informasi', 'Edukasi'],
      links: [
        {
          label: 'Lihat Web Blogger ↗',
          url: 'assets/projects/project-6.jpg',
          isPrimary: true
        },
        {
          label: 'GitHub Profil ↗',
          url: 'https://github.com/ramadhanirahmat47-rgb',
          isPrimary: false
        }
      ]
    },
    'project-7': {
      type: 'project',
      badge: 'AI',
      subBadge: 'Teachable Machine & TFJS',
      title: 'AI Model Rock Paper Scissors : With TeachableMachine',
      img: 'assets/projects/project-7.jpg',
      info: [
        { label: 'Platform', value: 'Web AI (Browser Real-Time)' },
        { label: 'Teknologi', value: 'TensorFlow.js & Teachable Machine' },
        { label: 'Input', value: 'Kamera / Webcam Gesture' }
      ],
      description: 'Game Batu Gunting Kertas berbasis AI yang menggunakan kamera untuk mengenali gesture tangan secara real-time. Project ini dibangun dengan Teachable Machine, TensorFlow.js, HTML, CSS, dan JavaScript serta dapat dijalankan langsung melalui browser.',
      highlightsTitle: 'Fitur & Keunggulan Project',
      highlights: [
        'Pengenalan gesture tangan (Batu, Gunting, Kertas) melalui kamera secara real-time.',
        'Pelatihan model klasifikasi visual menggunakan Google Teachable Machine.',
        'Integrasi model pembelajaran mesin ke browser dengan TensorFlow.js.',
        'Aplikasi berbasis web murni (HTML, CSS, JavaScript) tanpa instalasi tambahan.'
      ],
      tags: ['TensorFlow.js', 'Teachable Machine', 'AI', 'Web AI', 'Computer Vision', 'JavaScript'],
      links: [
        {
          label: 'Lihat Tampilan Project ↗',
          url: 'assets/projects/project-7.jpg',
          isPrimary: true
        },
        {
          label: 'GitHub Profil ↗',
          url: 'https://github.com/ramadhanirahmat47-rgb',
          isPrimary: false
        }
      ]
    },
    'project-8': {
      type: 'project',
      badge: 'AI',
      subBadge: 'Computer Vision & TensorFlow.js',
      title: 'AI Ekspresi Wajah : Real-Time Facial Emotion Detection',
      img: 'assets/projects/project-8.png',
      info: [
        { label: 'Platform', value: 'Web AI (Live Webcam Real-Time)' },
        { label: 'Teknologi', value: 'TensorFlow.js & Teachable Machine' },
        { label: 'Klasifikasi Emosi', value: 'Senang, Sedih, dan Netral' },
        { label: 'Deployment', value: 'Vercel (ai-ekspresi.vercel.app)' }
      ],
      description: 'Aplikasi web cerdas berbasis Computer Vision yang memanfaatkan Google Teachable Machine dan TensorFlow.js untuk mengenali serta mengklasifikasikan ekspresi wajah manusia (senang, sedih, dan netral) secara real-time langsung melalui browser dengan kamera web.',
      highlightsTitle: 'Fitur & Keunggulan Project',
      highlights: [
        'Deteksi emosi wajah manusia secara langsung (real-time stream) via kamera web.',
        'Pelatihan dataset ekspresi wajah menggunakan Google Teachable Machine.',
        'Integrasi dan inferensi model pembelajaran mesin di sisi client dengan TensorFlow.js.',
        'Visualisasi status kamera, bounding box, dan persentase tingkat keyakinan (confidence score).',
        'Aplikasi web interaktif tanpa backend tambahan, telah di-deploy dan dapat diuji langsung di Vercel.'
      ],
      tags: ['TensorFlow.js', 'Teachable Machine', 'Computer Vision', 'AI', 'Web AI', 'JavaScript', 'Vercel'],
      links: [
        {
          label: 'Buka Live Demo Website (Vercel) ↗',
          url: 'https://ai-ekspresi.vercel.app/',
          isPrimary: true
        },
        {
          label: 'Lihat Dokumentasi Gambar ↗',
          url: 'assets/projects/project-8.png',
          isPrimary: false
        }
      ]
    },
    'cert-9': {
      type: 'certificate',
      badge: 'Sertifikasi Resmi',
      subBadge: 'Sololearn • November 2026',
      title: 'Introduction to Python',
      img: 'assets/certificates/cert-9.png',
      certId: 'CC-RQLCTKWP',
      verifyUrl: 'https://www.sololearn.com/certificates/CC-RQLCTKWP',
      info: [
        { label: 'Penerbit Sertifikat', value: 'Sololearn' },
        { label: 'Tanggal Terbit', value: '08 November 2026' },
        { label: 'ID Kredensial', value: 'CC-RQLCTKWP', isCopyable: true }
      ],
      description: 'Sertifikasi penyelesaian kursus Introduction to Python dari Sololearn yang memvalidasi pemahaman teoretis dan praktis dasar pemrograman Python. Materi mencakup konsep dasar dan operasi aritmetika, pengelolaan string dan variabel, input pengguna, alur kontrol (percabangan dan perulangan), manipulasi list, serta pembuatan fungsi yang terstruktur.',
      highlightsTitle: 'Kompetensi & Materi Yang Dikuasai',
      highlights: [
        'Konsep dasar Python: penulisan output, operasi matematika sederhana, komentar, dan dasar debugging',
        'Pengelolaan string, variabel, tipe data dasar (integer, float, boolean), konversi tipe, dan input pengguna',
        'Struktur logika dan alur kontrol program menggunakan operator boolean, percabangan if-elif-else, serta perulangan while dan for',
        'Penyimpanan dan manipulasi koleksi data menggunakan list, indexing, slicing, serta pembuatan fungsi modular dengan def dan return'
      ],
      tags: ['Python', 'Control Flow', 'Lists', 'Functions', 'Sololearn'],
      links: [
        {
          label: 'Verifikasi Sertifikat Resmi (Sololearn) ↗',
          url: 'https://www.sololearn.com/certificates/CC-RQLCTKWP',
          isPrimary: true
        },
        {
          label: 'Lihat Gambar Sertifikat ↗',
          url: 'assets/certificates/cert-9.png',
          isPrimary: false
        }
      ]
    },
    'cert-10': {
      type: 'certificate',
      badge: 'Sertifikasi Resmi',
      subBadge: 'Sololearn • November 2026',
      title: 'Introduction to HTML',
      img: 'assets/certificates/cert-10.jpg',
      certId: 'CC-7IATYSQ3',
      verifyUrl: 'https://www.sololearn.com/certificates/CC-7IATYSQ3',
      info: [
        { label: 'Penerbit Sertifikat', value: 'Sololearn' },
        { label: 'Tanggal Terbit', value: '26 November 2026' },
        { label: 'ID Kredensial', value: 'CC-7IATYSQ3', isCopyable: true }
      ],
      description: 'Sertifikasi penyelesaian kursus Introduction to HTML dari Sololearn yang memvalidasi pemahaman teoretis dan praktis dasar pengembangan web menggunakan HTML. Materi mencakup struktur dasar dokumen HTML, pemformatan teks, penggunaan elemen dan atribut, penyisipan tautan dan gambar, pembuatan daftar dan tabel, hingga perancangan formulir dan elemen media.',
      highlightsTitle: 'Kompetensi & Materi Yang Dikuasai',
      highlights: [
        'Struktur dasar dokumen HTML (&lt;html&gt;, &lt;head&gt;, &lt;title&gt;, &lt;body&gt;), heading, paragraf, dan pemformatan teks',
        'Penggunaan elemen, atribut, hyperlink (&lt;a&gt;), serta penyisipan gambar (&lt;img&gt;) dan konten multimedia (&lt;audio&gt;, &lt;video&gt;)',
        'Penyusunan daftar (&lt;ol&gt;, &lt;ul&gt;, &lt;li&gt;) dan tabel data terstruktur (&lt;table&gt;, &lt;tr&gt;, &lt;th&gt;, &lt;td&gt;)',
        'Pembuatan formulir interaktif dengan &lt;form&gt;, &lt;label&gt;, berbagai tipe &lt;input&gt;, dan tombol submit'
      ],
      tags: ['HTML', 'Web Development', 'Forms & Tables', 'Semantic Markup', 'Sololearn'],
      links: [
        {
          label: 'Verifikasi Sertifikat Resmi (Sololearn) ↗',
          url: 'https://www.sololearn.com/certificates/CC-7IATYSQ3',
          isPrimary: true
        },
        {
          label: 'Lihat Gambar Sertifikat ↗',
          url: 'assets/certificates/cert-10.jpg',
          isPrimary: false
        }
      ]
    },
    'cert-1': {
      type: 'certificate',
      badge: 'Sertifikasi Resmi',
      subBadge: 'Dicoding Academy • 2026',
      title: 'Belajar Dasar AI (Artificial Intelligence)',
      img: 'assets/certificates/cert-1.jfif',
      certId: 'NVP7WY21RZR0',
      verifyUrl: 'https://www.dicoding.com/certificates/NVP7WY21RZR0',
      info: [
        { label: 'Penerbit Sertifikat', value: 'Dicoding Academy' },
        { label: 'Tahun Kelulusan', value: '2026' },
        { label: 'ID Kredensial', value: 'NVP7WY21RZR0', isCopyable: true }
      ],
      description: 'Sertifikasi resmi dari Dicoding Academy yang memvalidasi penguasaan konsep fundamental kecerdasan buatan. Materi kursus meliputi pemahaman komprehensif mengenai Machine Learning (Supervised, Unsupervised, & Reinforcement Learning), Deep Learning, Natural Language Processing (NLP), Computer Vision, serta prinsip etika dan tanggung jawab moral dalam pemanfaatan teknologi AI masa kini.',
      highlightsTitle: 'Kompetensi & Materi Yang Dikuasai',
      highlights: [
        'Memahami konsep dasar AI & alur kerja Machine Learning (Supervised & Unsupervised)',
        'Mengenal pemanfaatan Generative AI, Large Language Models (LLM), dan Prompt Engineering',
        'Analisis studi kasus etika, privasi data pengguna, dan mitigasi bias algoritma AI',
        'Lulus evaluasi ujian kompetensi resmi berstandar industri dari Dicoding Academy'
      ],
      tags: ['Artificial Intelligence', 'Machine Learning', 'Prompt Engineering', 'AI Ethics', 'Dicoding'],
      links: [
        {
          label: 'Verifikasi Sertifikat Resmi (Dicoding) ↗',
          url: 'https://www.dicoding.com/certificates/NVP7WY21RZR0',
          isPrimary: true
        },
        {
          label: 'Lihat Gambar Sertifikat ↗',
          url: 'assets/certificates/cert-1.jfif',
          isPrimary: false
        }
      ]
    },
    'cert-2': {
      type: 'certificate',
      badge: 'Sertifikasi Resmi',
      subBadge: 'Dicoding Academy • 2026',
      title: 'Memulai Pemrograman Dengan Python',
      img: 'assets/certificates/cert-2.jfif',
      certId: '07Z6QR412ZQR',
      verifyUrl: 'https://www.dicoding.com/certificates/07Z6QR412ZQR',
      info: [
        { label: 'Penerbit Sertifikat', value: 'Dicoding Academy' },
        { label: 'Tahun Kelulusan', value: '2026' },
        { label: 'ID Kredensial', value: '07Z6QR412ZQR', isCopyable: true }
      ],
      description: 'Sertifikasi kompetensi pemrograman Python dari Dicoding Academy yang dirancang untuk membangun fondasi penulisan kode berstandar industri. Meliputi sintaksis dasar Python, tipe data terstruktur, alur kendali logika program, pembuatan fungsi modular, hingga pengelolaan berkas dan penanganan eksepsi.',
      highlightsTitle: 'Kompetensi & Materi Yang Dikuasai',
      highlights: [
        'Penguasaan sintaksis inti Python: tipe data primitif, list, tuple, set, dan dictionary',
        'Penerapan struktur kontrol alur logika: percabangan IF-ELIF-ELSE dan perulangan FOR/WHILE',
        'Modularitas fungsi, passing arguments, scope variabel, dan Clean Code',
        'Penanganan error secara aman dengan mekanisme try-except blocks'
      ],
      tags: ['Python', 'Programming Logic', 'Data Structures', 'Clean Code', 'Dicoding'],
      links: [
        {
          label: 'Verifikasi Sertifikat Resmi (Dicoding) ↗',
          url: 'https://www.dicoding.com/certificates/07Z6QR412ZQR',
          isPrimary: true
        },
        {
          label: 'Lihat Gambar Sertifikat ↗',
          url: 'assets/certificates/cert-2.jfif',
          isPrimary: false
        }
      ]
    },
    'cert-3': {
      type: 'certificate',
      badge: 'Sertifikasi Resmi',
      subBadge: 'DBS Foundation × Dicoding • 2026',
      title: 'Introduction To Financial Literacy',
      img: 'assets/certificates/cert-3.jfif',
      certId: 'ERZR79RWMZYV',
      verifyUrl: 'https://www.dicoding.com/certificates/ERZR79RWMZYV',
      info: [
        { label: 'Penerbit Sertifikat', value: 'DBS Foundation × Dicoding' },
        { label: 'Tahun Kelulusan', value: '2026' },
        { label: 'ID Kredensial', value: 'ERZR79RWMZYV', isCopyable: true }
      ],
      description: 'Program sertifikasi kerja sama antara DBS Foundation dan Dicoding Indonesia dalam Coding Camp 2026. Kursus ini memberikan wawasan strategis mengenai literasi keuangan digital, pengelolaan arus kas (cash flow), budgeting cerdas, pemahaman investasi, manajemen risiko, serta peran teknologi finansial (FinTech) dalam perekonomian modern.',
      highlightsTitle: 'Kompetensi & Materi Yang Dikuasai',
      highlights: [
        'Pemahaman mendalam tentang konsep cash flow, budgeting, dan perencanaan keuangan strategis',
        'Pengenalan instrumen investasi cerdas, suku bunga, dan mitigasi risiko finansial',
        'Wawasan tentang ekosistem FinTech, keamanan transaksi perbankan digital, dan anti-fraud',
        'Sertifikat resmi terakreditasi DBS Foundation Coding Camp & Dicoding'
      ],
      tags: ['Financial Literacy', 'FinTech', 'DBS Foundation', 'Digital Economy', 'Dicoding'],
      links: [
        {
          label: 'Verifikasi Sertifikat Resmi (Dicoding) ↗',
          url: 'https://www.dicoding.com/certificates/ERZR79RWMZYV',
          isPrimary: true
        },
        {
          label: 'Lihat Gambar Sertifikat ↗',
          url: 'assets/certificates/cert-3.jfif',
          isPrimary: false
        }
      ]
    },
    'cert-4': {
      type: 'certificate',
      badge: 'Sertifikasi Resmi',
      subBadge: 'Dicoding Academy • 2026',
      title: 'Belajar Strategi Pengembangan Diri',
      img: 'assets/certificates/cert-4.jfif',
      certId: 'JLX1KL1KJP72',
      verifyUrl: 'https://www.dicoding.com/certificates/JLX1KL1KJP72',
      info: [
        { label: 'Penerbit Sertifikat', value: 'Dicoding Academy' },
        { label: 'Tahun Kelulusan', value: '2026' },
        { label: 'ID Kredensial', value: 'JLX1KL1KJP72', isCopyable: true }
      ],
      description: 'Sertifikasi soft skills dan pengembangan profesional dari Dicoding Academy. Memfokuskan pada pembentukan pola pikir bertumbuh (Growth Mindset), disiplin manajemen waktu (Time Management), penetapan target berbasis metode SMART, komunikasi profesional yang efektif, serta ketahanan mental dalam menghadapi tantangan di industri rekayasa perangkat lunak.',
      highlightsTitle: 'Kompetensi & Materi Yang Dikuasai',
      highlights: [
        'Membangun Growth Mindset untuk akselerasi belajar dan adaptasi teknologi baru',
        'Penerapan teknik manajemen waktu produktif (Pomodoro, Eisenhower Matrix, Prioritization)',
        'Metode penentuan target terukur menggunakan pendekatan SMART Goals',
        'Komunikasi interpersonal, kolaborasi tim profesional, dan problem solving mindset'
      ],
      tags: ['Growth Mindset', 'Time Management', 'SMART Goals', 'Soft Skills', 'Professional Ethics'],
      links: [
        {
          label: 'Verifikasi Sertifikat Resmi (Dicoding) ↗',
          url: 'https://www.dicoding.com/certificates/JLX1KL1KJP72',
          isPrimary: true
        },
        {
          label: 'Lihat Gambar Sertifikat ↗',
          url: 'assets/certificates/cert-4.jfif',
          isPrimary: false
        }
      ]
    },
    'cert-5': {
      type: 'certificate',
      badge: 'Sertifikasi Resmi',
      subBadge: 'Dicoding Academy • 2026',
      title: 'Spec-Driven Development dengan Kiro',
      img: 'assets/certificates/cert-5.png',
      certId: 'KEXLM1KEYZG2',
      verifyUrl: 'https://www.dicoding.com/certificates/KEXLM1KEYZG2',
      info: [
        { label: 'Penerbit Sertifikat', value: 'Dicoding Academy' },
        { label: 'Tahun Kelulusan', value: '2026' },
        { label: 'ID Kredensial', value: 'KEXLM1KEYZG2', isCopyable: true }
      ],
      description: 'Sertifikasi kompetensi resmi dari Dicoding Academy mengenai implementasi metodologi Spec-Driven Development (SDD) dengan Kiro. Pelatihan ini memvalidasi keahlian dalam merancang arsitektur perangkat lunak berbasis spesifikasi terstandarisasi, memanfaatkan AI agent untuk efisiensi perancangan sistem dan penulisan kode, serta memastikan keandalan produk perangkat lunak.',
      highlightsTitle: 'Kompetensi & Materi Yang Dikuasai',
      highlights: [
        'Pemahaman mendalam mengenai paradigma Spec-Driven Development (SDD) dalam software engineering',
        'Penyusunan spesifikasi teknis dan perancangan arsitektur perangkat lunak yang presisi',
        'Integrasi AI-assisted development menggunakan Kiro untuk akselerasi siklus pengembangan',
        'Lulus evaluasi dan verifikasi kompetensi industri berstandar Dicoding Indonesia'
      ],
      tags: ['Spec-Driven Development', 'Kiro', 'Software Engineering', 'AI Coding', 'Dicoding'],
      links: [
        {
          label: 'Verifikasi Sertifikat Resmi (Dicoding) ↗',
          url: 'https://www.dicoding.com/certificates/KEXLM1KEYZG2',
          isPrimary: true
        },
        {
          label: 'Lihat Gambar Sertifikat ↗',
          url: 'assets/certificates/cert-5.png',
          isPrimary: false
        }
      ]
    }
  };

  const projectOrder = Object.keys(modalData).filter(k => modalData[k].type === 'project');
  const certOrder = Object.keys(modalData).filter(k => modalData[k].type === 'certificate');
  let activeModalId = null;

  /* --------------------------------------------------------------------------
     10. LIGHTBOX GAMBAR PENUH
     -------------------------------------------------------------------------- */
  const lightboxEl = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');

  function openLightbox(src, caption = '') {
    if (!lightboxEl || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = caption || 'Pratinjau gambar';
    if (lightboxCaption) lightboxCaption.textContent = caption;
    lightboxEl.classList.add('active');
    lightboxEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }

  function closeLightbox() {
    if (!lightboxEl) return;
    lightboxEl.classList.remove('active');
    lightboxEl.setAttribute('aria-hidden', 'true');
    if (!modalEl?.classList.contains('active')) {
      document.body.classList.remove('no-scroll');
    }
  }

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }
  if (lightboxEl) {
    lightboxEl.addEventListener('click', (e) => {
      if (e.target === lightboxEl) closeLightbox();
    });
  }

  /* --------------------------------------------------------------------------
     11. RENDER & NAVIGASI MODAL DETAIL
     -------------------------------------------------------------------------- */
  function getAdjacentIds(id) {
    const entry = modalData[id];
    if (!entry) return { prevId: null, nextId: null };
    const list = entry.type === 'project' ? projectOrder : certOrder;
    const idx = list.indexOf(id);
    if (idx === -1 || list.length <= 1) return { prevId: null, nextId: null };
    const prevId = list[(idx - 1 + list.length) % list.length];
    const nextId = list[(idx + 1) % list.length];
    return { prevId, nextId };
  }

  function renderModalContent(data, id) {
    if (!modalBody) return;

    const { prevId, nextId } = getAdjacentIds(id);

    const infoCardsHtml = (data.info || []).map(item => {
      if (item.isCopyable) {
        return `
          <div class="modal-info-col">
            <small>${item.label}</small>
            <div class="modal-copy-id-row">
              <code class="modal-code">${item.value}</code>
              <button type="button" class="btn-copy-id" data-copy="${item.value}" title="Salin ID">Salin</button>
            </div>
          </div>
        `;
      }
      return `
        <div class="modal-info-col">
          <small>${item.label}</small>
          <strong>${item.value}</strong>
        </div>
      `;
    }).join('');

    const highlightsHtml = (data.highlights || []).map(hl => {
      const icon = data.type === 'project'
        ? '<span class="accent-star">✦</span>'
        : '<span class="check-mark">✓</span>';
      return `<li>${icon}<span>${hl}</span></li>`;
    }).join('');

    const tagsHtml = (data.tags && data.tags.length > 0) ? `
      <div class="modal-section">
        <h4 class="modal-section-title">Teknologi &amp; Topik</h4>
        <div class="item-tags">
          ${data.tags.map(tag => `<span class="chip-tag">${tag}</span>`).join('')}
        </div>
      </div>
    ` : '';

    const linksHtml = (data.links || []).map(link => {
      const cls = link.isPrimary ? 'btn btn-primary' : 'btn btn-outline';
      if (link.isScroll) {
        return `<a href="${link.url}" class="${cls}" data-close-modal="true"><span>${link.label}</span></a>`;
      }
      return `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="${cls}"><span>${link.label}</span></a>`;
    }).join('');

    const navButtonsHtml = (prevId && nextId) ? `
      <div class="modal-nav-group">
        <button type="button" class="btn btn-outline btn-sm" id="modal-prev-btn" data-target-id="${prevId}" title="Sebelumnya (←)">← Sebelumnya</button>
        <button type="button" class="btn btn-outline btn-sm" id="modal-next-btn" data-target-id="${nextId}" title="Berikutnya (→)">Berikutnya →</button>
      </div>
    ` : '';

    modalBody.innerHTML = `
      <div class="modal-header-meta">
        <span class="sec-badge" style="margin-bottom: 0;">${data.badge || ''}</span>
        ${data.subBadge ? `<span class="modal-sub-badge">${data.subBadge}</span>` : ''}
      </div>
      <h3 id="modal-title" class="modal-title">${data.title}</h3>

      ${data.img ? `
        <div class="modal-media-box">
          <img src="${data.img}" alt="${data.title}" class="modal-media-img" id="modal-preview-img" loading="eager">
          <div class="modal-media-actions">
            <button type="button" class="modal-media-zoom" id="modal-zoom-btn" title="Perbesar gambar di layar">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
              <span>Perbesar</span>
            </button>
            <a href="${data.img}" target="_blank" rel="noopener noreferrer" class="modal-media-zoom" title="Buka gambar di tab baru">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6"></path><path d="M10 14L21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
              <span>Tab Baru</span>
            </a>
          </div>
        </div>
      ` : ''}

      ${infoCardsHtml ? `<div class="modal-info-card">${infoCardsHtml}</div>` : ''}

      <div class="modal-section">
        <h4 class="modal-section-title">Deskripsi Lengkap</h4>
        <p class="modal-desc">${data.description}</p>
      </div>

      ${highlightsHtml ? `
        <div class="modal-section">
          <h4 class="modal-section-title">${data.highlightsTitle || 'Sorotan Utama'}</h4>
          <ul class="modal-highlight-list">
            ${highlightsHtml}
          </ul>
        </div>
      ` : ''}

      ${tagsHtml}

      <div class="modal-footer-btns">
        <div class="modal-footer-links">
          ${linksHtml}
          <button type="button" class="btn btn-ghost" data-close-modal="true"><span>Tutup</span></button>
        </div>
        ${navButtonsHtml}
      </div>
    `;

    // Listener salin ID kredensial
    modalBody.querySelectorAll('.btn-copy-id').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const copyVal = btn.getAttribute('data-copy');
        if (copyVal) {
          copyToClipboard(copyVal, `ID ${copyVal} berhasil disalin!`);
          btn.textContent = 'Disalin!';
          setTimeout(() => { btn.textContent = 'Salin'; }, 2000);
        }
      });
    });

    // Listener zoom gambar (lightbox)
    const previewImg = modalBody.querySelector('#modal-preview-img');
    const zoomBtn = modalBody.querySelector('#modal-zoom-btn');
    if (previewImg && data.img) {
      previewImg.addEventListener('click', () => openLightbox(data.img, data.title));
    }
    if (zoomBtn && data.img) {
      zoomBtn.addEventListener('click', () => openLightbox(data.img, data.title));
    }

    // Listener navigasi prev/next
    const prevBtn = modalBody.querySelector('#modal-prev-btn');
    const nextBtn = modalBody.querySelector('#modal-next-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => openModalById(prevBtn.getAttribute('data-target-id')));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => openModalById(nextBtn.getAttribute('data-target-id')));
    }

    // Listener tombol tutup
    modalBody.querySelectorAll('[data-close-modal="true"]').forEach(btn => {
      btn.addEventListener('click', closeDetailModal);
    });
  }

  function openModalById(id, fallbackEl = null) {
    let data = modalData[id];

    if (!data && fallbackEl) {
      const title = fallbackEl.querySelector('.item-title, .cert-h3')?.textContent || 'Detail';
      const desc = fallbackEl.querySelector('.item-desc, .cert-text')?.textContent || '';
      const img = fallbackEl.querySelector('img')?.getAttribute('src') || '';
      const badge = fallbackEl.querySelector('.cat-badge, .cert-badge-iss')?.textContent || 'Detail';
      const year = fallbackEl.querySelector('.cert-badge-yr')?.textContent || '';
      const tags = Array.from(fallbackEl.querySelectorAll('.chip-tag')).map(el => el.textContent);
      const actionLink = fallbackEl.querySelector('a')?.getAttribute('href') || img;

      data = {
        type: 'general',
        badge: badge,
        subBadge: year,
        title: title,
        img: img,
        info: [
          { label: 'Kategori', value: badge },
          { label: 'Status', value: 'Tersedia' }
        ],
        description: desc,
        highlightsTitle: 'Informasi',
        highlights: [desc],
        tags: tags,
        links: [
          { label: 'Buka Tautan ↗', url: actionLink, isPrimary: true },
          { label: 'Lihat Gambar ↗', url: img, isPrimary: false }
        ]
      };
    }

    if (!data) return;
    activeModalId = id;
    renderModalContent(data, id);

    if (modalEl) {
      modalEl.classList.add('active');
      modalEl.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
      modalBody.scrollTop = 0;

      setTimeout(() => {
        try {
          modalCloseBtn?.focus({ preventScroll: true });
        } catch (err) {
          // Fallback
        }
      }, 40);
    }
  }

  function closeDetailModal() {
    if (!modalEl) return;
    modalEl.classList.remove('active');
    modalEl.setAttribute('aria-hidden', 'true');
    activeModalId = null;
    if (!lightboxEl?.classList.contains('active') && !cmdPaletteEl?.classList.contains('active')) {
      document.body.classList.remove('no-scroll');
    }
  }

  // Listener kartu proyek & tombol detail
  document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('a') && !e.target.closest('.btn-open-modal')) return;
      e.preventDefault();
      const modalId = item.getAttribute('data-modal-id');
      if (modalId) openModalById(modalId, item);
    });

    item.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target === item) {
        e.preventDefault();
        const modalId = item.getAttribute('data-modal-id');
        if (modalId) openModalById(modalId, item);
      }
    });
  });

  document.querySelectorAll('.btn-open-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const modalId = btn.getAttribute('data-modal-id');
      const parentCard = btn.closest('.project-item, .cert-item');
      if (modalId) openModalById(modalId, parentCard);
    });
  });

  // Listener kartu sertifikat
  document.querySelectorAll('.cert-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = item.getAttribute('data-modal-id');
      if (modalId) openModalById(modalId, item);
    });

    item.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target === item) {
        e.preventDefault();
        const modalId = item.getAttribute('data-modal-id');
        if (modalId) openModalById(modalId, item);
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeDetailModal);
  }
  if (modalEl) {
    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) closeDetailModal();
    });
  }

  /* --------------------------------------------------------------------------
     12. COMMAND PALETTE (CTRL+K / /)
     -------------------------------------------------------------------------- */
  const cmdPaletteBtn = document.getElementById('cmd-palette-btn');
  const cmdPaletteEl = document.getElementById('cmd-palette');
  const cmdInput = document.getElementById('cmd-input');
  const cmdResults = document.getElementById('cmd-results');

  const commandItems = [
    { title: 'Beranda', sub: 'Kembali ke bagian paling atas halaman', badge: 'Bagian', action: () => scrollToSection('#home') },
    { title: 'Tentang Saya', sub: 'Profil, filosofi rekayasa, dan statistik', badge: 'Bagian', action: () => scrollToSection('#about') },
    { title: 'Keahlian & Tech Stack', sub: 'Frontend, Programming, dan Tools', badge: 'Bagian', action: () => scrollToSection('#skills') },
    { title: 'Proyek Pilihan', sub: 'Jelajahi 8 proyek portofolio', badge: 'Bagian', action: () => scrollToSection('#projects') },
    { title: 'Pendidikan & Kualifikasi', sub: 'SMK Krian 1 Sidoarjo — RPL', badge: 'Bagian', action: () => scrollToSection('#education') },
    { title: 'Sertifikasi & Pencapaian', sub: '7 sertifikat Sololearn & Dicoding Academy', badge: 'Bagian', action: () => scrollToSection('#certificates') },
    { title: 'Kontak & Kirim Pesan', sub: 'Email, media sosial, dan formulir pesan', badge: 'Bagian', action: () => scrollToSection('#contact') },
    ...projectOrder.map(id => ({
      title: modalData[id].title,
      sub: `${modalData[id].badge} • ${modalData[id].subBadge}`,
      badge: 'Proyek',
      action: () => openModalById(id)
    })),
    ...certOrder.map(id => ({
      title: modalData[id].title,
      sub: `${modalData[id].subBadge} • ID: ${modalData[id].certId}`,
      badge: 'Sertifikat',
      action: () => openModalById(id)
    })),
    {
      title: 'Ganti Tema Gelap / Terang',
      sub: 'Ubah tampilan portofolio antara Dark Mode dan Light Mode',
      badge: 'Aksi',
      action: () => applyTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark', true)
    },
    {
      title: 'Salin Alamat Email',
      sub: EMAIL_ADDRESS,
      badge: 'Aksi',
      action: () => copyToClipboard(EMAIL_ADDRESS, 'Alamat email berhasil disalin!')
    },
    {
      title: 'Buka Pratinjau CV Web',
      sub: 'Tampilkan halaman CV interaktif siap cetak (cv_template.html)',
      badge: 'Dokumen',
      action: () => window.open('cv_template.html', '_blank', 'noopener,noreferrer')
    },
    {
      title: 'Unduh CV Resmi (PDF)',
      sub: 'CV_Rahmat_Ramadhani.pdf',
      badge: 'Dokumen',
      action: () => window.open('assets/CV_Rahmat_Ramadhani.pdf', '_blank', 'noopener,noreferrer')
    }
  ];

  let filteredCmds = commandItems;
  let selectedCmdIndex = 0;

  function scrollToSection(hash) {
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  }

  function renderCmdResults(query = '') {
    if (!cmdResults) return;
    const q = query.trim().toLowerCase();
    filteredCmds = q
      ? commandItems.filter(item =>
          item.title.toLowerCase().includes(q) ||
          item.sub.toLowerCase().includes(q) ||
          item.badge.toLowerCase().includes(q)
        )
      : commandItems;

    selectedCmdIndex = 0;

    if (!filteredCmds.length) {
      cmdResults.innerHTML = '<div class="cmd-empty">Tidak ditemukan hasil yang cocok.</div>';
      return;
    }

    cmdResults.innerHTML = '';
    filteredCmds.forEach((item, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `cmd-item${idx === 0 ? ' is-selected' : ''}`;
      btn.setAttribute('role', 'option');
      btn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');

      const left = document.createElement('div');
      left.className = 'cmd-item-left';

      const titleSpan = document.createElement('span');
      titleSpan.className = 'cmd-item-title';
      titleSpan.textContent = item.title;

      const subSpan = document.createElement('span');
      subSpan.className = 'cmd-item-sub';
      subSpan.textContent = item.sub;

      left.appendChild(titleSpan);
      left.appendChild(subSpan);

      const badgeSpan = document.createElement('span');
      badgeSpan.className = 'cmd-item-badge';
      badgeSpan.textContent = item.badge;

      btn.appendChild(left);
      btn.appendChild(badgeSpan);

      btn.addEventListener('click', () => {
        closeCommandPalette();
        item.action();
      });

      cmdResults.appendChild(btn);
    });
  }

  function updateCmdSelection(nextIndex) {
    const items = cmdResults?.querySelectorAll('.cmd-item');
    if (!items || !items.length) return;
    selectedCmdIndex = (nextIndex + items.length) % items.length;
    items.forEach((el, i) => {
      const active = i === selectedCmdIndex;
      el.classList.toggle('is-selected', active);
      el.setAttribute('aria-selected', String(active));
      if (active) el.scrollIntoView({ block: 'nearest' });
    });
  }

  function openCommandPalette() {
    if (!cmdPaletteEl) return;
    closeMobileMenu();
    cmdPaletteEl.classList.add('active');
    cmdPaletteEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    if (cmdInput) {
      cmdInput.value = '';
      renderCmdResults('');
      setTimeout(() => cmdInput.focus(), 20);
    }
  }

  function closeCommandPalette() {
    if (!cmdPaletteEl) return;
    cmdPaletteEl.classList.remove('active');
    cmdPaletteEl.setAttribute('aria-hidden', 'true');
    if (!modalEl?.classList.contains('active') && !lightboxEl?.classList.contains('active')) {
      document.body.classList.remove('no-scroll');
    }
  }

  if (cmdPaletteBtn) {
    cmdPaletteBtn.addEventListener('click', openCommandPalette);
  }
  if (cmdPaletteEl) {
    cmdPaletteEl.addEventListener('click', (e) => {
      if (e.target === cmdPaletteEl) closeCommandPalette();
    });
  }
  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => renderCmdResults(e.target.value));
    cmdInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        updateCmdSelection(selectedCmdIndex + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        updateCmdSelection(selectedCmdIndex - 1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredCmds[selectedCmdIndex];
        if (selected) {
          closeCommandPalette();
          selected.action();
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     13. GLOBAL KEYBOARD SHORTCUTS (ESC, CTRL+K, /, ARROW NAV)
     -------------------------------------------------------------------------- */
  document.addEventListener('keydown', (e) => {
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    const isTyping = tag === 'input' || tag === 'textarea' || e.target?.isContentEditable;

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdPaletteEl?.classList.contains('active')) closeCommandPalette();
      else openCommandPalette();
      return;
    }

    if (e.key === '/' && !isTyping && !modalEl?.classList.contains('active') && !lightboxEl?.classList.contains('active')) {
      e.preventDefault();
      openCommandPalette();
      return;
    }

    if (e.key === 'Escape') {
      if (lightboxEl?.classList.contains('active')) {
        closeLightbox();
      } else if (cmdPaletteEl?.classList.contains('active')) {
        closeCommandPalette();
      } else if (modalEl?.classList.contains('active')) {
        closeDetailModal();
      } else {
        closeMobileMenu();
      }
      return;
    }

    if (modalEl?.classList.contains('active') && !lightboxEl?.classList.contains('active') && activeModalId) {
      if (e.key === 'ArrowLeft') {
        const { prevId } = getAdjacentIds(activeModalId);
        if (prevId) openModalById(prevId);
      } else if (e.key === 'ArrowRight') {
        const { nextId } = getAdjacentIds(activeModalId);
        if (nextId) openModalById(nextId);
      }
    }
  });

  /* --------------------------------------------------------------------------
     14. CLIPBOARD & FORMULIR KONTAK (MAILTO, GMAIL WEB, SALIN DRAF)
     -------------------------------------------------------------------------- */
  function copyToClipboard(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
      }).catch(() => {
        showToast(text);
      });
    } else {
      showToast(text);
    }
  }

  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      copyToClipboard(EMAIL_ADDRESS, 'Alamat email berhasil disalin!');
      const lbl = copyEmailBtn.querySelector('.copy-lbl');
      if (lbl) {
        lbl.textContent = 'Disalin!';
        setTimeout(() => { lbl.textContent = 'Salin'; }, 2000);
      }
    });
  }

  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const gmailSendBtn = document.getElementById('gmail-send-btn');
  const copyMessageBtn = document.getElementById('copy-message-btn');

  function setFormFeedback(message, type = 'success') {
    if (!formFeedback) return;
    formFeedback.textContent = message;
    formFeedback.classList.remove('hidden', 'is-success', 'is-error');
    formFeedback.classList.add(type === 'error' ? 'is-error' : 'is-success');
  }

  function validateAndReadContactForm() {
    const nameEl = document.getElementById('contact-name');
    const emailEl = document.getElementById('contact-email');
    const subjectEl = document.getElementById('contact-subject');
    const messageEl = document.getElementById('contact-message');

    const fields = [nameEl, emailEl, subjectEl, messageEl];
    fields.forEach(el => el?.classList.remove('is-invalid'));

    const name = (nameEl?.value || '').trim();
    const email = (emailEl?.value || '').trim();
    const subject = (subjectEl?.value || '').trim();
    const message = (messageEl?.value || '').trim();

    if (!name || !email || !subject || !message) {
      fields.forEach(el => {
        if (el && !el.value.trim()) el.classList.add('is-invalid');
      });
      setFormFeedback('Mohon lengkapi seluruh kolom yang bertanda wajib (*).', 'error');
      showToast('Silakan lengkapi semua kolom formulir.');
      return null;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailEl?.classList.add('is-invalid');
      setFormFeedback('Format alamat email tidak valid. Contoh: nama@domain.com', 'error');
      showToast('Format alamat email tidak valid.');
      return null;
    }

    const formattedBody = `Halo Rahmat,\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`;
    return { name, email, subject, message, formattedBody };
  }

  if (contactForm) {
    contactForm.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('input', () => field.classList.remove('is-invalid'));
    });

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = validateAndReadContactForm();
      if (!data) return;

      const mailtoUrl = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.formattedBody)}`;
      window.location.href = mailtoUrl;
      setFormFeedback('Membuka aplikasi email Anda. Jika tidak terbuka otomatis, gunakan tombol Gmail Web atau Salin Draf.', 'success');
      showToast('Membuka aplikasi email...');
    });
  }

  if (gmailSendBtn) {
    gmailSendBtn.addEventListener('click', () => {
      const data = validateAndReadContactForm();
      if (!data) return;

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL_ADDRESS)}&su=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.formattedBody)}`;
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      setFormFeedback('Membuka jendela tulis pesan di Gmail Web.', 'success');
      showToast('Membuka Gmail Web...');
    });
  }

  if (copyMessageBtn) {
    copyMessageBtn.addEventListener('click', () => {
      const data = validateAndReadContactForm();
      if (!data) return;

      const fullDraft = `Kepada: ${EMAIL_ADDRESS}\nSubjek: ${data.subject}\n\n${data.formattedBody}`;
      copyToClipboard(fullDraft, 'Draf pesan berhasil disalin ke clipboard!');
      setFormFeedback('Draf pesan berhasil disalin. Anda dapat menempelkannya ke aplikasi email pilihan Anda.', 'success');
    });
  }

  /* --------------------------------------------------------------------------
     15. NOTIFIKASI TOAST
     -------------------------------------------------------------------------- */
  function showToast(pesan) {
    const toastBox = document.getElementById('toast-container');
    if (!toastBox) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = pesan;
    toastBox.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 2600);
  }

  /* --------------------------------------------------------------------------
     16. MENU AKTIF MENGIKUTI POSISI SCROLL (SCROLL-SPY)
     -------------------------------------------------------------------------- */
  const pageSections = document.querySelectorAll('main section[id]');
  if (pageSections.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
          });
        }
      });
    }, { rootMargin: '-42% 0px -52% 0px' });

    pageSections.forEach(section => sectionObserver.observe(section));
  }
});
