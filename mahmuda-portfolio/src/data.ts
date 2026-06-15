import { GitHubProfile, GitHubRepo, Skill, TimelineEvent } from './types';

export const FALLBACK_PROFILE: GitHubProfile = {
  login: 'mahmuda1004',
  name: 'Mahmuda',
  avatar_url: 'https://avatars.githubusercontent.com/u/79155702?v=4',
  bio: 'Lulusan S1 Informatika Universitas Mulawarman (IPK 3.56). Keahlian dalam pengembangan aplikasi web dan pengolahan data. Berpengalaman sebagai Fasilitator Google Cloud Arcade & praktisi ETL, sensor real-time, dan Regresi Linear Berganda.',
  public_repos: 12,
  followers: 15,
  following: 18,
  html_url: 'https://github.com/mahmuda1004',
  company: 'Universitas Mulawarman Alumni',
  location: 'Samarinda, Indonesia',
  blog: 'https://github.com/mahmuda1004',
};

export const CORE_SKILLS: Skill[] = [
  // Languages
  { name: 'Python', icon: 'Terminal', category: 'languages', level: 85, yearsOfExp: 3 },
  { name: 'PHP', icon: 'Code', category: 'languages', level: 88, yearsOfExp: 4 },
  { name: 'JavaScript', icon: 'Code', category: 'languages', level: 90, yearsOfExp: 4 },
  { name: 'Dart', icon: 'Smartphone', category: 'languages', level: 75, yearsOfExp: 2 },
  { name: 'C++', icon: 'Cpu', category: 'languages', level: 78, yearsOfExp: 3 },
  { name: 'HTML5/CSS3', icon: 'Globe', category: 'languages', level: 95, yearsOfExp: 5 },

  // Frontend & Web
  { name: 'Web Development', icon: 'Layers', category: 'frontend', level: 90, yearsOfExp: 4 },
  { name: 'Data Visualization', icon: 'LineChart', category: 'frontend', level: 85, yearsOfExp: 3 },
  { name: 'API Integration', icon: 'Activity', category: 'backend', level: 86, yearsOfExp: 3 },

  // Data & Integration
  { name: 'Extract-Transform-Load (ETL)', icon: 'Cpu', category: 'backend', level: 85, yearsOfExp: 2 },
  { name: 'Linear Regression Modeling', icon: 'TrendingUp', category: 'backend', level: 88, yearsOfExp: 2 },
  { name: 'MySQL / SQL Database', icon: 'Database', category: 'backend', level: 88, yearsOfExp: 4 },

  // Tools & Clouds
  { name: 'Git & GitHub', icon: 'Github', category: 'tools', level: 90, yearsOfExp: 4 },
  { name: 'Google Cloud Platform', icon: 'Cloud', category: 'tools', level: 80, yearsOfExp: 1 },
  { name: 'AWS Cloud', icon: 'Cloud', category: 'tools', level: 75, yearsOfExp: 1 },
  { name: 'VS Code & Linux', icon: 'Settings', category: 'tools', level: 88, yearsOfExp: 4 },
];

