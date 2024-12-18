<template>
    <div class="bg-gray-100 min-h-screen">
      <!-- Header Section -->
      <section class="bg-ikasda-primary text-white py-12 text-center">
        <h1 class="text-4xl font-bold mb-2">Dashboard Alumni</h1>
        <p class="text-lg max-w-3xl mx-auto">
          Selamat datang di Dashboard Alumni! Kelola dan perbarui profil Anda di sini.
        </p>
      </section>
  
      <!-- Profile Section -->
      <section class="py-12 px-4">
        <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div class="p-8">
            <h2 class="text-2xl font-semibold mb-6 text-center">Profil Alumni</h2>
            <form @submit.prevent="updateProfile">
              <!-- Nama -->
              <div class="mb-4">
                <label for="nama" class="block text-gray-700 font-medium mb-2">Nama Lengkap</label>
                <input
                  id="nama"
                  v-model="profile.nama"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ikasda-primary"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <!-- Email -->
              <div class="mb-4">
                <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  id="email"
                  v-model="profile.email"
                  type="email"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ikasda-primary"
                  placeholder="Masukkan email"
                />
              </div>
              <!-- Angkatan -->
              <div class="mb-4">
                <label for="angkatan" class="block text-gray-700 font-medium mb-2">Angkatan</label>
                <input
                  id="angkatan"
                  v-model="profile.angkatan"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ikasda-primary"
                  placeholder="Masukkan angkatan"
                />
              </div>
              <!-- Alamat -->
              <div class="mb-4">
                <label for="alamat" class="block text-gray-700 font-medium mb-2">Alamat</label>
                <textarea
                  id="alamat"
                  v-model="profile.alamat"
                  rows="3"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ikasda-primary"
                  placeholder="Masukkan alamat"
                ></textarea>
              </div>
              <!-- Submit Button -->
              <div class="text-center">
                <button
                  type="submit"
                  class="bg-ikasda-primary text-white px-6 py-2 rounded-md font-bold hover:bg-ikasda-secondary"
                >
                  Perbarui Profil
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProfileView",
    data() {
      return {
        profile: {
          nama: "Nama Alumni", // Ganti dengan data dari API atau backend
          email: "alumni@example.com",
          angkatan: "2005",
          alamat: "Jl. Contoh, Bandung",
        },
      };
    },
    methods: {
      updateProfile() {
        // Simulasikan update data ke server
        console.log("Profil diperbarui:", this.profile);
        alert("Profil berhasil diperbarui!");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Tambahkan styling jika diperlukan */
  </style>
  