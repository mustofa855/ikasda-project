<template>
    <div class="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Donasi Alumni
      </h1>
  
      <!-- Form Donasi -->
      <form @submit.prevent="submitDonation">
        <div class="mb-4">
          <label for="nama" class="block text-sm font-medium text-gray-700"
            >Nama</label
          >
          <input
            v-model="form.nama"
            type="text"
            id="nama"
            placeholder="Masukkan nama Anda"
            class="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
  
        <div class="mb-4">
          <label for="jumlah" class="block text-sm font-medium text-gray-700"
            >Jumlah Donasi (Rp)</label
          >
          <input
            v-model.number="form.jumlah"
            type="number"
            id="jumlah"
            placeholder="Contoh: 50000"
            class="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
  
        <!-- Tombol Donasi -->
        <div class="mt-4">
          <button
            type="submit"
            class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Donasi Sekarang
          </button>
        </div>
      </form>
  
      <!-- Riwayat Donasi -->
      <div class="mt-8">
        <h2 class="text-lg font-semibold mb-4">Riwayat Donasi</h2>
        <ul>
          <li
            v-for="(donation, index) in donations"
            :key="index"
            class="mb-2 p-4 bg-gray-100 rounded-lg"
          >
            {{ donation.nama }} - Rp {{ donation.jumlah.toLocaleString() }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Donasi",
    data() {
      return {
        form: {
          nama: "",
          jumlah: null,
        },
        donations: [],
      };
    },
    methods: {
      submitDonation() {
        if (this.form.nama && this.form.jumlah > 0) {
          this.donations.push({ ...this.form });
          alert("Terima kasih atas donasi Anda!");
          this.form.nama = "";
          this.form.jumlah = null;
        }
      },
    },
  };
  </script>
  