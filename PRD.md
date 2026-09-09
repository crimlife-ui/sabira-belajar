# Product Requirement Document (PRD)
## Sabira Belajar: Edukasi Huruf, Angka & Berhitung Ceria

---

## 1. Ringkasan Eksekutif & Visi Produk
* **Nama Produk**: Sabira Belajar
* **Kategori**: Aplikasi Edukasi Anak Usia Dini (EdTech - Early Childhood Education)
* **Target Pengguna**: 
  - **Pengguna Utama**: Anak usia 3 – 7 tahun (PAUD, TK, hingga awal SD).
  - **Pengguna Pendukung**: Orang tua, guru, atau wali pendamping.
* **Visi Produk**: 
  Menyediakan pengalaman belajar awal yang menyenangkan, interaktif, bebas stres, dan aman bagi anak-anak untuk menguasai pondasi literasi (huruf & mengeja) serta numerasi (angka & berhitung dasar).

---

## 2. Masalah & Peluang (Problem & Opportunity)
* **Masalah**:
  1. Anak-anak cepat bosan dengan metode menghafal konvensional atau worksheet kertas statis.
  2. Banyak aplikasi edukasi memiliki terlalu banyak iklan, gangguan visual, atau suara *buzzer* salah yang membuat anak patah semangat (frustrasi).
  3. Konsep matematika abstrak (seperti 2 + 1 = 3) sulit dipahami anak usia dini jika tidak didukung representasi visual konkret (benda nyata).
* **Peluang**:
  1. Penggabungan audio fonik lokal (bahasa Indonesia yang ramah), visual warna-warni, serta interaksi sentuh (*gamification*) terbukti mempercepat daya ingat dan keterlibatan anak.
  2. Desain aplikasi yang bersih (*child-friendly*), aman dari konten negatif, dan bisa dimainkan secara *offline*.

---

## 3. Profil Persona Pengguna
1. **Sabira (4-5 Tahun - Murid TK A / B)**:
   - Suka eksplorasi visual, menyentuh layar, mendengar suara efek lucu, dan mengoleksi hadiah stiker/bintang.
   - Belum bisa membaca instruksi teks panjang; navigasi harus mengandalkan ikon visual dan suara panduan (*voice-over*).
2. **Orang Tua / Wali**:
   - Menginginkan aplikasi yang bebas iklan mengganggu (*kid-safe*).
   - Ingin melihat progres belajar anak dan mengontrol waktu bermain (*screen time*).

---

## 4. Fitur Utama & Spesifikasi Fungsional

### Modul 1: Belajar Huruf & Literasi (Mengeja)
1. **Pengenalan Alfabet (A - Z)**:
   - Tampilan huruf besar (kapital) dan huruf kecil.
   - Audio fonik & pelafalan huruf dalam Bahasa Indonesia (contoh: "B", dibarengi kata asosiasi "B - Bola").
   - Ilustrasi pendukung yang menarik dan bergerak saat diklik.
2. **Latihan Menulis / Menelusuri Garis (Letter Tracing)**:
   - Menjiplak bentuk huruf dengan jari mengikuti titik panduan panah.
   - Deteksi akurasi garis sederhana dengan toleransi ramah anak.
   - Efek visual jejak garis bintang/pelangi saat jari menyentuh layar.
3. **Mengeja Kata Sederhana (Spelling Quest)**:
   - Menampilkan gambar objek (misal: "B-U-K-U", "I-B-U", "A-P-E-L").
   - Kolom huruf kosong dengan balok huruf acak di bawahnya.
   - Interaksi *drag & drop* atau sentuh huruf untuk menyusun kata yang benar.
   - Pengucapan per-huruf saat disentuh dan pembacaan utuh kata setelah tersusun lengkap.

---

### Modul 2: Mengenal Angka & Konsep Jumlah (Numerasi)
1. **Kartu Angka (0 - 20)**:
   - Menampilkan simbol angka beserta nama ejaannya (contoh: "5" - "LIMA").
   - Suara pengucapan yang jelas dan ceria.
2. **Menghitung Benda Konkret (Counting Objects)**:
   - Melatih konsep korespondensi satu-satu (bukan sekadar menghafal urutan angka).
   - Anak menyentuh objek di layar (misal: apel atau permen), objek akan melompat/bersuara "Satu", "Dua", "Tiga", dst., lalu menampilkan totalnya.
3. **Tracing Angka**:
   - Menjiplak angka 0–9 dengan panduan arah goresan.

---

