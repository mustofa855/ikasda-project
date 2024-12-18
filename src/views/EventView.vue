<template>
    <div class="bg-gray-100 min-h-screen">
      <!-- Hero Section -->
      <section class="bg-ikasda-primary text-white py-20 text-center">
        <h1 class="text-4xl font-bold mb-4">Kalender Event</h1>
        <p class="text-lg max-w-3xl mx-auto">
          Jelajahi berbagai acara yang akan datang, daftarkan diri, dan pastikan kehadiran Anda!
        </p>
      </section>
  
      <!-- Calendar and Event List Section -->
      <section class="py-16 px-4 bg-white">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl font-semibold text-center mb-10">Event yang Akan Datang</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Event Card 1 -->
            <div class="bg-gray-50 shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x200"
                alt="Event Thumbnail"
                class="w-full h-48 object-cover"
              />
              <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">Judul Event 1</h3>
                <p class="text-gray-600 text-sm mb-4">
                  Tanggal: 25 Desember 2024 | Lokasi: Gedung Alumni
                </p>
                <router-link
                  to="/events/1"
                  class="text-ikasda-primary font-bold hover:underline"
                >
                  Lihat Detail & Daftar
                </router-link>
              </div>
            </div>
  
            <!-- Event Card 2 -->
            <div class="bg-gray-50 shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x200"
                alt="Event Thumbnail"
                class="w-full h-48 object-cover"
              />
              <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">Judul Event 2</h3>
                <p class="text-gray-600 text-sm mb-4">
                  Tanggal: 5 Januari 2025 | Lokasi: Aula Sekolah
                </p>
                <router-link
                  to="/events/2"
                  class="text-ikasda-primary font-bold hover:underline"
                >
                  Lihat Detail & Daftar
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Footer -->
      <footer class="bg-ikasda-primary text-white py-6 text-center">
        <p>© 2024 Ikatan Alumni SMA NEGERI 2 LEMBANG. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: "EventView",
  };
  </script>
  
  <style>
  /* Styling tambahan jika diperlukan */
  </style>
  