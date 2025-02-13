<template>
  <div class="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">Event Alumni</h1>
    
    <!-- Daftar Event -->
    <div v-if="events.length">
      <div
        v-for="event in events"
        :key="event.id"
        class="mb-4 p-4 border rounded-lg shadow-md flex flex-col md:flex-row"
      >
        <!-- Gambar Event -->
        <div class="w-full md:w-1/3">
          <img
            :src="event.image ? event.image : 'https://via.placeholder.com/400x200'"
            alt="Event Thumbnail"
            class="w-full h-48 object-cover rounded"
          />
        </div>
        <!-- Detail Event -->
        <div class="w-full md:w-2/3 md:pl-6 mt-4 md:mt-0">
          <h2 class="text-xl font-semibold mb-2">{{ event.title }}</h2>
          <p class="text-gray-700 mb-2">
            {{ event.excerpt ? event.excerpt : event.description.substring(0, 100) + '...' }}
          </p>
          <p class="text-gray-500 text-sm mb-2">
            Tanggal: {{ formatDate(event.start_date) }} - {{ formatDate(event.end_date) }}
          </p>
          <p class="text-gray-500 text-sm mb-4">Lokasi: {{ event.location }}</p>
          <!-- Tombol Daftar Event -->
          <button
            @click="registerEvent(event.id)"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Daftar
          </button>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">
      Tidak ada event yang tersedia.
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "EventAlumni",
  data() {
    return {
      events: []
    };
  },
  mounted() {
    this.fetchEvents();
  },
  methods: {
    fetchEvents() {
      axios
        .get("http://127.0.0.1:8000/api/events/")
        .then((response) => {
          // Filter event yang akan datang berdasarkan tanggal mulai
          const now = new Date();
          this.events = response.data.filter(
            (event) => new Date(event.start_date) >= now
          );
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    },
    formatDate(dateStr) {
      const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
    registerEvent(eventId) {
      // Karena route ini khusus untuk alumni (dilindungi oleh route guard),
      // kita langsung mengarahkan ke halaman detail event pendaftaran.
      this.$router.push(`/alumni/event-alumni/${eventId}`);
    }
  }
};
</script>

<style scoped>
/* Anda dapat menambahkan styling tambahan di sini jika diperlukan */
</style>
