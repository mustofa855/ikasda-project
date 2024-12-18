<template>
    <div class="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Profil Alumni
      </h1>
      <form @submit.prevent="updateProfile">
        <!-- Foto Profil -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Foto Profil</label>
          <input type="file" @change="handleFileUpload" class="mt-2" />
        </div>
  
        <!-- Nama Lengkap -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Nama Lengkap</label
          >
          <input
            v-model="form.name"
            type="text"
            id="name"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan nama lengkap"
          />
        </div>
  
        <!-- Angkatan -->
        <div class="mb-4">
          <label for="angkatan" class="block text-sm font-medium text-gray-700"
            >Angkatan</label
          >
          <input
            v-model="form.angkatan"
            type="number"
            id="angkatan"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan angkatan (contoh: 2010)"
          />
        </div>
  
        <!-- Pekerjaan -->
        <div class="mb-4">
          <label for="pekerjaan" class="block text-sm font-medium text-gray-700"
            >Pekerjaan</label
          >
          <input
            v-model="form.pekerjaan"
            type="text"
            id="pekerjaan"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan pekerjaan"
          />
        </div>
  
        <!-- Tombol Simpan -->
        <div class="mt-6">
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProfileAlumni",
    data() {
      return {
        form: {
          name: "",
          angkatan: "",
          pekerjaan: "",
        },
        fotoProfil: null,
      };
    },
    methods: {
      handleFileUpload(event) {
        this.fotoProfil = event.target.files[0];
      },
      updateProfile() {
        // Simulasi update profil
        console.log("Profil berhasil diperbarui", this.form, this.fotoProfil);
        alert("Profil berhasil diperbarui!");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Tambahkan style jika dibutuhkan */
  </style>
  