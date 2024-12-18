<template>
    <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 class="text-2xl font-bold text-center mb-6">Pendaftaran Alumni Baru</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="nama" class="block font-semibold mb-1">Nama Lengkap</label>
          <input
            type="text"
            id="nama"
            v-model="form.nama"
            class="w-full border rounded px-3 py-2"
            placeholder="Masukkan nama lengkap"
            required
          />
        </div>
        <div class="mb-4">
          <label for="angkatan" class="block font-semibold mb-1">Angkatan</label>
          <input
            type="text"
            id="angkatan"
            v-model="form.angkatan"
            class="w-full border rounded px-3 py-2"
            placeholder="Masukkan angkatan"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block font-semibold mb-1">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="w-full border rounded px-3 py-2"
            placeholder="Masukkan email"
            required
          />
        </div>
        <div class="mb-4">
          <label for="telepon" class="block font-semibold mb-1">Nomor Telepon</label>
          <input
            type="tel"
            id="telepon"
            v-model="form.telepon"
            class="w-full border rounded px-3 py-2"
            placeholder="Masukkan nomor telepon"
            required
          />
        </div>
        <div class="mb-4">
          <label for="pekerjaan" class="block font-semibold mb-1">Pekerjaan</label>
          <input
            type="text"
            id="pekerjaan"
            v-model="form.pekerjaan"
            class="w-full border rounded px-3 py-2"
            placeholder="Masukkan pekerjaan"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Daftar
        </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          nama: "",
          angkatan: "",
          email: "",
          telepon: "",
          pekerjaan: "",
        },
      };
    },
    methods: {
      async submitForm() {
        try {
          // Simpan data ke backend
          const response = await this.$axios.post(
            "/api/alumni",
            this.form
          );
          if (response.status === 201) {
            alert("Pendaftaran berhasil! Harap menunggu verifikasi admin.");
            this.form = {
              nama: "",
              angkatan: "",
              email: "",
              telepon: "",
              pekerjaan: "",
            };
          }
        } catch (error) {
          console.error(error);
          alert("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  body {
    background-color: #f9f9f9;
  }
  </style>
  