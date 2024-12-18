<template>
    <div class="bg-gray-100 min-h-screen">
      <!-- Hero Section -->
      <section class="bg-ikasda-primary text-white py-20 text-center">
        <h1 class="text-4xl font-bold mb-4">Galeri Dokumentasi</h1>
        <p class="text-lg max-w-3xl mx-auto">
          Dokumentasi foto dan video dari acara alumni.
        </p>
      </section>
  
      <!-- Gallery Section -->
      <section class="py-16 px-4 bg-white">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl font-semibold text-center mb-10">Foto & Video</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Gallery Item 1 -->
            <div class="bg-gray-50 shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Gallery Item"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h3 class="text-lg font-semibold">Event 1</h3>
                <p class="text-gray-600 text-sm">Deskripsi singkat foto atau video.</p>
              </div>
            </div>
  
            <!-- Gallery Item 2 -->
            <div class="bg-gray-50 shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Gallery Item"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h3 class="text-lg font-semibold">Event 2</h3>
                <p class="text-gray-600 text-sm">Deskripsi singkat foto atau video.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Footer -->
      <footer class="bg-ikasda-primary text-white py-6 text-center">
        <p>© 2024 Ikatan Alumni SMA Kita. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: "GalleryView",
  };
  </script>
  