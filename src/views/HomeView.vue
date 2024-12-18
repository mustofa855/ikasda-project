<template>
  <div class="bg-gray-100">
    <!-- Hero Section -->
    <section class="bg-ikasda-primary text-white py-20 text-center">
      <h1 class="text-4xl font-bold mb-4">Selamat Datang di Website Ikatan Alumni SMA NEGERI 2 LEMBANG</h1>
      <p class="text-lg max-w-2xl mx-auto">
        Menyatukan alumni, menyambung silaturahmi, dan membangun masa depan bersama.
      </p>
      <p class="text-lg text-white mb-2">Yuk, login ke akun alumni kamu untuk melihat berita, event, dan galeri
        komunitas alumni!</p>
      <router-link to="/about">
        <button class="mt-2 px-8 py-2 bg-white text-ikasda-primary font-semibold rounded-md shadow hover:bg-gray-200">
          Pelajari Lebih Lanjut
        </button>
      </router-link>
    </section>

    <!-- Berita Terkini -->
    <section class="py-10 px-6">
      <h2 class="text-3xl font-semibold mb-6 text-center">Berita Terkini</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BeritaCard
          v-for="(item, index) in berita"
          :key="index"
          :title="item.title"
          :description="item.description"
          :imgSrc="item.imgSrc"
        />
      </div>
    </section>

    <!-- Event Mendatang -->
    <section class="py-10 px-6 bg-gray-100">
      <h2 class="text-3xl font-semibold mb-6 text-center">Event Mendatang</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <EventCard
          v-for="(event, index) in events"
          :key="index"
          :title="event.title"
          :date="event.date"
          :location="event.location"
        />
      </div>
    </section>

    <!-- Tentang Kami Section -->
    <section class="py-16 px-4 bg-white text-center">
      <h2 class="text-3xl font-semibold mb-6">Tentang Kami</h2>
      <p class="text-gray-600 max-w-3xl mx-auto">
        Ikatan Alumni SMA ini dibentuk untuk mempererat hubungan antar alumni,
        berbagi pengalaman, dan menciptakan kolaborasi yang berdampak positif
        bagi masyarakat dan sekolah kita tercinta.
      </p>
    </section>

    <!-- Event Section -->
    <section class="py-16 bg-gray-50 text-center">
      <h2 class="text-3xl font-semibold mb-6">Event Mendatang</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <!-- Card 1 -->
        <div class="bg-white shadow rounded-lg p-6">
          <h3 class="text-xl font-bold mb-2">Reuni Akbar 2024</h3>
          <p class="text-gray-600">Tanggal: 10 Juli 2024</p>
          <p class="text-gray-600">Lokasi: Aula SMA Kita</p>
          <button class="mt-4 px-6 py-2 bg-ikasda-primary text-white font-semibold rounded-md hover:bg-blue-700">
            Detail
          </button>
        </div>
        <!-- Card 2 -->
        <div class="bg-white shadow rounded-lg p-6">
          <h3 class="text-xl font-bold mb-2">Donasi Pendidikan</h3>
          <p class="text-gray-600">Tanggal: 20 Agustus 2024</p>
          <p class="text-gray-600">Lokasi: Online</p>
          <button class="mt-4 px-6 py-2 bg-ikasda-primary text-white font-semibold rounded-md hover:bg-blue-700">
            Detail
          </button>
        </div>
        <!-- Card 3 -->
        <div class="bg-white shadow rounded-lg p-6">
          <h3 class="text-xl font-bold mb-2">Lomba Olahraga Alumni</h3>
          <p class="text-gray-600">Tanggal: 15 September 2024</p>
          <p class="text-gray-600">Lokasi: Lapangan SMA</p>
          <button class="mt-4 px-6 py-2 bg-ikasda-primary text-white font-semibold rounded-md hover:bg-blue-700">
            Detail
          </button>
        </div>
      </div>
    </section>

    <!-- Pesan Alumni Section -->
    <section class="py-16 bg-white text-center">
      <h2 class="text-3xl font-semibold mb-6">Kesan dan Pesan Alumni</h2>
      <div class="max-w-4xl mx-auto">
        <blockquote class="text-lg italic text-gray-600">
          "Ikatan Alumni ini memberikan wadah yang luar biasa untuk tetap
          terhubung dan berbagi pengalaman. Saya merasa sangat bersyukur menjadi
          bagian dari komunitas ini."
        </blockquote>
        <p class="text-right mt-4 text-gray-700 font-semibold">- Mustofa Firdaus, Angkatan 1 (2017)</p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-ikasda-primary text-white py-6 text-center">
      <p>© 2024 Ikatan Alumni SMA NEGERI 2 LEMBANG. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BeritaCard from '@/components/BeritaCard.vue';
import EventCard from '@/components/EventCard.vue';

// Data
const berita = ref([
  { title: 'Judul Berita 1', description: 'Deskripsi berita 1.', imgSrc: '/assets/images/berita.jpg' },
  { title: 'Judul Berita 2', description: 'Deskripsi berita 2.', imgSrc: '/assets/images/berita.jpg' },
  { title: 'Judul Berita 3', description: 'Deskripsi berita 3.', imgSrc: '/assets/images/berita.jpg' },
]);

const events = ref([
  { title: 'Event 1', date: '12 Agustus 2024', location: 'Gedung Sekolah' },
  { title: 'Event 2', date: '20 Agustus 2024', location: 'Aula Utama' },
  { title: 'Event 3', date: '5 September 2024', location: 'Lapangan Olahraga' },
]);
</script>

<style>
/* Tambahkan styling tambahan jika dibutuhkan */
</style>
