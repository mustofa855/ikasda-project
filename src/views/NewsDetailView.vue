<template>
  <div class="container mx-auto p-6">
    <!-- Breadcrumb Navigation -->
    <nav class="mb-6 text-sm">
      <ol class="list-reset flex text-gray-600">
        <li>
          <router-link to="/" class="text-blue-600 hover:underline">Ikasda</router-link>
        </li>
        <li><span class="mx-2">></span></li>
        <li>
          <router-link to="/news" class="text-blue-600 hover:underline">News</router-link>
        </li>
        <li><span class="mx-2">></span></li>
        <li><span>Detail News</span></li>
      </ol>
    </nav>

    <div class="flex flex-wrap">
      <!-- Bagian kiri: Detail Berita -->
      <div class="w-full lg:w-2/3">
        <div v-if="isLoading" class="flex justify-center items-center h-64">
          <div class="loader"></div>
        </div>
        <div v-else-if="news" class="bg-white shadow rounded p-6">
          <h1 class="text-3xl font-bold mb-2">{{ news.title }}</h1>
          <!-- Info Publish & Pembuat Berita -->
          <div class="flex items-center mb-4">
            <img
              v-if="news.author_profile_photo"
              :src="news.author_profile_photo"
              alt="Author Photo"
              class="w-10 h-10 rounded-full mr-2"
            />
            <div>
              <span class="text-gray-600 text-sm">
                IKASDA - {{ news.published_date_formatted }}
              </span>
              <div class="text-sm font-semibold text-gray-800">
                {{ news.author_full_name }}
              </div>
            </div>
          </div>

          <p class="text-gray-600 mb-4">
            {{ news.excerpt ? news.excerpt : news.content.substring(0, 150) + '...' }}
          </p>
          <img 
            v-if="news.image" 
            :src="news.image" 
            alt="Berita Image" 
            class="w-full h-64 object-cover mb-4"
          />
          <!-- Menampilkan konten per paragraf -->
          <div class="prose">
            <p v-for="(paragraph, index) in formattedContent" :key="index" class="mb-4">
              {{ paragraph }}
            </p>
          </div>
          <!-- Tombol kembali -->
          <button 
            @click="goBack" 
            class="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Kembali
          </button>
        </div>
        <div v-else class="text-center text-gray-500">
          News not found.
        </div>
      </div>

      <!-- Bagian kanan: List Berita Lainnya -->
      <div class="w-full lg:w-1/3 lg:pl-6 mt-6 lg:mt-0">
        <h2 class="text-2xl font-bold mb-4">Berita Lainnya</h2>
        <div class="space-y-4">
          <div 
            v-for="(item, index) in filteredNewsList" 
            :key="index" 
            class="flex items-center"
          >
            <!-- Gambar Berita -->
            <img 
              v-if="item.image" 
              :src="item.image" 
              alt="News Image" 
              class="w-24 h-24 object-cover mr-4"
            />
            <!-- Informasi Berita -->
            <div>
              <h3 class="font-bold text-lg">{{ item.title }}</h3>
              <p class="text-gray-600 text-sm">
                {{ item.excerpt ? item.excerpt : item.content.substring(0, 100) + '...' }}
              </p>
              <router-link 
                :to="`/news/${item.id}`" 
                class="text-blue-600 hover:underline font-semibold"
              >
                Baca Selengkapnya
              </router-link>
            </div>
          </div>
          <div v-if="filteredNewsList.length === 0" class="text-center text-gray-500">
            Tidak ada artikel terbaru.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NewsDetailView",
  data() {
    return {
      news: null,
      newsList: [],
      isLoading: false
    };
  },
  computed: {
    formattedContent() {
      if (this.news && this.news.content) {
        return this.news.content
          .split(/\r?\n/)
          .filter(paragraph => paragraph.trim() !== '');
      }
      return [];
    },
    filteredNewsList() {
      if (!this.news) return this.newsList;
      return this.newsList.filter(item => item.id !== this.news.id);
    }
  },
  methods: {
    fetchNewsDetail(id) {
      this.isLoading = true;
      axios
        .get(`http://127.0.0.1:8000/api/news/${id}/`)
        .then(response => {
          this.news = response.data;
          this.isLoading = false;
        })
        .catch(error => {
          console.error("Error fetching news detail:", error);
          this.isLoading = false;
        });
    },
    fetchNewsList() {
      axios
        .get(`http://127.0.0.1:8000/api/news/`)
        .then(response => {
          this.newsList = response.data;
        })
        .catch(error => {
          console.error("Error fetching news list:", error);
        });
    },
    goBack() {
      this.$router.push("/news");
    }
  },
  mounted() {
    const id = this.$route.params.id;
    this.fetchNewsDetail(id);
    this.fetchNewsList();
  },
  watch: {
    '$route.params.id'(newId) {
      this.fetchNewsDetail(newId);
    }
  }
};
</script>

<style scoped>
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
