<template>
  <div class="mx-16 my-8 p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">
      Kesan & Pesan
    </h1>
    <!-- Form untuk menulis kesan & pesan -->
    <form @submit.prevent="submitMessage">
      <div class="mb-4">
        <label for="message" class="block text-lg font-medium text-gray-700">
          Tulis Kesan atau Pesan Anda
        </label>
        <textarea
          v-model="message"
          id="message"
          rows="4"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Tuliskan kesan atau pesan Anda di sini"
        ></textarea>
      </div>

      <!-- Tombol Submit -->
      <div class="mt-4">
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Kirim Pesan
        </button>
      </div>
    </form>

    <!-- Daftar Pesan -->
    <div class="mt-8">
      <h2 class="text-lg font-semibold mb-4">Pesan dari Alumni</h2>
      
      <!-- Grid Card Pesan (3 kolom per baris) -->
      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="msg in paginatedMessages"
          :key="msg.id"
          class="p-4 bg-gray-100 rounded-lg"
        >
          <!-- Tampilkan nama lengkap (full_name) -->
          <p class="mb-1"><strong>{{ msg.full_name }}</strong></p>
          <p>{{ msg.message }}</p>
          <small class="text-gray-500">{{ formatDate(msg.created_at) }}</small>
        </div>
      </div>

      <!-- Pagination -->
      <div class="mt-4 flex justify-center items-center space-x-2">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="{
            'bg-blue-600 text-white': currentPage === page,
            'bg-gray-200': currentPage !== page
          }"
          class="px-3 py-1 rounded"
        >
          {{ page }}
        </button>

        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2"; // Pastikan SweetAlert2 sudah diinstall

export default {
  name: "KesanPesan",
  data() {
    return {
      message: "",
      messages: [],
      currentPage: 1,       // halaman aktif
      messagesPerPage: 12,  // jumlah pesan per halaman (3 kolom x 4 baris)
    };
  },
  computed: {
    // Menghitung pesan yang akan ditampilkan pada halaman aktif
    paginatedMessages() {
      const start = (this.currentPage - 1) * this.messagesPerPage;
      const end = start + this.messagesPerPage;
      return this.messages.slice(start, end);
    },
    // Menghitung total halaman
    totalPages() {
      return Math.ceil(this.messages.length / this.messagesPerPage);
    },
  },
  mounted() {
    this.fetchMessages();
  },
  methods: {
    // Mengambil daftar pesan dari backend
    fetchMessages() {
      axios
        .get("http://127.0.0.1:8000/api/feedbacks/")
        .then((response) => {
          this.messages = response.data;
        })
        .catch((error) => {
          console.error("Error fetching feedbacks:", error);
        });
    },
    // Mengirim pesan ke backend dengan konfirmasi menggunakan swal
    submitMessage() {
      if (this.message.trim() === "") {
        Swal.fire({
          title: "Pesan tidak boleh kosong!",
          icon: "warning",
          confirmButtonText: "OK"
        });
        return;
      }
      
      // Tampilkan konfirmasi sebelum mengirim pesan
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Pesan Anda akan dikirim.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya, kirim pesan!",
        cancelButtonText: "Batal"
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(
              "http://127.0.0.1:8000/api/feedbacks/",
              { message: this.message },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
              }
            )
            .then((response) => {
              this.message = "";
              Swal.fire({
                title: "Pesan berhasil dikirim!",
                icon: "success",
                confirmButtonText: "OK"
              });
              this.fetchMessages();
            })
            .catch((error) => {
              console.error("Error submitting feedback:", error);
              Swal.fire({
                title: "Gagal mengirim pesan!",
                text: "Pastikan Anda sudah login.",
                icon: "error",
                confirmButtonText: "OK"
              });
            });
        }
      });
    },
    // Format tanggal agar lebih menarik dan mudah dibaca
    formatDate(dateStr) {
      if (!dateStr) return "";
      
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now - date;
      const diffSeconds = Math.floor(diffMs / 1000);
      
      if (diffSeconds < 60) {
        return "baru saja diupload";
      }
      
      const diffMinutes = Math.floor(diffSeconds / 60);
      if (diffMinutes < 60) {
        return `${diffMinutes} menit yang lalu`;
      }
      
      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours < 24) {
        return `${diffHours} jam yang lalu`;
      }
      
      const day = date.getDate();
      const year = date.getFullYear();
      const monthIndex = date.getMonth();
      const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];
      const monthName = months[monthIndex];
      
      return `${day} ${monthName} ${year}`;
    },
    // Fungsi untuk berpindah halaman
    goToPage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
    }
  },
};
</script>

<style scoped>
/* Tambahan styling jika diperlukan */
</style>
