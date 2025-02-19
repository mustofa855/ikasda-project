<template>
  <div class="relative mx-4 sm:mx-8 md:mx-16 lg:mx-64 my-8 p-4 sm:p-6 bg-white shadow-lg rounded-lg">
    <!-- Ikon Edit di pojok kanan atas -->
    <div class="absolute top-4 right-4">
      <button @click="confirmEdit" class="text-gray-600 hover:text-gray-800">
        <!-- Icon pencil (SVG) -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15.232 5.232l3.536 3.536M9 11l6-6a2.828 2.828 0 114 4L13 15H9v-4z" />
        </svg>
      </button>
    </div>

    <h1 class="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
      Profil Alumni
    </h1>

    <!-- Tampilan Read-Only -->
    <div v-if="!isEditing">
      <div class="flex flex-col items-center">
        <!-- Username dan Verified Badge (bukan input) -->
        <div class="mb-2">
          <h2 class="text-lg font-medium inline-flex items-center">
            <span>{{ form.username }}</span>
            <Icon v-if="verified" icon="mdi:check-decagram" class="ml-1 text-blue-500 inline-block align-middle"
              width="16" height="16" />
          </h2>
        </div>

        <!-- Foto Profil -->
        <div class="mb-4">
          <img v-if="previewImage" :src="previewImage" alt="Foto Profil"
            class="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full" />
          <div v-else class="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center bg-gray-200 rounded-full">
            <span class="text-gray-500 text-xs sm:text-sm">No Image</span>
          </div>
        </div>
        <!-- Data Profil Lainnya -->
        <div class="mb-2">
          <h3 class="text-lg sm:text-xl font-semibold">
            {{ form.name || "Nama belum diatur" }}
          </h3>
        </div>
        <div class="mb-2">
          <p class="text-gray-600 text-sm">Angkatan: {{ form.angkatan || "-" }}</p>
        </div>
        <div class="mb-2">
          <p class="text-gray-600 text-sm">Pekerjaan: {{ form.pekerjaan || "-" }}</p>
        </div>
      </div>
    </div>

    <!-- Tampilan Edit (mode editing) -->
    <div v-else>
      <form @submit.prevent="updateProfile" enctype="multipart/form-data">
        <!-- Foto Profil -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Foto Profil</label>
          <div v-if="previewImage" class="mb-2">
            <img :src="previewImage" alt="Foto Profil" class="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full" />
          </div>
          <input type="file" @change="handleFileUpload" class="mt-2" />
          <!-- Tombol batal foto jika ada file baru yang dipilih -->
          <div v-if="fotoProfil" class="mt-2">
            <button type="button" @click="cancelPhoto"
              class="bg-red-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-red-600 transition duration-300 text-sm">
              Batal Tambah Foto
            </button>
          </div>
        </div>

        <!-- Form field untuk Username (editable) -->
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input v-model="form.username" type="text" id="username"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="Masukkan username" />
        </div>

        <!-- Nama Lengkap -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">
            Nama Lengkap
          </label>
          <input v-model="form.name" type="text" id="name"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="Masukkan nama lengkap" />
        </div>

        <!-- Angkatan -->
        <div class="mb-4">
          <label for="angkatan" class="block text-sm font-medium text-gray-700">
            Angkatan
          </label>
          <input v-model="form.angkatan" type="number" id="angkatan"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="Masukkan angkatan (contoh: 2010)" />
        </div>

        <!-- Pekerjaan -->
        <div class="mb-4">
          <label for="pekerjaan" class="block text-sm font-medium text-gray-700">
            Pekerjaan
          </label>
          <input v-model="form.pekerjaan" type="text" id="pekerjaan"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="Masukkan pekerjaan" />
        </div>

        <!-- Tombol Ajukan Verifikasi / Keterangan -->
        <div class="mt-4">
          <!-- Jika belum diverifikasi dan belum mengajukan, tampilkan tombol -->
          <button v-if="!verified && !verificationRequested" @click="requestVerification" type="button"
            class="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 text-sm">
            Ajukan Verifikasi Akun
          </button>
          <!-- Jika belum diverifikasi dan sudah mengajukan, tampilkan keterangan -->
          <span v-else-if="!verified && verificationRequested" class="text-yellow-600 text-sm">
            Permintaan verifikasi telah diajukan
          </span>
        </div>

        <!-- Tombol Simpan dan Batal Edit -->
        <div class="mt-6">
          <button type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-sm">
            Simpan Perubahan
          </button>
          <button type="button" @click="cancelEdit"
            class="w-full mt-2 bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300 text-sm">
            Batal
          </button>
        </div>
      </form>
    </div>

    <!-- Modal Konfirmasi Edit -->
    <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div class="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-sm">
        <p class="mb-4 text-sm">Apakah Anda ingin mengedit profil Anda?</p>
        <div class="flex justify-end">
          <button @click="confirmEditYes"
            class="bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg mr-2 text-sm">
            Ya
          </button>
          <button @click="confirmEditNo" class="bg-gray-300 text-gray-800 px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm">
            Batal
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { Icon } from "@iconify/vue";

