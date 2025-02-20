<template>
  <div class="alumni-directory p-4 px-10">
    <h1 class="text-center text-2xl font-bold mb-4">Direktori Alumni</h1>

    <!-- Pencarian Alumni -->
    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Cari alumni..."
        class="p-2 border rounded w-96"
      />
    </div>

    <!-- Jika user belum terverifikasi, tampilkan pesan -->
    <div
      v-if="!userVerified"
      class="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 text-center mb-4"
    >
      Mohon maaf, halaman ini hanya bisa diakses oleh pengguna yang sudah terverifikasi.
      Silakan ajukan verifikasi di profil.
    </div>

    <!-- Tampilkan Alumni dalam Bentuk Card hanya jika user terverifikasi -->
    <div
      v-if="userVerified"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <div
        v-for="alumni in filteredAlumni"
        :key="alumni.id"
        class="card p-4 border rounded shadow-md hover:shadow-lg"
      >
        <!-- Foto Alumni -->
        <div class="mb-4">
          <img
            :src="alumni.profile && alumni.profile.profile_photo ? alumni.profile.profile_photo : 'https://via.placeholder.com/400x300'"
            alt="Foto Alumni"
            class="w-full h-48 object-cover rounded-t"
          />
        </div>

        <!-- Nama dan Angkatan Alumni -->
        <div class="text-center mb-2">
          <h3 class="font-semibold text-lg">
            {{ alumni.first_name }} {{ alumni.last_name }}
          </h3>
          <p class="text-sm text-gray-500">
            Angkatan - {{ alumni.profile ? alumni.profile.graduation_year : '-' }}
          </p>
        </div>

        <!-- Tombol Lihat Detail -->
        <div class="text-center">
          <button
            @click="openModal(alumni)"
            class="bg-blue-500 text-white p-2 rounded"
          >
            Lihat Detail
          </button>
        </div>
      </div>
      <div
        v-if="filteredAlumni.length === 0"
        class="col-span-full text-center text-gray-500"
      >
        Tidak ada alumni untuk ditampilkan.
      </div>
    </div>

    <!-- Modal untuk Menampilkan Detail Alumni -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded shadow-lg w-full sm:w-96">
        <h2 class="text-2xl font-semibold mb-4">Detail Alumni</h2>
        <div v-if="selectedAlumni">
          <!-- Foto Alumni dalam Modal -->
          <div class="mb-4">
            <img
              :src="selectedAlumni.profile && selectedAlumni.profile.profile_photo ? selectedAlumni.profile.profile_photo : 'https://via.placeholder.com/400x300'"
              alt="Foto Alumni"
              class="w-full h-48 object-cover rounded"
            />
          </div>
          <!-- Data Lengkap Alumni -->
          <div class="mb-4">
            <p>
              <strong>Nama:</strong>
              {{ selectedAlumni.first_name }} {{ selectedAlumni.last_name }}
            </p>
            <p>
              <strong>Angkatan:</strong>
              {{ selectedAlumni.profile ? selectedAlumni.profile.graduation_year : '-' }}
            </p>
            <p><strong>Email:</strong> {{ selectedAlumni.email || '-' }}</p>
            <p><strong>Telepon:</strong> {{ selectedAlumni.phone || '-' }}</p>
            <p>
              <strong>Pekerjaan:</strong>
              {{ selectedAlumni.profile && selectedAlumni.profile.job ? selectedAlumni.profile.job : '-' }}
            </p>
            <p>
              <strong>Pendidikan:</strong>
              {{ selectedAlumni.profile && selectedAlumni.profile.education ? selectedAlumni.profile.education : '-' }}
            </p>
          </div>
          <!-- Tombol Tutup Modal -->
          <div class="text-center">
            <button
              @click="closeModal"
              class="bg-red-500 text-white p-2 rounded"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "AlumniManagement",
  data() {
    return {
      userList: [],
      searchQuery: "",
      isModalOpen: false,
      selectedAlumni: null,
      userVerified: false // Default: belum terverifikasi
    };
  },
  computed: {
    filteredAlumni() {
      return this.userList.filter((alumni) => {
        const fullName = `${alumni.first_name} ${alumni.last_name}`.toLowerCase();
        return fullName.includes(this.searchQuery.toLowerCase());
      });
    },
  },
  mounted() {
    // Misalnya, kita simpan data user saat login di localStorage dengan key "user_data"
    const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
    // Pastikan field "verified" ada di data user
    this.userVerified = userData.verified || false;

    // Hanya ambil data alumni jika user sudah terverifikasi
    if (this.userVerified) {
      this.fetchUsers();
    }
  },
  methods: {
    fetchUsers() {
      const token = localStorage.getItem("access_token");
      axios
        .get("http://127.0.0.1:8000/api/users/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          // Jika API menggunakan paginasi, data mungkin berada di response.data.results
          if (response.data.results) {
            this.userList = response.data.results;
          } else {
            this.userList = response.data;
          }
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Gagal mengambil data alumni!",
          });
        });
    },
    openModal(alumni) {
      this.selectedAlumni = alumni;
      this.isModalOpen = true;
    },
    closeModal() {
      this.selectedAlumni = null;
      this.isModalOpen = false;
    },
  },
};
</script>

<style scoped>
.card {
  transition: transform 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
}
</style>
