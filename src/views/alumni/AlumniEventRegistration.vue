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
        <button 
          @click="registerForEvent" 
          class="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Daftar Event
        </button>
      </div>
      <div v-else class="text-center text-gray-500">
        Loading event details...
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  
  export default {
    name: "AlumniEventRegistration",
    data() {
      return {
        event: null
      };
    },
    computed: {
      formattedContent() {
        if (this.event && this.event.description) {
          // Memecah deskripsi berdasarkan newline dan menghapus baris kosong
          return this.event.description.split(/\r?\n/).filter(paragraph => paragraph.trim() !== '');
        }
        return [];
      }
    },
    mounted() {
      // Ambil ID event dari parameter route
      const eventId = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/api/events/${eventId}/`)
        .then(response => {
          this.event = response.data;
        })
        .catch(error => {
          console.error("Error fetching event details:", error);
        });
    },
    methods: {
      formatDate(dateStr) {
        const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
        return new Date(dateStr).toLocaleDateString(undefined, options);
      },
      registerForEvent() {
        // Konfirmasi pendaftaran event menggunakan SweetAlert2
        Swal.fire({
          title: "Daftar Event",
          text: "Apakah Anda yakin ingin mendaftar untuk event ini?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya, daftar!",
          cancelButtonText: "Batal"
        }).then((result) => {
          if (result.isConfirmed) {
            const token = localStorage.getItem("access_token");
            // Pastikan token ada (user sudah login)
            if (!token) {
              Swal.fire({
                title: "Anda harus login!",
                text: "Silakan login terlebih dahulu untuk mendaftar event.",
                icon: "warning",
                confirmButtonText: "OK"
              }).then(() => {
                this.$router.push("/login");
              });
              return;
            }
            // Kirim request pendaftaran event ke endpoint API
            axios
              .post("http://127.0.0.1:8000/api/event-registration/", { event: this.event.id }, {
                headers: {
                  "Authorization": `Bearer ${token}`
                }
              })
              .then(response => {
                Swal.fire("Berhasil!", "Anda telah terdaftar untuk event ini.", "success").then(() => {
                  // Arahkan ke halaman daftar event alumni
                  this.$router.push("/alumni/event-alumni");
                });
              })
              .catch(error => {
                Swal.fire("Gagal!", "Terjadi kesalahan saat mendaftar event.", "error");
                console.error("Error during event registration:", error);
              });
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Tambahkan styling tambahan jika diperlukan */
  </style>
  