export default {
  name: "ProfileAlumni",
  components: {
    Icon
  },
  data() {
    return {
      isEditing: false,
      showEditModal: false,
      form: {
        username: "",
        name: "",
        angkatan: "",
        pekerjaan: "",
      },
      fotoProfil: null,
      previewImage: null,
      originalImage: null,
      verified: false, // status verifikasi akun
      verificationRequested: false, // status permintaan verifikasi
    };
  },
  mounted() {
    this.loadProfile();
  },
  methods: {
    loadProfile() {
      const token = localStorage.getItem("access_token");
      axios
        .get("/api/my-profile/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const data = response.data;
          this.form.username = data.username || "";
          this.form.name = data.name || "";
          this.form.angkatan = data.angkatan || "";
          this.form.pekerjaan = data.pekerjaan || "";
          this.verified = data.verified || false;
          this.verificationRequested = data.verification_requested || false;
          if (data.fotoProfil) {
            this.previewImage = data.fotoProfil;
            this.originalImage = data.fotoProfil;
          }
        })
        .catch((error) => {
          console.error("Error loading profile:", error);
        });
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.fotoProfil = file;
        this.previewImage = URL.createObjectURL(file);
      }
    },
    cancelPhoto() {
      this.fotoProfil = null;
      this.previewImage = this.originalImage;
    },
    updateProfile() {
      const token = localStorage.getItem("access_token");
      const formData = new FormData();
      formData.append("username", this.form.username);
      formData.append("name", this.form.name);
      formData.append("angkatan", this.form.angkatan);
      formData.append("pekerjaan", this.form.pekerjaan);
      if (this.fotoProfil) {
        formData.append("fotoProfil", this.fotoProfil);
      }
      axios
        .patch("/api/my-profile/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          Swal.fire("Berhasil", "Profil berhasil diperbarui!", "success");
          this.isEditing = false;
          this.loadProfile();
        })
        .catch((error) => {
          console.error("Gagal memperbarui profil:", error);
          Swal.fire("Error", "Terjadi kesalahan saat memperbarui profil.", "error");
        });
    },
    confirmEdit() {
      this.showEditModal = true;
    },
    confirmEditYes() {
      this.isEditing = true;
      this.showEditModal = false;
    },
    confirmEditNo() {
      this.showEditModal = false;
    },
    cancelEdit() {
      this.isEditing = false;
      this.loadProfile();
    },
    requestVerification() {
      const token = localStorage.getItem("access_token");
      Swal.fire({
        title: "Ajukan Verifikasi",
        text: "Apakah Anda yakin ingin mengajukan verifikasi akun?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya, ajukan!",
        cancelButtonText: "Batal"
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post("/api/request-verified/", {}, {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
              Swal.fire("Berhasil", "Permintaan verifikasi telah dikirim.", "success");
              this.verificationRequested = true;
            })
            .catch((error) => {
              console.error("Gagal mengajukan verifikasi:", error);
              Swal.fire("Error", "Gagal mengajukan verifikasi. Silakan coba lagi.", "error");
            });
        }
      });
    }
  },
};
</script>

<style scoped>
/* Tambahkan style tambahan jika dibutuhkan */
</style>
