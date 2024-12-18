<template>
    <div class="bg-gray-100 min-h-screen">
      <!-- Event Header -->
      <section class="bg-ikasda-primary text-white py-20 text-center">
        <h1 class="text-4xl font-bold mb-4">Detail Event</h1>
        <p class="text-lg max-w-3xl mx-auto">
          Pastikan Anda mendaftar dan hadir di acara ini.
        </p>
      </section>
  
      <!-- Event Details -->
      <section class="py-16 px-4 bg-white">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-semibold mb-6">Judul Event</h2>
          <p class="text-gray-700 mb-4">Tanggal: 25 Desember 2024</p>
          <p class="text-gray-700 mb-4">Lokasi: Gedung Alumni</p>
          <p class="text-gray-600 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor
            elit nec lacus tempus, sed venenatis lacus pellentesque.
          </p>
          <button
            class="bg-ikasda-primary text-white py-2 px-6 rounded hover:bg-ikasda-secondary"
          >
            Daftar Sekarang
          </button>
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
    name: "EventDetailView",
    props: ["id"], // Mengambil ID event dari rute
  };
  </script>
  