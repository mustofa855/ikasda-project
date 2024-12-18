<template>
    <div class="min-h-screen ml-64 bg-gray-100">
      <!-- Navbar -->
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-gray-900">Audit Aktivitas</h1>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Rekap Aktivitas</h2>
          <table class="min-w-full bg-white shadow rounded-lg">
            <thead>
              <tr class="bg-gray-200">
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
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: "AuditAktivitas",
  };
  </script>