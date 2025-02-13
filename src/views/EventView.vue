<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- Hero Section -->
    <section class="bg-ikasda-primary text-white py-20 text-center">
      <h1 class="text-4xl font-bold mb-4">Kalender Event</h1>
      <p class="text-lg max-w-3xl mx-auto">
        Jelajahi berbagai acara yang akan datang. Untuk mendaftar event, silakan login terlebih dahulu.
      </p>
    </section>

    <!-- Event List Section -->
    <section class="py-16 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-semibold text-center mb-10">Event yang Akan Datang</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="event in eventsList"
            :key="event.id"
            class="bg-gray-50 shadow-lg rounded-lg overflow-hidden"
          >
            <img
              :src="event.image ? event.image : 'https://via.placeholder.com/400x200'"
              alt="Event Thumbnail"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">{{ event.title }}</h3>
              <p class="text-gray-600 text-sm mb-2">
                Tanggal: {{ formatDate(event.start_date) }} - {{ formatDate(event.end_date) }}
              </p>
              <p class="text-gray-600 text-sm mb-4">Lokasi: {{ event.location }}</p>
              <button
                @click="joinEvent(event.id)"
                class="bg-ikasda-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Ikuti Event
              </button>
            </div>
          </div>
          <div v-if="eventsList.length === 0" class="col-span-full text-center text-gray-500">
            Tidak ada event yang tersedia.
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-ikasda-primary text-white py-6 text-center">
      <p>© {{ currentYear }} Ikatan Alumni SMA NEGERI 2 LEMBANG. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "PublicEventView",
  data() {
    return {
      eventsList: []
    };
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
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
          this.eventsList = response.data.filter(
            (event) => new Date(event.start_date) >= now
          );
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    },
    formatDate(dateStr) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
    joinEvent(eventId) {
      // Cek apakah token ada (user sudah login)
      const token = localStorage.getItem("access_token");
      if (!token) {
        Swal.fire({
          title: "Anda harus login!",
          text: "Untuk mendaftar event, silakan login terlebih dahulu.",
          icon: "warning",
          confirmButtonText: "OK"
        }).then(() => {
          this.$router.push("/login");
        });
      } else {
        // Jika sudah login, cek apakah role adalah 'alumni'
        const userRole = localStorage.getItem("user_role");
        if (userRole !== "alumni") {
          Swal.fire({
            title: "Akses Ditolak",
            text: "Hanya alumni yang dapat mendaftar event.",
            icon: "error",
            confirmButtonText: "OK"
          });
          return;
        }
        // Jika user adalah alumni, arahkan ke halaman detail event pendaftaran
        this.$router.push(`/alumni/event-alumni/${eventId}`);
      }
    }
  }
};
</script>

<style scoped>
/* Tambahkan styling tambahan jika diperlukan */
</style>
