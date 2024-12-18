<template>
    <div class="min-h-screen ml-64 bg-gray-100">
      <!-- Navbar -->
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-gray-900">Pengawasan Event</h1>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Event Direncanakan</h2>
          <ul class="bg-white shadow rounded-lg divide-y divide-gray-200">
            <li class="px-4 py-4 flex items-center justify-between">
              <div>
                <p class="text-lg font-semibold text-gray-800">Event Seminar BPA</p>
                <p class="text-sm text-gray-600">12 Desember 2024</p>
              </div>
              <div>
                <button class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mr-2">Setujui</button>
                <button class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Revisi</button>
              </div>
            </li>
            <li class="px-4 py-4 flex items-center justify-between">
              <div>
                <p class="text-lg font-semibold text-gray-800">Workshop Leadership</p>
                <p class="text-sm text-gray-600">15 Desember 2024</p>
              </div>
              <div>
                <button class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mr-2">Setujui</button>
                <button class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Revisi</button>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: "PengawasanEvent",
  };
  </script>
  
  <style scoped>
  /* Tambahkan style tambahan jika diperlukan */
  </style>