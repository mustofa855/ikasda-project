<template>
    <div class="ml-64 p-6">
      <h1 class="text-3xl font-bold mb-6 text-center">Verifikasi Pengguna</h1>
      <!-- Search Bar -->
      <div class="flex justify-between items-center mb-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari pengguna..."
          class="border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          @click="fetchVerificationList"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Refresh
        </button>
      </div>
      <!-- Tabel Daftar Pengguna yang Menunggu Verifikasi -->
      <table class="min-w-full bg-white border border-gray-200 rounded shadow">
        <thead class="bg-blue-500 text-white">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-medium uppercase">Username</th>
            <th class="px-6 py-3 text-left text-sm font-medium uppercase">Nama Lengkap</th>
            <th class="px-6 py-3 text-left text-sm font-medium uppercase">Email</th>
            <th class="px-6 py-3 text-center text-sm font-medium uppercase">Status</th>
            <th class="px-6 py-3 text-left text-sm font-medium uppercase">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in filteredVerificationList"
            :key="user.id"
            class="hover:bg-gray-50"
          >
            <td class="px-6 py-3 text-sm text-gray-800">{{ user.username }}</td>
            <td class="px-6 py-3 text-sm text-gray-800">
              {{ user.first_name }} {{ user.last_name }}
            </td>
            <td class="px-6 py-3 text-sm text-gray-800">{{ user.email }}</td>
            <td class="px-6 py-3 text-sm text-gray-800 text-center">
              <span class="inline-flex items-center gap-x-1 text-red-600 font-semibold whitespace-nowrap">
                <!-- Ikon belum diverifikasi (tanda silang) -->
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2.5" d="m7 7l10 10M7 17L17 7" />
                </svg>
              </span>
            </td>
            <td class="px-6 py-3 text-sm text-gray-800">
              <!-- Tampilkan tombol verifikasi jika pengguna belum diverifikasi -->
              <button
                @click="verifyUser(user.id)"
                class="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition"
              >
                Verifikasi
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="filteredVerificationList.length === 0"
        class="text-center text-gray-500 mt-4"
      >
        Tidak ada pengguna yang menunggu verifikasi.
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  
  export default {
    name: "UserVerification",
    data() {
      return {
        verificationList: [],
        searchQuery: "",
      };
    },
    computed: {
      // Hanya tampilkan pengguna yang telah mengajukan verifikasi dan belum diverifikasi
      filteredVerificationList() {
        const pendingUsers = this.verificationList.filter(
          (user) => user.verification_requested && !user.verified
        );
        if (!this.searchQuery) {
          return pendingUsers;
        }
        const query = this.searchQuery.toLowerCase();
        return pendingUsers.filter(
          (user) =>
            (user.username && user.username.toLowerCase().includes(query)) ||
            (user.first_name && user.first_name.toLowerCase().includes(query)) ||
            (user.last_name && user.last_name.toLowerCase().includes(query)) ||
            (user.email && user.email.toLowerCase().includes(query))
        );
      },
    },
    mounted() {
      this.fetchVerificationList();
    },
    methods: {
      fetchVerificationList() {
        const token = localStorage.getItem("access_token");
        // Mengambil daftar pengguna yang mengajukan verifikasi
        axios
          .get("http://127.0.0.1:8000/api/users/?verification_requested=true", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            // Sesuaikan dengan struktur response API (misal: response.data.results atau response.data)
            this.verificationList = response.data.results || response.data;
          })
          .catch((error) => {
            console.error("Error fetching verification list:", error);
            Swal.fire(
              "Error",
              "Terjadi kesalahan saat mengambil data verifikasi.",
              "error"
            );
          });
      },
      verifyUser(userId) {
        Swal.fire({
          title: "Verifikasi Pengguna",
          text: "Apakah Anda yakin ingin memverifikasi pengguna ini?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya, verifikasi!",
          cancelButtonText: "Batal",
        }).then((result) => {
          if (result.isConfirmed) {
            const token = localStorage.getItem("access_token");
            // Memanggil API untuk mengubah status verifikasi pengguna
            axios
              .patch(
                `http://127.0.0.1:8000/api/users/${userId}/`,
                { verified: true, verification_requested: false },
                { headers: { Authorization: `Bearer ${token}` } }
              )
              .then(() => {
                Swal.fire("Berhasil", "Pengguna telah diverifikasi.", "success");
                this.fetchVerificationList();
              })
              .catch((error) => {
                console.error("Error verifying user:", error);
                Swal.fire(
                  "Gagal",
                  "Terjadi kesalahan saat memverifikasi pengguna.",
                  "error"
                );
              });
          }
        });
      },
    },
  };
  </script>
  
  <style scoped>
 
  </style>
  