<template>
    <div class="container mx-auto p-6 bg-gray-100 min-h-screen">
      <!-- Header Halaman -->
      <header class="text-center mb-8">
        <h1 class="text-3xl font-bold text-blue-700">Dashboard Alumni</h1>
        <p class="text-gray-600 mt-2">
          Selamat datang di halaman utama Ikatan Alumni. Pilih fitur yang ingin Anda akses.
        </p>
      </header>
  
      <!-- Card Menu Navigasi -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Profil Alumni -->
        <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Profil Alumni</h2>
          <p class="text-gray-600 mb-4">
            Lihat dan perbarui data pribadi Anda seperti foto, angkatan, dan pekerjaan.
          </p>
          <router-link
            to="/alumni/profile-alumni"
            class="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Buka Profil
          </router-link>
        </div>
  
        <!-- Kesan & Pesan -->
        <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Kesan & Pesan</h2>
          <p class="text-gray-600 mb-4">
            Tulis kenangan atau pesan spesial untuk sekolah dan alumni lainnya.
          </p>
          <router-link
            to="/alumni/kesan-pesan"
            class="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Tulis Pesan
          </router-link>
        </div>
  
        <!-- Event Alumni -->
        <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Event Alumni</h2>
          <p class="text-gray-600 mb-4">
            Daftar ke acara reuni dan lihat riwayat partisipasi Anda.
          </p>
          <router-link
            to="/alumni/event-alumni"
            class="inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Lihat Event
          </router-link>
        </div>

        <!-- Event Alumni -->
        <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Berita Alumni</h2>
          <p class="text-gray-600 mb-4">
            Baca Berita dan tidak ketinggalan info terkait alumni.
          </p>
          <router-link
            to="/alumni/news"
            class="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Lihat Berita
          </router-link>
        </div>
  
        <!-- Donasi -->
        <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Donasi</h2>
          <p class="text-gray-600 mb-4">
            Berikan kontribusi Anda dan pantau laporan penggunaan dana.
          </p>
          <router-link
            to="/alumni/donasi"
            class="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Donasi Sekarang
          </router-link>
        </div>
  
        <!-- Forum Diskusi -->
        <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Forum Diskusi</h2>
          <p class="text-gray-600 mb-4">
            Diskusi antar alumni berdasarkan angkatan atau topik tertentu.
          </p>
          <router-link
            to="/alumni/forum-diskusi"
            class="inline-block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Buka Forum
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "DashboardAlumni",
  };
  </script>
  
  <style scoped>
  /* Tambahan gaya jika diperlukan */
  </style>
  