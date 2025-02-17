<template>
  <div class="mx-4 sm:mx-8 md:mx-16 my-8 p-4 sm:p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
      Kesan & Pesan
    </h1>
    <!-- Form untuk menulis kesan & pesan -->
    <form @submit.prevent="submitMessage">
      <div class="mb-4">
        <label for="message" class="block text-base sm:text-lg font-medium text-gray-700">
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
      <h2 class="text-base sm:text-lg font-semibold mb-4">Pesan dari Alumni</h2>
      
      <!-- Grid Card Pesan: 1 kolom di layar kecil, 2 kolom di layar sedang, 3 kolom di layar besar -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="msg in paginatedMessages"
          :key="msg.id"
          class="p-4 bg-gray-100 rounded-lg flex flex-col space-y-2"
        >
          <div class="flex items-center space-x-3">
            <!-- Foto profil di samping nama -->
            <img
              :src="msg.profile_photo ? msg.profile_photo : 'https://via.placeholder.com/40'"
              alt="Foto Profil"
              class="w-10 h-10 rounded-full object-cover"
            />
            <p class="mb-0"><strong>{{ msg.full_name }}</strong></p>
          </div>
          <p class="text-sm">{{ msg.message }}</p>
          <small class="text-gray-500">{{ formatDate(msg.created_at) }}</small>
          <!-- Tombol Like dengan icon jempol menggunakan Iconify -->
          <div class="flex items-center space-x-2 mt-auto">
            <button 
              @click="toggleLike(msg)" 
              class="focus:outline-none"
            >
              <Icon
                v-if="msg.is_liked"
                icon="mdi:thumb-up"
                class="text-blue-600"
                width="20"
                height="20"
              />
              <Icon
                v-else
                icon="mdi:thumb-up-outline"
                class="text-gray-600 hover:text-blue-600"
                width="20"
                height="20"
              />
            </button>
            <span class="text-gray-600 text-sm">{{ msg.likes_count }}</span>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="mt-4 flex flex-wrap justify-center items-center gap-2">
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
          class="px-3 py-1 rounded cursor-pointer"
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
import Swal from "sweetalert2";
import { Icon } from "@iconify/vue";

export default {
  name: "KesanPesan",
  components: {
    Icon,
  },
  data() {
    return {
      message: "",
      messages: [],
      currentPage: 1,
      messagesPerPage: 12,
    };
  },
  computed: {
    paginatedMessages() {
      const start = (this.currentPage - 1) * this.messagesPerPage;
      const end = start + this.messagesPerPage;
      return this.messages.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.messages.length / this.messagesPerPage);
    },
  },
  mounted() {
    this.fetchMessages();
    this.loadLikedMessages();
  },
  methods: {
    fetchMessages() {
      axios
        .get("http://127.0.0.1:8000/api/feedbacks/")
        .then((response) => {
          this.messages = response.data;
          this.loadLikedMessages();  // Ensure to load liked messages after fetching
        })
        .catch((error) => {
          console.error("Error fetching feedbacks:", error);
        });
    },
    submitMessage() {
      if (this.message.trim() === "") {
        Swal.fire({
          title: "Pesan tidak boleh kosong!",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }
      
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Pesan Anda akan dikirim.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya, kirim pesan!",
        cancelButtonText: "Batal",
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
            .then(() => {
              this.message = "";
              Swal.fire({
                title: "Pesan berhasil dikirim!",
                icon: "success",
                confirmButtonText: "OK",
              });
              this.fetchMessages();
            })
            .catch((error) => {
              console.error("Error submitting feedback:", error);
              Swal.fire({
                title: "Gagal mengirim pesan!",
                text: "Pastikan Anda sudah login.",
                icon: "error",
                confirmButtonText: "OK",
              });
            });
        }
      });
    },
    toggleLike(msg) {
      axios
        .post(`http://127.0.0.1:8000/api/feedbacks/${msg.id}/like/`, null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          msg.is_liked = response.data.liked;
          msg.likes_count = response.data.likes_count;
          
          // Store liked messages in localStorage
          let likedMessages = JSON.parse(localStorage.getItem("likedMessages")) || [];
          
          if (msg.is_liked) {
            likedMessages.push(msg.id);
          } else {
            likedMessages = likedMessages.filter(id => id !== msg.id);
          }
          
          localStorage.setItem("likedMessages", JSON.stringify(likedMessages));
        })
        .catch((error) => {
          console.error("Error toggling like:", error);
        });
    },
    loadLikedMessages() {
      const likedMessages = JSON.parse(localStorage.getItem("likedMessages")) || [];

      // Update the like status of messages based on what is stored in localStorage
      this.messages.forEach(msg => {
        msg.is_liked = likedMessages.includes(msg.id);
      });
    },
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
    goToPage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
    },
  },
};
</script>


<style scoped>

</style>