### Modul 3: Berhitung Dasar (Matematika Ceria: + dan -)
1. **Penjumlahan Visual (+)**:
   - Menggunakan analogi penggabungan benda konkret:
     - Contoh: "2 Balon Merah" + "1 Balon Biru" -> Dikelompokkan bersama -> "Ada berapa balon semuanya?".
   - Pilihan jawaban menggunakan kartu bergambar atau kartu angka berukuran besar.
2. **Pengurangan Visual (-)**:
   - Menggunakan analogi menghilangkan / mengambil benda:
     - Contoh: "4 Donat" dikurangi 1 donat yang dimakan burung -> Sisa berapa donat di piring?
3. **Level Kesulitan Bertingkat**:
   - **Level 1 (Mudah)**: Operasi angka 1 – 5 dengan visual objek nyata.
   - **Level 2 (Sedang)**: Operasi angka 1 – 10 dengan visual objek nyata.
   - **Level 3 (Tantangan)**: Penjumlahan & Pengurangan angka murni 1 – 10 (disertai tombol bantuan visual jika anak bingung).

---

### Modul 4: Sistem Reward & Gamifikasi Ramah Anak
1. **Positive Feedback Loop**:
   - Jika jawaban benar: Animasi konfeti, bintang emas, tepuk tangan, dan suara: *"Hebat!", "Pintar sekali!"*.
   - Jika jawaban salah: **Tanpa penalti / tanpa suara buzzer seram**. Feedback berupa dorongan semangat: *"Yuk coba sekali lagi!"* atau objek bergoyang pelan.
2. **Buku Stiker / Album Koleksi**:
   - Setiap menyelesaikan 1 ronde latihan, anak mendapatkan 1 stiker karakter lucu untuk ditempel di papan stiker virtual.

---

### Modul 5: Parental Zone (Kunci Pengaman Orang Tua)
1. **Parental Gate**:
   - Akses menu pengaturan dilindungi soal logika dewasa (contoh: teks "Ketik: TIGA LIMA" atau perkalian sederhana) agar tidak sembarang dibuka anak.
2. **Pengaturan & Laporan**:
   - Pengaturan volume musik latar vs suara efek/suara narasi.
   - Pengingat batas waktu bermain (*Timer / Screen Time Limiter*).
   - Reset riwayat / stiker.

---

## 5. Kebutuhan Non-Fungsional & Prinsip Desain (UI/UX)
1. **Prinsip Desain Anak (Child-Centered Design)**:
   - Ukuran tombol minimal 48x48 dp (nyaman untuk motorik anak yang belum presisi).
   - Palet warna cerah namun teduh (pastel vibrant, tidak menyilaukan mata).
   - Minim teks instruksi; gunakan isyarat visual (ikon jari bergerak, pantulan animasi).
2. **Performa & Aksesibilitas**:
   - Waktu respons instan (tanpa *lag* saat menyentuh objek/audio).
   - Berjalan 100% **Offline-ready** tanpa perlu koneksi internet konstan.
3. **Privasi & Keamanan (COPPA / Child Safety Compliance)**:
   - Tanpa pelacakan data pribadi anak.
   - Tanpa tautan keluar atau iklan pihak ketiga yang tidak terkunci.

---

## 6. Opsi Rekomendasi Tech Stack
Tergantung platform target yang diinginkan:
* **Opsi A (Aplikasi Web Interaktif / PWA - React / Vue / HTML5 Canvas)**:
  - Cepat dibuat, bisa diakses dari browser tablet/laptop/smartphone tanpa install, mendukung animasi interaktif via Framer Motion / Canvas.
* **Opsi B (Mobile Native / Cross-Platform - Flutter)**:
  - Sangat halus untuk mobile/tablet Android & iOS, animasi 60fps, performa audio instan, dan penyimpanan lokal yang solid.
* **Opsi C (React Native / Expo)**:
  - Kompatibel dengan ekosistem JavaScript, mudah dikembangkan untuk Android/iOS.

---

## 7. Roadmap Rilis (Tahapan Pengembangan)
* **Milestone 1: Pondasi & Modul Huruf (MVP)**
  - Tampilan Home ramah anak.
  - Modul Pengenalan Alfabet A-Z & Audio fonik.
  - Modul Tracing Huruf dasar & Mini game eja 3 kata.
* **Milestone 2: Modul Angka & Menghitung**
  - Pengenalan angka 0-10 & Tracing.
  - Mini game hitung benda konkret (1-10).
* **Milestone 3: Modul Penjumlahan & Pengurangan**
  - Game visual penjumlahan (+).
  - Game visual pengurangan (-).
* **Milestone 4: Gamifikasi, Stiker & Parental Gate**
  - Album stiker reward.
  - Parental gate & kontrol suara.