export const FEATURED_PROJECTS_CUSTOM: GitHubRepo[] = [
  {
    id: 101,
    name: 'sistem-monitoring-kualitas-udara',
    description: 'Sistem monitoring kualitas udara berbasis web (PHP) dengan integrasi sensor real-time (PM2.5, PM10, CO) dan metode Regresi Linear Berganda untuk prediksi tren kualitas udara.',
    html_url: 'https://github.com/mahmuda1004/sistem-monitoring-kualitas-udara',
    homepage: 'https://github.com/mahmuda1004',
    stargazers_count: 15,
    watchers_count: 15,
    forks_count: 2,
    language: 'PHP',
    topics: ['php', 'linear-regression', 'air-quality', 'sensors', 'data-visualization', 'mysql'],
    updated_at: '2024-08-15T10:30:00Z',
    created_at: '2024-02-10T08:00:00Z',
    size: 2048,
  },
  {
    id: 102,
    name: 'bookshelf-app',
    description: 'Aplikasi manajemen data buku (CRUD) dengan fitur penyimpanan data buku, pelacakan status baca, pencarian interaktif, dan validasi data sisi aplikasi.',
    html_url: 'https://github.com/mahmuda1004/bookshelf-app',
    homepage: 'https://github.com/mahmuda1004',
    stargazers_count: 8,
    watchers_count: 8,
    forks_count: 1,
    language: 'JavaScript',
    topics: ['javascript', 'web-storage', 'crud', 'bookshelf', 'state-validation'],
    updated_at: '2023-11-20T14:20:00Z',
    created_at: '2023-10-05T11:45:00Z',
    size: 512,
  },
  {
    id: 103,
    name: 'simple-etl-pipeline',
    description: 'Alur Extract, Transform, Load (ETL) sederhana menggunakan Python untuk memproses data mentah (raw data), melakukan data cleaning, pemulasan struktur data, dan memuatnya ke database SQL.',
    html_url: 'https://github.com/mahmuda1004/simple-etl-pipeline',
    homepage: null,
    stargazers_count: 5,
    watchers_count: 5,
    forks_count: 0,
    language: 'Python',
    topics: ['python', 'etl-pipeline', 'data-cleaning', 'data-transformation', 'sql'],
    updated_at: '2024-12-01T09:15:00Z',
    created_at: '2024-11-15T16:30:00Z',
    size: 1024,
  },
  {
    id: 104,
    name: 'report-canvasing-sales-agent',
    description: 'Solusi digitalisasi pelaporan harian agen sales lapangan STO Dahlia Kota Samarinda, dikembangkan selama Praktik Kerja Lapangan di Telkom Sentral Otomat.',
    html_url: 'https://github.com/mahmuda1004/report-canvasing-sales-agent',
    homepage: null,
    stargazers_count: 12,
    watchers_count: 12,
    forks_count: 2,
    language: 'PHP',
    topics: ['php', 'telkom-sto', 'sales-canvasing', 'html-css-javascript', 'digitalization'],
    updated_at: '2022-08-30T22:10:00Z',
    created_at: '2022-07-10T13:20:00Z',
    size: 4096,
  },
];

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    id: 1,
    year: 'Juli 2025 - September 2025',
    title: 'Fasilitator Google Cloud Arcade',
    company: 'Google & Dicoding Indonesia',
    description: 'Membimbing peserta dalam memahami materi Cloud Computing dan dasar-dasar Artificial Intelligence. Memberikan bantuan teknis bagi peserta dalam menyelesaikan modul praktis (labs) dan mendapatkan berbagai skill badges di platform Google Cloud.',
    tags: ['Google Cloud', 'Cloud Computing', 'Artificial Intelligence', 'Mentorship'],
    type: 'work',
  },
  {
    id: 2,
    year: 'Juli 2022 - Agustus 2022',
    title: 'Praktik Kerja Lapangan',
    company: 'Telkom Sentral Otomat (STO) Dahlia Kota Samarinda',
    description: 'Mengembangkan aplikasi web "Website Report Canvasing Sales Agent" untuk digitalisasi pelaporan harian menggunakan HTML, CSS, JavaScript, dan PHP. Melakukan pengujian sistem (testing & debugging) serta menyusun dokumentasi teknis aplikasi untuk kebutuhan operasional perusahaan.',
    tags: ['PHP', 'HTML/CSS', 'JavaScript', 'Testing & Debugging', 'Documentation'],
    type: 'work',
  },
  {
    id: 3,
    year: '2019 - 2024',
    title: 'S1 Informatika (IPK 3.56 / 4.00)',
    company: 'Universitas Mulawarman',
    description: 'Studi S1 dengan fokus pengajaran terapan komputer dan analisis data. Judul Skripsi: "Implementasi Metode Regresi Linear Berganda pada Sistem Monitoring Kualitas Udara Menggunakan Wireless Sensor Network". Lulus dengan IPK memuaskan (3.56) dan aktif berorganisasi.',
    tags: ['S1 Informatika', 'Data Science', 'Linear Regression', 'Internet of Things (IoT)'],
    type: 'education',
  },
];

