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
                @click="openEditModal(event)" 
                class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button 
                @click="openParticipantsModal(event)" 
                class="bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600 transition"
              >
                Peserta
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

    <!-- Modal Edit Event (Diperbesar, Scrollable) -->
    <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-5xl max-h-[90vh] overflow-auto">
        <h2 class="text-2xl font-bold mb-4">Edit Event</h2>
        <!-- Preview Cover Image -->
        <div v-if="editEventData.image" class="mb-4">
          <img :src="editEventData.image" alt="Preview Cover" class="w-full h-auto object-cover rounded">
        </div>
        <form @submit.prevent="updateEditedEvent">
          <div class="mb-4">
            <label class="block text-gray-700">Judul Event</label>
            <input type="text" v-model="editEventData.title" class="w-full border border-gray-300 p-2 rounded"
              required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Deskripsi Event</label>
            <textarea v-model="editEventData.description" rows="3" class="w-full border border-gray-300 p-2 rounded"
              required></textarea>
          </div>
          <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700">Tanggal Mulai</label>
              <input type="datetime-local" v-model="editEventData.start_date"
                class="w-full border border-gray-300 p-2 rounded" required />
            </div>
            <div>
              <label class="block text-gray-700">Tanggal Selesai</label>
              <input type="datetime-local" v-model="editEventData.end_date"
                class="w-full border border-gray-300 p-2 rounded" required />
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Lokasi</label>
            <input type="text" v-model="editEventData.location" class="w-full border border-gray-300 p-2 rounded" required />
          </div>
          <!-- Opsional: Ganti Gambar -->
          <div class="mb-4">
            <label class="block text-gray-700">Ganti Gambar (opsional)</label>
            <input type="file" @change="handleEditImageUpload" accept="image/*" class="w-full" />
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="closeEditModal"
              class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition">Batal</button>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Daftar Peserta (Diperbesar dengan Tabel Baru) -->
    <div v-if="showParticipantsModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-5xl max-h-[90vh] overflow-auto">
        <h2 class="text-2xl font-bold mb-4">Peserta Event: {{ currentEventParticipants.title }}</h2>
        <div v-if="participantsList.length">
          <table class="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr class="bg-gray-200">
                <th class="py-2 px-4 border border-gray-300">No</th>
                <th class="py-2 px-4 border border-gray-300">Nama Lengkap</th>
                <th class="py-2 px-4 border border-gray-300">Email</th>
                <th class="py-2 px-4 border border-gray-300">Tanggal Daftar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(participant, index) in participantsList" :key="participant.id" class="hover:bg-gray-100">
                <td class="py-2 px-4 border border-gray-300">{{ index + 1 }}</td>
                <td class="py-2 px-4 border border-gray-300">
                  {{ participant.user_detail.first_name }} {{ participant.user_detail.last_name }}
                </td>
                <td class="py-2 px-4 border border-gray-300">
                  {{ participant.user_detail.email }}
                </td>
                <td class="py-2 px-4 border border-gray-300">
                  {{ formatDate(participant.registration_date) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-gray-500">
          Belum ada peserta.
        </div>
        <div class="flex justify-end mt-4">
          <button @click="closeParticipantsModal"
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition">
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
  name: "ManajemenEvent",
  data() {
    return {
      newEvent: {
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        location: "",
        image: null,
      },
      eventsList: [],
      // Untuk modal edit event
      showEditModal: false,
      editEventData: {},
      editImage: null,
      // Untuk modal peserta
      showParticipantsModal: false,
      currentEventParticipants: {},
      participantsList: [],
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
    // Modal Edit Event
    openEditModal(event) {
      // Salin data event ke editEventData; pastikan gambar (image) merupakan URL jika ada.
      this.editEventData = { ...event };
      this.editImage = null;
      this.showEditModal = true;
    },
    handleEditImageUpload(event) {
      this.editImage = event.target.files[0];
    },
    updateEditedEvent() {
      const token = localStorage.getItem("access_token");
      const formData = new FormData();
      formData.append("title", this.editEventData.title);
      formData.append("description", this.editEventData.description);
      formData.append("start_date", this.editEventData.start_date);
      formData.append("end_date", this.editEventData.end_date);
      formData.append("location", this.editEventData.location);
      if (this.editImage) {
        formData.append("image", this.editImage);
      }
      axios
        .patch(`http://127.0.0.1:8000/api/events/${this.editEventData.id}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          }
        })
        .then(() => {
          Swal.fire("Berhasil!", "Event berhasil diperbarui.", "success");
          this.showEditModal = false;
          this.fetchEvents();
        })
        .catch(error => {
          Swal.fire("Gagal!", "Terjadi kesalahan saat memperbarui event.", "error");
          console.error("Error updating event:", error);
        });
    },
    closeEditModal() {
      this.showEditModal = false;
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
    // Modal Peserta Event
    openParticipantsModal(event) {
      this.currentEventParticipants = event;
      const token = localStorage.getItem("access_token");
      axios
        .get(`http://127.0.0.1:8000/api/event-registrations/?event=${event.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          this.participantsList = response.data.results || response.data;
          this.showParticipantsModal = true;
        })
        .catch((error) => {
          console.error("Error fetching participants:", error);
          Swal.fire("Error", "Terjadi kesalahan saat mengambil data peserta.", "error");
        });
    },
    closeParticipantsModal() {
      this.showParticipantsModal = false;
      this.participantsList = [];
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
