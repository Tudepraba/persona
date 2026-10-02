/* ==========================================================
   ISI DATA KAMU DI SINI
   Semua teks di website diambil dari file ini.
   Kosongkan ("") atau hapus item yang tidak dipakai.
   ========================================================== */
window.PORTFOLIO = {
  name: "Nama Kamu",
  kicker: "Take a look at my work",
  tagLeft: "Portfolio // Nama Kamu",
  tagRight: "Kota - Jurusan atau Profesi",
  timezone: "Asia/Makassar",          // zona waktu untuk jam di pojok kanan bawah
  photo: "",                          // contoh: "assets/foto.png" (kosong = bentuk abstrak)

  bio: "Tulis perkenalan singkat tentang kamu: bidang, minat, dan hal yang sedang kamu kerjakan.",

  // Isi username GitHub untuk mengambil daftar repositori otomatis.
  // Kosongkan ("") kalau mau memakai daftar manual di "projects".
  githubUser: "",

  // Proyek unggulan (kartu gelap di bagian atas)
  featured: [
    { title: "Proyek Unggulan 1", desc: "Deskripsi singkat proyek.", tag: "Live", link: "", note: "Live now" },
    { title: "Proyek Unggulan 2", desc: "Deskripsi singkat proyek.", tag: "Python", link: "", note: "Highlight" },
    { title: "Proyek Unggulan 3", desc: "Deskripsi singkat proyek.", tag: "Web", link: "", note: "Highlight" }
  ],

  // Daftar proyek manual (dipakai jika githubUser kosong atau gagal dimuat)
  projects: [
    { title: "Proyek A", desc: "Deskripsi proyek A.", tag: "Repo", link: "", stars: 0 },
    { title: "Proyek B", desc: "Deskripsi proyek B.", tag: "Python", link: "", stars: 0 },
    { title: "Proyek C", desc: "Deskripsi proyek C.", tag: "HTML", link: "", stars: 0 }
  ],

  skills: [
    { title: "Programming", items: ["Python", "C", "JavaScript"] },
    { title: "Hardware", items: ["Raspberry Pi", "Arduino", "PCB Design"] },
    { title: "Tools", items: ["Git", "Linux", "Figma"] }
  ],

  about: {
    paragraphs: [
      "Paragraf pertama tentang latar belakang kamu.",
      "Paragraf kedua tentang apa yang kamu pelajari dan ingin capai."
    ],
    facts: [
      { label: "Pendidikan", value: "Isi di sini" },
      { label: "Lokasi", value: "Isi di sini" },
      { label: "Minat", value: "Isi di sini" }
    ]
  },

  contact: [
    { title: "Email", desc: "nama@email.com", tag: "Mail", link: "mailto:nama@email.com" },
    { title: "GitHub", desc: "github.com/username", tag: "Code", link: "https://github.com/" },
    { title: "LinkedIn", desc: "linkedin.com/in/username", tag: "Network", link: "https://linkedin.com/" }
  ]
};
