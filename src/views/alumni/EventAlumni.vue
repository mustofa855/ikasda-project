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
        <!-- Detail Event Ringkas -->
        <div class="w-full md:w-2/3 md:pl-6 mt-4 md:mt-0">
          <h2 class="text-xl font-semibold mb-2">{{ event.title }}</h2>
          <p class="text-gray-700 mb-2">
            {{ event.excerpt ? event.excerpt : event.description.substring(0, 100) + '...' }}
          </p>
          <p class="text-gray-500 text-sm mb-2">
            Tanggal: {{ formatDate(event.start_date) }} - {{ formatDate(event.end_date) }}
          </p>
          <p class="text-gray-500 text-sm mb-4">Lokasi: {{ event.location }}</p>
          <div class="flex space-x-2">
            <!-- Tombol Detail untuk membuka modal detail event -->
            <button 
              @click="openDetailModal(event)"
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
            >
              Detail
            </button>
            <!-- Jika user sudah mendaftar, tampilkan keterangan; jika belum, tampilkan tombol daftar -->
            <template v-if="registeredEventIds.includes(event.id)">
              <button class="bg-gray-600 text-white px-4 py-2 rounded cursor-not-allowed">
                Anda sudah mendaftar event ini
              </button>
            </template>
            <template v-else>
              <button
                @click="confirmRegister(event.id)"
                class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Daftar
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">
      Tidak ada event yang tersedia.
    </div>

    <!-- Modal Detail Event (Lebar, Scrollable) -->
    <div v-if="showDetailModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-5xl max-h-[90vh] overflow-auto">
        <h2 class="text-2xl font-bold mb-4">{{ detailEventData.title }}</h2>
        <div v-if="detailEventData.image" class="mb-4">
          <img :src="detailEventData.image" alt="Cover Image" class="w-full h-auto object-cover rounded">
        </div>
        <p class="text-gray-700 mb-4">{{ detailEventData.description }}</p>
        <p class="text-gray-500 mb-2">
          <strong>Tanggal Mulai:</strong> {{ formatDate(detailEventData.start_date) }}
        </p>
        <p class="text-gray-500 mb-2">
          <strong>Tanggal Selesai:</strong> {{ formatDate(detailEventData.end_date) }}
        </p>
        <p class="text-gray-500 mb-4">
          <strong>Lokasi:</strong> {{ detailEventData.location }}
        </p>
        <div class="flex justify-end">
          <button @click="closeDetailModal" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition">
            Tutup
          </button>
        </div>
      </div>
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
      events: [],
      registeredEventIds: [],
      showDetailModal: false,
      detailEventData: {}
    };
  },
  mounted() {
    this.fetchEvents();
    this.fetchUserRegistrations();
  },
  methods: {
    fetchEvents() {
      axios
        .get("http://127.0.0.1:8000/api/events/")
        .then((response) => {
          const now = new Date();
          this.events = response.data.filter(
            (event) => new Date(event.start_date) >= now
          );
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    },
    fetchUserRegistrations() {
      const token = localStorage.getItem("access_token");
      // Endpoint khusus untuk mengambil pendaftaran event milik user saat ini
      axios
        .get("http://127.0.0.1:8000/api/my-event-registrations/", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          // Asumsikan responsenya berupa array pendaftaran, masing-masing dengan field 'event'
          this.registeredEventIds = (response.data.results || response.data).map(reg => reg.event);
        })
        .catch((error) => {
          console.error("Error fetching user registrations:", error);
          this.registeredEventIds = [];
        });
    },
    formatDate(dateStr) {
      const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
    confirmRegister(eventId) {
      Swal.fire({
        title: "Daftar Event",
        text: "Apakah Anda yakin ingin mengikuti event ini?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya, daftar!",
        cancelButtonText: "Batal"
      }).then((result) => {
        if (result.isConfirmed) {
          this.registerEvent(eventId);
        }
      });
    },
    registerEvent(eventId) {
      const token = localStorage.getItem("access_token");
      axios
        .post("http://127.0.0.1:8000/api/event-registration/", { event: eventId }, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
          Swal.fire("Berhasil!", "Anda telah terdaftar dalam event ini.", "success");
          // Tambahkan eventId ke registeredEventIds agar UI langsung terupdate
          this.registeredEventIds.push(eventId);
        })
        .catch((error) => {
          console.error("Error registering for event:", error);
          Swal.fire("Gagal!", "Terjadi kesalahan saat mendaftar event.", "error");
        });
    },
    openDetailModal(event) {
      this.detailEventData = event;
      this.showDetailModal = true;
    },
    closeDetailModal() {
      this.showDetailModal = false;
      this.detailEventData = {};
    }
  }
};
</script>

<style scoped>
/* Tambahkan styling tambahan di sini jika diperlukan */
</style>
