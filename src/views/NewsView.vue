<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- Hero Section -->
    <section class="bg-ikasda-primary text-white py-20 text-center">
      <h1 class="text-4xl font-bold mb-4">Berita dan Blog</h1>
      <p class="text-lg max-w-3xl mx-auto">
        Temukan berita terbaru, cerita inspiratif, dan informasi terkini tentang Ikatan Alumni SMA Kita.
      </p>
    </section>

    <!-- News Posts Section -->
    <section class="py-16 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-semibold text-center mb-10">Artikel Terbaru</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="news in newsList"
            :key="news.id"
            class="bg-gray-50 shadow-lg rounded-lg overflow-hidden"
          >
            <img
              :src="news.image ? news.image : 'https://via.placeholder.com/400x200'"
              alt="News Post Thumbnail"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">{{ news.title }}</h3>
              <p class="text-gray-600 text-sm mb-4">
                <!-- Tampilkan excerpt jika tersedia, jika tidak tampilkan potongan dari content -->
                {{ news.excerpt ? news.excerpt : news.content.substring(0, 150) + '...' }}
              </p>
              <router-link
                :to="`/news/${news.id}`"
                class="text-ikasda-primary font-bold hover:underline"
              >
                Baca Selengkapnya
              </router-link>
            </div>
          </div>
          <!-- Jika tidak ada berita, Anda bisa menampilkan pesan "Tidak ada berita" -->
          <div v-if="newsList.length === 0" class="col-span-full text-center text-gray-500">
            Tidak ada berita untuk ditampilkan.
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
import axios from "axios";
export default {
  name: "NewsView",
  data() {
    return {
      newsList: []
    };
  },
  mounted() {
    // Ambil data berita dari API
    axios
      .get("http://127.0.0.1:8000/api/news/")
      .then((response) => {
        this.newsList = response.data;
      })
      .catch((error) => {
        console.error("Error fetching news data:", error);
      });
  }
};
</script>

<style>
/* Tambahkan styling tambahan jika diperlukan */
</style>
