<template>
  <div class="ml-64 p-6">
    <h1 class="text-3xl font-bold mb-6">Manajemen Event</h1>
    
    <!-- Form Tambah Event -->
    <div class="mb-6 bg-white p-6 rounded shadow">
      <h2 class="text-xl font-semibold mb-4">Tambah Event Baru</h2>
      <form @submit.prevent="createEvent">
        <!-- Judul Event -->
        <div class="mb-4">
          <label for="title" class="block text-gray-700">Judul Event</label>
          <input 
            type="text" 
            id="title" 
            v-model="newEvent.title" 
            placeholder="Masukkan judul event" 
            class="w-full border border-gray-300 p-2 rounded" 
            required
          />
        </div>
        <!-- Deskripsi Event -->
        <div class="mb-4">
          <label for="description" class="block text-gray-700">Deskripsi Event</label>
          <textarea 
            id="description" 
            v-model="newEvent.description" 
            placeholder="Masukkan deskripsi event secara lengkap" 
            class="w-full border border-gray-300 p-2 rounded" 
            rows="3"
            required
          ></textarea>
        </div>
        <!-- Tanggal Mulai & Selesai -->
        <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="start_date" class="block text-gray-700">Tanggal Mulai</label>
            <input 
              type="datetime-local" 
              id="start_date" 
              v-model="newEvent.start_date" 
              class="w-full border border-gray-300 p-2 rounded" 
              required
            />
          </div>
          <div>
            <label for="end_date" class="block text-gray-700">Tanggal Selesai</label>
            <input 
              type="datetime-local" 
              id="end_date" 
              v-model="newEvent.end_date" 
              class="w-full border border-gray-300 p-2 rounded" 
              required
            />
          </div>
        </div>
        <!-- Lokasi -->
        <div class="mb-4">
          <label for="location" class="block text-gray-700">Lokasi</label>
          <input 
            type="text" 
            id="location" 
            v-model="newEvent.location" 
            placeholder="Masukkan lokasi event" 
            class="w-full border border-gray-300 p-2 rounded" 
            required
          />
        </div>
        <!-- Unggah Gambar -->
        <div class="mb-4">
          <label for="image" class="block text-gray-700">Gambar Event</label>
          <input 
            type="file" 
            id="image" 
            @change="handleImageUpload" 
            accept="image/*"
            class="w-full"
          />
        </div>
        <!-- Tombol Submit -->
        <button 
          type="submit" 
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Buat Event
        </button>
      </form>
    </div>

    <!-- Daftar Event -->
    <div class="bg-white p-6 rounded shadow">
      <h2 class="text-xl font-semibold mb-4">Daftar Event</h2>
      <div v-if="eventsList.length">
        <ul>
          <li 
            v-for="event in eventsList" 
            :key="event.id" 
            class="border-b py-4 flex justify-between items-center"
          >
            <div>
              <h3 class="text-lg font-bold">{{ event.title }}</h3>
              <p class="text-gray-600 text-sm">
                {{ formatDate(event.start_date) }} - {{ formatDate(event.end_date) }} | {{ event.location }}
              </p>
            </div>
            <div class="flex space-x-2">
              <button 
                @click="editEvent(event)" 
                class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button 
                @click="deleteEvent(event.id)" 
                class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
              >
                Hapus
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="text-center text-gray-500">
        Tidak ada event.
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "ManajemenEvent",
  data() {
    return {
      newEvent: {
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        location: "",
        // Tidak perlu mengirim image sebagai string, nanti akan di-handle lewat FormData
        image: null
      },
      eventsList: []
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
          this.eventsList = response.data;
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    },
    handleImageUpload(event) {
      this.newEvent.image = event.target.files[0];
    },
    createEvent() {
      Swal.fire({
        title: "Buat Event?",
        text: "Pastikan data event yang Anda masukkan sudah benar!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, buat event!",
        cancelButtonText: "Batal"
      }).then((result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem("access_token");
          const formData = new FormData();
          formData.append("title", this.newEvent.title);
          formData.append("description", this.newEvent.description);
          formData.append("start_date", this.newEvent.start_date);
          formData.append("end_date", this.newEvent.end_date);
          formData.append("location", this.newEvent.location);
          if (this.newEvent.image) {
            formData.append("image", this.newEvent.image);
          }
          axios
            .post("http://127.0.0.1:8000/api/events/", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
              }
            })
            .then(response => {
              Swal.fire("Berhasil!", "Event berhasil dibuat.", "success");
              this.newEvent = { title: "", description: "", start_date: "", end_date: "", location: "", image: null };
              this.fetchEvents();
            })
            .catch(error => {
              Swal.fire("Gagal!", "Terjadi kesalahan saat membuat event.", "error");
              console.error("Error creating event:", error);
            });
        }
      });
    },
    editEvent(event) {
      Swal.fire("Info", "Fitur edit belum diimplementasikan.", "info");
    },
    deleteEvent(eventId) {
      Swal.fire({
        title: "Hapus Event?",
        text: "Apakah Anda yakin ingin menghapus event ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal"
      }).then((result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem("access_token");
          axios.delete(`http://127.0.0.1:8000/api/events/${eventId}/`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
          .then(response => {
            Swal.fire("Berhasil!", "Event telah dihapus.", "success");
            this.fetchEvents();
          })
          .catch(error => {
            Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus event.", "error");
            console.error("Error deleting event:", error);
          });
        }
      });
    },
    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    }
  }
};
</script>

<style scoped>
/* Tambahkan styling tambahan jika diperlukan */
</style>
