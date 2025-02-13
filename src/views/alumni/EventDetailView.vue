<template>
    <div class="container mx-auto p-6">
      <div v-if="event" class="bg-white shadow rounded p-6">
        <h1 class="text-3xl font-bold mb-4">{{ event.title }}</h1>
        <p class="text-gray-600 mb-4">
          Tanggal: {{ formatDate(event.start_date) }} - {{ formatDate(event.end_date) }} | Lokasi: {{ event.location }}
        </p>
        <img 
          v-if="event.image" 
          :src="event.image" 
          alt="Event Image" 
          class="w-full h-64 object-cover mb-4"
        />
        <div class="prose">
          <p v-for="(paragraph, index) in formattedContent" :key="index" class="mb-4">
            {{ paragraph }}
          </p>
        </div>
        <!-- Tombol kembali atau daftar event bisa ditambahkan di sini -->
        <button 
          @click="goBack" 
          class="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Kembali ke Daftar Event
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
    name: "EventDetailView",
    data() {
      return {
        event: null
      };
    },
    computed: {
      formattedContent() {
        if (this.event && this.event.description) {
          return this.event.description.split(/\r?\n/).filter(p => p.trim() !== '');
        }
        return [];
      }
    },
    mounted() {
      const id = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/api/events/${id}/`)
        .then(response => {
          this.event = response.data;
        })
        .catch(error => {
          console.error("Error fetching event detail:", error);
        });
    },
    methods: {
      formatDate(dateStr) {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateStr).toLocaleDateString(undefined, options);
      },
      goBack() {
        this.$router.push('alumni/event-alumni'); // Atau rute daftar event yang sesuai
      }
    }
  };
  </script>
  
  <style scoped>
  /* Tambahkan styling jika diperlukan */
  </style>
  