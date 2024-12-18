<template>
    <div class="bg-gray-100 min-h-screen">
      <!-- Hero Section -->
      <section class="bg-ikasda-primary text-white py-20 text-center">
        <h1 class="text-4xl font-bold mb-4">Berita dan Blog</h1>
        <p class="text-lg max-w-3xl mx-auto">
          Temukan berita terbaru, cerita inspiratif, dan informasi terkini tentang Ikatan Alumni SMA Kita.
        </p>
      </section>
  
      <!-- Blog Posts Section -->
      <section class="py-16 px-4 bg-white">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl font-semibold text-center mb-10">Artikel Terbaru</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Blog Card 1 -->
            <div class="bg-gray-50 shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x200"
                alt="Blog Post Thumbnail"
                class="w-full h-48 object-cover"
              />
              <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">Judul Berita 1</h3>
                <p class="text-gray-600 text-sm mb-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, commodi.
                </p>
                <router-link
                  to="/blog/1"
                  class="text-ikasda-primary font-bold hover:underline"
                >
                  Baca Selengkapnya
                </router-link>
              </div>
            </div>
  
            <!-- Blog Card 2 -->
            <div class="bg-gray-50 shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x200"
                alt="Blog Post Thumbnail"
                class="w-full h-48 object-cover"
              />
              <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">Judul Berita 2</h3>
                <p class="text-gray-600 text-sm mb-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, commodi.
                </p>
                <router-link
                  to="/blog/2"
                  class="text-ikasda-primary font-bold hover:underline"
                >
                  Baca Selengkapnya
                </router-link>
              </div>
            </div>
  
            <!-- Blog Card 3 -->
            <div class="bg-gray-50 shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x200"
                alt="Blog Post Thumbnail"
                class="w-full h-48 object-cover"
              />
              <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">Judul Berita 3</h3>
                <p class="text-gray-600 text-sm mb-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, commodi.
                </p>
                <router-link
                  to="/blog/3"
                  class="text-ikasda-primary font-bold hover:underline"
                >
                  Baca Selengkapnya
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
    name: "BlogView",
  };
  </script>
  
  <style>
  /* Tambahkan styling tambahan jika diperlukan */
  </style>
  