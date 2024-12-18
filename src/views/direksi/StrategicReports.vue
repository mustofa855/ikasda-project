<template>
    <div class="ml-64 p-6">
      <h2 class="text-xl font-bold mb-4">Laporan Strategis</h2>
  
      <!-- Ringkasan Statistik -->
      <div class="grid grid-cols-3 gap-4 mb-8">
        <div class="bg-gray-100 p-4 rounded shadow">
          <h3 class="text-lg font-semibold">Total Alumni</h3>
          <p class="text-3xl font-bold text-blue-600">5,245</p>
        </div>
        <div class="bg-gray-100 p-4 rounded shadow">
          <h3 class="text-lg font-semibold">Total Donasi</h3>
          <p class="text-3xl font-bold text-green-600">Rp 125.000.000</p>
        </div>
        <div class="bg-gray-100 p-4 rounded shadow">
          <h3 class="text-lg font-semibold">Jumlah Event</h3>
          <p class="text-3xl font-bold text-purple-600">15</p>
        </div>
      </div>
  
      <!-- Laporan Keuangan -->
      <div class="mb-8">
        <h3 class="text-lg font-bold mb-2">Laporan Keuangan</h3>
        <table class="table-auto w-full border">
          <thead>
            <tr class="bg-gray-200 text-left">
              <th class="px-4 py-2 border">Tanggal</th>
              <th class="px-4 py-2 border">Sumber Donasi</th>
              <th class="px-4 py-2 border">Jumlah</th>
              <th class="px-4 py-2 border">Penggunaan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-4 py-2 border">12/12/2024</td>
              <td class="px-4 py-2 border">Perusahaan X</td>
              <td class="px-4 py-2 border">Rp 10.000.000</td>
              <td class="px-4 py-2 border">Beasiswa</td>
            </tr>
            <tr>
              <td class="px-4 py-2 border">15/12/2024</td>
              <td class="px-4 py-2 border">Alumni Y</td>
              <td class="px-4 py-2 border">Rp 5.000.000</td>
              <td class="px-4 py-2 border">Operasional</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Data Event -->
      <div>
        <h3 class="text-lg font-bold mb-2">Data Event</h3>
        <table class="table-auto w-full border">
          <thead>
            <tr class="bg-gray-200 text-left">
              <th class="px-4 py-2 border">Nama Event</th>
              <th class="px-4 py-2 border">Tanggal</th>
              <th class="px-4 py-2 border">Partisipasi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-4 py-2 border">Reuni Akbar 2024</td>
              <td class="px-4 py-2 border">20/12/2024</td>
              <td class="px-4 py-2 border">350 orang</td>
            </tr>
            <tr>
              <td class="px-4 py-2 border">Webinar Alumni</td>
              <td class="px-4 py-2 border">18/11/2024</td>
              <td class="px-4 py-2 border">120 orang</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  </style>
  