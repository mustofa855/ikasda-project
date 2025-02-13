<template>
    <div class="container mx-auto p-6">
      <!-- Breadcrumb Navigation -->
      <nav class="mb-6 text-sm">
        <ol class="list-reset flex text-gray-600">
          <li>
            <router-link to="/" class="text-blue-600 hover:underline">
              Ikasda
            </router-link>
          </li>
          <li>
            <span class="mx-2">></span>
          </li>
          <li>
            <router-link to="/news" class="text-blue-600 hover:underline">
              News
            </router-link>
          </li>
          <li>
            <span class="mx-2">></span>
          </li>
          <li>
            <span>Detail News</span>
          </li>
        </ol>
      </nav>
  
      <div v-if="news" class="bg-white shadow rounded p-6">
        <h1 class="text-3xl font-bold mb-4">{{ news.title }}</h1>
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
          <p 
            v-for="(paragraph, index) in formattedContent" 
            :key="index" 
            class="mb-4"
          >
            {{ paragraph }}
          </p>
        </div>
        <!-- Tombol kembali untuk navigasi cepat -->
        <button 
          @click="goBack" 
          class="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Kembali
        </button>
      </div>
      <div v-else class="text-center text-gray-500">
        Loading...
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
      };
    },
    computed: {
      // Memecah konten berdasarkan newline dan menghapus paragraf kosong
      formattedContent() {
        if (this.news && this.news.content) {
          return this.news.content.split(/\r?\n/).filter(paragraph => paragraph.trim() !== '');
        }
        return [];
      }
    },
    mounted() {
      const id = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/api/news/${id}/`)
        .then(response => {
          this.news = response.data;
        })
        .catch(error => {
          console.error("Error fetching news detail:", error);
        });
    },
    methods: {
      goBack() {
        // Kembali ke halaman daftar berita; ubah rute sesuai kebutuhan (misalnya '/blog' atau '/news')
        this.$router.push("/news");
      }
    }
  };
  </script>
  
  <style scoped>
  /* Jika diperlukan, styling tambahan dapat ditambahkan di sini */
  </style>
  