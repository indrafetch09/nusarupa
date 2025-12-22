# 🎨 Nusarupa Hub

![Project Status](https://img.shields.io/badge/status-development-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![Tech Stack](https://img.shields.io/badge/stack-React%20%7C%20Supabase%20%7C%20Tailwind-blueviolet)

**Nusarupa Hub** adalah platform berbasis web yang menghubungkan komunitas seni dan kegiatan sosial. Platform ini memfasilitasi manajemen program sukarelawan, pameran karya seni digital (galeri), serta penggalangan donasi untuk kegiatan sosial di Indonesia.

## ✨ Fitur Utama

Sistem ini menggunakan **Role-Based Access Control (RBAC)** yang membagi akses menjadi dua:

### 👤 User (Pengguna Umum & Relawan)
- **Autentikasi:** Register & Login (Email/Password).
- **Program Sosial:** Melihat dan mendaftar sebagai relawan pada program aktif.
- **Galeri Karya:** Mengunggah dan memamerkan karya seni digital.
- **Donasi:** Melakukan donasi untuk mendukung program.
- **Profil:** Manajemen data diri dan riwayat aktivitas.

### 🛡️ Admin (Panel Administrator)
- **Dashboard:** Statistik real-time (Total User, Donasi, Program).
- **Manajemen Program:** Membuat (CRUD) event dan kegiatan baru.
- **Kurasi Karya:** Memantau dan mengelola karya yang diunggah user.
- **Monitoring:** Melihat daftar pendaftar program dan riwayat donasi.

---

## 🛠️ Tech Stack

**Frontend:**
- [React.js](https://react.dev/) (Vite) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shadcn UI](https://ui.shadcn.com/) - UI Components
- [TanStack Query](https://tanstack.com/query) - Server State Management

**Backend & Database:**
- [Supabase](https://supabase.com/) - Backend as a Service (BaaS)
- **PostgreSQL** - Database utama
- **Supabase Auth** - Autentikasi & Manajemen User
- **Supabase Storage** - Penyimpanan gambar (Karya & Banner Program)

---
