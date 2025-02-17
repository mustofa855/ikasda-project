<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- Hero Section -->
    <section class="bg-ikasda-primary text-white py-12 sm:py-20 text-center px-4">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Berita dan Blog</h1>
      <p class="text-base sm:text-lg max-w-xl mx-auto">
        Temukan berita terbaru, cerita inspiratif, dan informasi terkini tentang Ikatan Alumni SMA NEGERI 2 LEMBANG.
      </p>
    </section>

    <!-- Featured News & Sidebar Latest Posts Section -->
    <section class="py-8 sm:py-16 px-4 bg-white">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Featured News -->
        <div class="md:col-span-2 lg:col-span-2 relative" v-if="featuredNews">
          <img
            :src="featuredNews.image ? featuredNews.image : 'https://via.placeholder.com/800x400'"
            alt="Featured News"
            class="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
          />
          <div class="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex flex-col justify-end p-4 sm:p-6">
            <h2 class="text-2xl sm:text-3xl font-bold text-white mb-2">{{ featuredNews.title }}</h2>
            <p class="text-sm sm:text-base text-white mb-4">
              {{
                featuredNews.excerpt
                  ? getExcerpt(featuredNews.excerpt, 15)
                  : getExcerpt(featuredNews.content, 15)
              }}
            </p>
            <router-link
              :to="`/news/${featuredNews.id}`"
              class="inline-block bg-ikasda-primary text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
            >
              Baca Selengkapnya
            </router-link>
            <p class="text-white text-xs mt-1">{{ formatDate(featuredNews.date) }}</p>
          </div>
        </div>

        <!-- Sidebar Latest Posts -->
        <div class="md:col-span-2 lg:col-span-1">
          <h3 class="text-xl font-semibold mb-4">Artikel Terbaru</h3>
          <div v-for="news in latestPosts" :key="news.id" class="flex items-center mb-4 border-b pb-4">
            <img
              :src="news.image ? news.image : 'https://via.placeholder.com/100x100'"
              alt="Thumbnail"
              class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded mr-4"
            />
            <div class="flex-1">
              <h4 class="text-base sm:text-lg font-bold">{{ news.title }}</h4>
              <div v-if="news.category" class="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded mt-1">
                {{ news.category }}
              </div>
              <router-link
                :to="`/news/${news.id}`"
                class="text-ikasda-primary font-bold hover:underline block mt-2 text-xs sm:text-sm"
              >
                Baca Selengkapnya
              </router-link>
              <p class="text-gray-500 text-xs mt-1">{{ formatDate(news.date) }}</p>
            </div>
          </div>
          <div v-if="latestPosts.length === 0" class="text-center text-gray-500">
            Tidak ada artikel terbaru.
          </div>
        </div>
      </div>
    </section>

    <!-- Daftar Berita Berdasarkan Kategori -->
    <section class="py-8 sm:py-16 px-4 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div v-for="(posts, category) in groupedNews" :key="category" class="mb-10">
          <!-- Judul kategori -->
          <div class="flex items-center mb-4">
            <span class="w-2 h-6 bg-blue-500 mr-3"></span>
            <h2 class="text-2xl font-semibold">{{ category }}</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="news in posts"
              :key="news.id"
              class="bg-white shadow rounded-lg overflow-hidden"
            >
              <img
                :src="news.image ? news.image : 'https://via.placeholder.com/400x200'"
                alt="News Post Thumbnail"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h3 class="text-xl font-semibold mb-2">{{ news.title }}</h3>
                <p class="text-gray-600 text-sm mb-4">
                  {{
                    news.excerpt
                      ? getExcerpt(news.excerpt, 15)
                      : getExcerpt(news.content, 15)
                  }}
                </p>
                <router-link
                  :to="`/news/${news.id}`"
                  class="text-ikasda-primary font-bold hover:underline text-sm"
                >
                  Baca Selengkapnya
                </router-link>
                <p class="text-gray-500 text-xs mt-1">{{ formatDate(news.published_date) }}</p>
              </div>
            </div>
            <div v-if="posts.length === 0" class="col-span-full text-center text-gray-500">
              Tidak ada berita di kategori ini.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-ikasda-primary text-white py-4 sm:py-6 text-center">
      <p class="text-xs">&copy; {{ currentYear }} Ikatan Alumni SMA NEGERI 2 LEMBANG. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import { ref, computed, onMounted } from "vue";

export default {
  name: "NewsView",
  setup() {
    const newsList = ref([]);
    const currentYear = new Date().getFullYear();

    const fetchNews = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/news/");
        newsList.value = response.data;
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    // Featured news: item pertama
    const featuredNews = computed(() => {
      return newsList.value.length > 0 ? newsList.value[0] : null;
    });

    // Latest posts untuk sidebar: 4 berita berikutnya
    const latestPosts = computed(() => {
      return newsList.value.length > 1 ? newsList.value.slice(1, 5) : [];
    });

    // Group news by category; jika tidak ada kategori, gunakan "Lainnya"
    const groupedNews = computed(() => {
      const groups = {};
      newsList.value.forEach((news) => {
        const category = news.category ? news.category : "Lainnya";
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(news);
      });
      return groups;
    });

    // Fungsi untuk memotong teks berdasarkan jumlah kata (default 15 kata)
    const getExcerpt = (text, wordLimit = 15) => {
      if (!text) return "";
      const words = text.split(/\s+/);
      return words.length <= wordLimit ? text : words.slice(0, wordLimit).join(" ") + "...";
    };

    // Fungsi untuk memformat tanggal menjadi dd/mm/yyyy
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    onMounted(() => {
      fetchNews();
    });

    return {
      newsList,
      currentYear,
      featuredNews,
      latestPosts,
      groupedNews,
      getExcerpt,
      formatDate,
    };
  },
};
</script>

<style scoped>
/* Tambahan styling jika diperlukan */
</style>
