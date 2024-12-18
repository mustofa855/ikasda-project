<template>
    <div class="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Kesan & Pesan
      </h1>
      <!-- Form untuk menulis kesan & pesan -->
      <form @submit.prevent="submitMessage">
        <div class="mb-4">
          <label for="message" class="block text-sm font-medium text-gray-700"
            >Tulis Kesan atau Pesan Anda</label
          >
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
        <ul>
          <li
            v-for="(msg, index) in messages"
            :key="index"
            class="mb-2 p-4 bg-gray-100 rounded-lg"
          >
            {{ msg }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "KesanPesan",
    data() {
      return {
        message: "",
        messages: [],
      };
    },
    methods: {
      submitMessage() {
        if (this.message.trim() !== "") {
          this.messages.push(this.message);
          this.message = "";
          alert("Pesan berhasil dikirim!");
        }
      },
    },
  };
  </script>
  