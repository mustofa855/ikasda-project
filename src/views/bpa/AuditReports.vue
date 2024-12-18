<template>
    <div class="min-h-screen ml-64 bg-gray-100">
      <!-- Navbar -->
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-gray-900">Laporan Audit</h1>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Buat Laporan</h2>
          <form class="bg-white shadow rounded-lg p-6">
            <div class="mb-4">
              <label for="judul" class="block text-gray-700 font-medium">Judul Laporan</label>
              <input id="judul" type="text" class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200" placeholder="Masukkan judul laporan">
            </div>
            <div class="mb-4">
              <label for="deskripsi" class="block text-gray-700 font-medium">Deskripsi</label>
              <textarea id="deskripsi" rows="5" class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200" placeholder="Masukkan deskripsi laporan"></textarea>
            </div>
            <div class="mb-4">
              <label for="tanggal" class="block text-gray-700 font-medium">Tanggal Laporan</label>
              <input id="tanggal" type="date" class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200">
            </div>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Simpan Laporan</button>
          </form>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: "LaporanAudit",
  };
  </script>
  
  <style scoped>
  /* Tambahkan style tambahan jika diperlukan */
  </style>