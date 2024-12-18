<template>
    <div class="min-h-screen ml-64 bg-gray-100">
      <!-- Header -->
      <header class="bg-blue-800 text-white py-4 shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold">Dashboard BPA</h1>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Statistik Singkat -->
          <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white shadow rounded-lg p-6">
              <h2 class="text-lg font-semibold text-gray-700">Aktivitas Diaudit</h2>
              <p class="text-3xl font-bold text-blue-800 mt-2">15</p>
            </div>
            <div class="bg-white shadow rounded-lg p-6">
              <h2 class="text-lg font-semibold text-gray-700">Event Diawasi</h2>
              <p class="text-3xl font-bold text-blue-800 mt-2">8</p>
            </div>
            <div class="bg-white shadow rounded-lg p-6">
              <h2 class="text-lg font-semibold text-gray-700">Laporan Dibuat</h2>
              <p class="text-3xl font-bold text-blue-800 mt-2">5</p>
            </div>
          </section>
  
          <!-- Tabel Aktivitas Terbaru -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h2>
            <table class="min-w-full bg-white shadow rounded-lg">
              <thead class="bg-gray-200">
                <tr>
                  <th class="px-4 py-2 text-left text-gray-700">Tanggal</th>
                  <th class="px-4 py-2 text-left text-gray-700">Aktivitas</th>
                  <th class="px-4 py-2 text-left text-gray-700">Pelaksana</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border px-4 py-2">01/12/2024</td>
                  <td class="border px-4 py-2">Rapat Bulanan</td>
                  <td class="border px-4 py-2">Admin BPA</td>
                </tr>
                <tr>
                  <td class="border px-4 py-2">05/12/2024</td>
                  <td class="border px-4 py-2">Pengawasan Event</td>
                  <td class="border px-4 py-2">Supervisor</td>
                </tr>
              </tbody>
            </table>
          </section>
  
          <!-- Progress Pengawasan Event -->
          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Pengawasan Event</h2>
            <div class="bg-white shadow rounded-lg p-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">Event Seminar BPA</h3>
                  <p class="text-sm text-gray-600">Status: <span class="text-green-600 font-bold">Disetujui</span></p>
                </div>
                <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Lihat Detail
                </button>
              </div>
            </div>
          </section>
  
          <!-- Grafik Aktivitas -->
          <section>
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Grafik Aktivitas</h2>
            <div class="bg-white shadow rounded-lg p-6">
              <p>Grafik akan ditambahkan di sini (gunakan library seperti Chart.js atau ApexCharts).</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: "DashboardBPA",
  };
  </script>
  
  <style scoped>
  /* Tambahkan style tambahan jika diperlukan */
  </style>
  