<template>
    <div class="ml-64 p-6">
      <h1 class="text-3xl font-bold mb-4">Dashboard Direksi</h1>
  
      <!-- Ringkasan Statistik -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-blue-500 text-white p-4 rounded shadow">
          <h2 class="text-xl font-semibold">Jumlah Alumni</h2>
          <p class="text-2xl">{{ statistics.alumni }}</p>
        </div>
        <div class="bg-green-500 text-white p-4 rounded shadow">
          <h2 class="text-xl font-semibold">Total Donasi</h2>
          <p class="text-2xl">Rp {{ statistics.donasi }}</p>
        </div>
        <div class="bg-yellow-500 text-white p-4 rounded shadow">
          <h2 class="text-xl font-semibold">Event Aktif</h2>
          <p class="text-2xl">{{ statistics.events }}</p>
        </div>
      </section>
  
      <!-- Laporan Keuangan -->
      <section class="mb-6">
        <h2 class="text-2xl font-semibold mb-4">Laporan Keuangan</h2>
        <table class="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th class="py-2 px-4 border">Deskripsi</th>
              <th class="py-2 px-4 border">Tanggal</th>
              <th class="py-2 px-4 border">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(report, index) in financialReports" :key="index" class="hover:bg-gray-100">
              <td class="py-2 px-4 border">{{ report.description }}</td>
              <td class="py-2 px-4 border">{{ report.date }}</td>
              <td class="py-2 px-4 border">Rp {{ report.amount }}</td>
            </tr>
          </tbody>
        </table>
      </section>
  
      <!-- Event Terkini -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Event Terkini</h2>
        <ul class="space-y-2">
          <li v-for="(event, index) in events" :key="index" class="p-4 bg-white border rounded shadow">
            <h3 class="text-lg font-bold">{{ event.title }}</h3>
            <p class="text-gray-600">{{ event.date }}</p>
          </li>
        </ul>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Statistik Ringkasan
  const statistics = ref({
    alumni: 1200,
    donasi: "500.000.000",
    events: 5,
  });
  
  // Laporan Keuangan (Dummy Data)
  const financialReports = ref([
    { description: "Donasi Alumni 2023", date: "2024-01-15", amount: "250.000.000" },
    { description: "Penggalangan Dana", date: "2024-02-10", amount: "150.000.000" },
    { description: "Sponsor Reuni Akbar", date: "2024-03-05", amount: "100.000.000" },
  ]);
  
  // Event Terkini
  const events = ref([
    { title: "Reuni Akbar 2024", date: "2024-12-01" },
    { title: "Donasi Pendidikan", date: "2024-11-15" },
  ]);
  </script>
  