// Curated Local README.md Fallbacks to render if GitHub offline / raw endpoint rate limits are hit
export const CURATED_READMES_FALLBACK: Record<string, string> = {
  'sistem-monitoring-kualitas-udara': `
# Sistem Monitoring Kualitas Udara Berbasis Web (PHP)

Sistem Web responsif untuk memantau data sensor kualitas udara secara real-time dan memprediksi kecenderungan kualitas udara di masa mendatang menggunakan Analisis Regresi Linear Berganda.

![Sistem Kualitas Udara](https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1200&q=80)

## Fitur Utama

- **Integrasi API Sensor Real-time**: Mengambil data sensor udara PM2.5, PM10, dan CO secara berkala.
- **Prediksi Regresi Linear Berganda**: Menerapkan model statistik regresi linear berganda untuk memproyeksikan tren indeks kualitas udara.
- **Dashboard Grafis Responsif**: Visualisasi data interaktif menggunakan grafik pendukung untuk memudahkan pemantauan harian.
- **Pemberitahuan Ambang Batas**: Menampilkan status waspada jika sensor mendeteksi gas di atas batas paparan aman.

## Struktur & Teknologi

- **Backend / Routing**: PHP Native + MySQL Database
- **Frontend UI**: CSS Modern Grid & Flexbox, Bootstrap, Chart.js
- **Model Analitik**: Regresi Linear Berganda (Multi-linear Regression) pada Data Sensor
  `,

  'bookshelf-app': `
# Bookshelf App (Submission Dicoding)

Aplikasi manajemen buku yang efisien untuk membantu pembaca mengatur koleksi bacaan pribadi mereka secara menyeluruh.

![Bookshelf App Layout](https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80)

## Spesifikasi & Fitur

- **Aktivitas CRUD Lengkap**: Menambahkan buku baru, memperbarui entri, menghapus database secara langsung, serta menandai buku sebagai selesai dibaca.
- **Web Storage Persistence**: Menggunakan localStorage agar data tersimpan dengan aman langsung di browser pengguna tanpa memerlukan login.
- **Pencarian Buku Dinamis**: Pencarian real-time berdasarkan judul atau penulis untuk mempercepat penelusuran.
- **State Validation**: Memastikan validitas pengolahan data pada sisi aplikasi agar tidak terjadi duplikasi atau input kosong.
  `,

  'simple-etl-pipeline': `
# Python Simple ETL Pipeline

Implementasi pipeline Extract, Transform, and Load (ETL) sederhana menggunakan pustaka Python modern untuk mengotomatisasi pengolahan data mentah.

![ETL Data Pipeline Concept](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80)

## Alur Pipeline

1. **Extract**: Mengekstrak data mentah dalam format CSV, JSON, atau dari API publik.
2. **Transform**: 
   - Melakukan pembersihan data (*data cleaning*) untuk menangani baris kosong atau duplikat.
   - Standardisasi format tanggal, skala numerik, dan pemetaan kategori.
3. **Load**: Memuat dataset yang telah dibersihkan secara terstruktur ke dalam database relasional MySQL/Postgres.

## Komponen Utama
- **Python 3.10+**
- **Pandas** untuk transformasi data struktural berkinerja tinggi.
- **SQLAlchemy** sebagai ORM/penghubung database engine.
  `,

  'report-canvasing-sales-agent': `
# Website Report Canvasing Sales Agent (Telkom STO Dahlia)

Sistem pelaporan aktivitas harian agen sales canvasing di wilayah operasional Telkom STO Dahlia Kota Samarinda untuk meningkatkan efektivitas pengumpulan data calon pelanggan.

![Telkom Sales Report](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80)

## Fungsi Utama

- **Digitalisasi Laporan Harian**: Menggantikan berkas fisik dengan formulir digital terpadu (HTML5/PHP).
- **Audit Canvas**: Memungkinkan tim koordinator melacak keandalan data pelaporan yang diajukan oleh agen di lapangan.
- **Pengujian & Debugging**: Dilengkapi pengujian manual dan otomatis sederhana untuk memastikan kestabilan aplikasi operasional.
- **Dokumentasi Teknis Lengkap**: Dilengkapi buku panduan pengoperasian teknis demi kenyamanan instalasi dan transfer pengetahuan bagi perusahaan.
  `
};

