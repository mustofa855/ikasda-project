<template>
  <div class="mx-16 my-8 p-6 bg-white shadow-lg rounded-lg">
    <!-- Header -->
    <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">
      Fitur Donasi
    </h1>

    <!-- Form Donasi -->
    <div class="mb-10 border-b pb-6">
      <h2 class="text-2xl font-semibold mb-4">Buat Donasi</h2>
      <form @submit.prevent="createDonation">
        <div class="mb-4">
          <label for="donorName" class="block text-sm font-medium text-gray-700">
            Nama
          </label>
          <input
            v-model="newDonation.name"
            id="donorName"
            type="text"
            class="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan nama Anda"
            required
          />
        </div>
        <div class="mb-4">
          <label for="donorEmail" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            v-model="newDonation.email"
            id="donorEmail"
            type="email"
            class="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan email Anda"
            required
          />
        </div>
        <div class="mb-4">
          <label for="donationAmount" class="block text-sm font-medium text-gray-700">
            Nominal Donasi
          </label>
          <input
            v-model.number="newDonation.amount"
            id="donationAmount"
            type="number"
            class="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan nominal donasi (Rp)"
            required
          />
        </div>
        <div class="mb-4">
          <label for="donationMessage" class="block text-sm font-medium text-gray-700">
            Pesan (opsional)
          </label>
          <textarea
            v-model="newDonation.message"
            id="donationMessage"
            rows="3"
            class="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tulis pesan untuk donasi Anda (opsional)"
          ></textarea>
        </div>
        <!-- Upload Bukti Donasi -->
        <div class="mb-4">
          <label for="donationProof" class="block text-sm font-medium text-gray-700">
            Upload Bukti Donasi
          </label>
          <input
            @change="handleFileUpload"
            id="donationProof"
            type="file"
            class="mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <!-- QR/QRIS Pembayaran -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">
            QR / QRIS Pembayaran
          </label>
          <!-- Menggunakan qrcode.vue untuk menghasilkan QR Code secara dinamis -->
          <qrcode-vue :value="qrValue" :size="200" class="mt-2" />
        </div>
        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Kirim Donasi
        </button>
      </form>
    </div>

    <!-- Daftar Donasi -->
    <div>
      <h2 class="text-2xl font-semibold mb-6">Donasi Terbaru</h2>
      <div v-if="loading" class="text-center text-gray-600">Loading...</div>
      <div v-else>
        <ul class="space-y-4">
          <li
            v-for="donation in donations"
            :key="donation.id"
            class="p-4 border rounded-lg bg-gray-50"
          >
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-bold text-gray-800">
                {{ donation.name }}
              </h3>
              <span class="text-green-600 font-semibold">
                Rp {{ donation.amount }}
              </span>
            </div>
            <p class="text-sm text-gray-500">{{ donation.email }}</p>
            <p v-if="donation.message" class="mt-2 text-gray-700">
              Pesan: {{ donation.message }}
            </p>
            <!-- Jika ada bukti donasi yang diupload, tampilkan link atau preview -->
            <div v-if="donation.proof_url" class="mt-2">
              <a :href="donation.proof_url" target="_blank" class="text-blue-500 underline">
                Lihat Bukti Donasi
              </a>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              {{ formatDate(donation.created_at) }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import QrcodeVue from "qrcode.vue";
import Swal from "sweetalert2"; // pastikan sudah install sweetalert2 (npm install sweetalert2)

export default {
  name: "Donasi",
  components: { QrcodeVue },
  data() {
    return {
      newDonation: {
        name: "",
        email: "",
        amount: null,
        message: "",
        proof: null,
      },
      donations: [],
      loading: false,
      // Nilai yang digunakan untuk menghasilkan QR Code (ubah sesuai kebutuhan)
      qrValue: "https://example.com/donation-payment",
    };
  },
  mounted() {
    this.fetchDonations();
  },
  methods: {
    // Format tanggal seperti "5 menit yang lalu" atau "23 Februari 2025"
    formatDate(dateStr) {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now - date;
      const diffSeconds = Math.floor(diffMs / 1000);
      if (diffSeconds < 60) {
        return "baru saja";
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
    // Mengambil data donasi dari backend
    fetchDonations() {
      this.loading = true;
      axios
        .get("http://127.0.0.1:8000/api/donations/")
        .then((response) => {
          this.donations = response.data;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching donations:", error);
          this.loading = false;
        });
    },
    // Tangani upload file bukti donasi
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.newDonation.proof = file;
    },
    // Mengirim donasi ke backend menggunakan FormData untuk menyertakan file
    createDonation() {
      // Validasi input minimal
      if (
        !this.newDonation.name.trim() ||
        !this.newDonation.email.trim() ||
        !this.newDonation.amount
      ) {
        Swal.fire("Peringatan", "Mohon lengkapi data donasi!", "warning");
        return;
      }
      const formData = new FormData();
      formData.append("name", this.newDonation.name);
      formData.append("email", this.newDonation.email);
      formData.append("amount", this.newDonation.amount);
      formData.append("message", this.newDonation.message);
      if (this.newDonation.proof) {
        formData.append("proof", this.newDonation.proof);
      }
      
      // Mengambil token dari localStorage (pastikan token sudah tersimpan saat login)
      const token = localStorage.getItem("token");

      axios
        .post("http://127.0.0.1:8000/api/donations/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { "Authorization": `Bearer ${token}` }),
          },
        })
        .then((response) => {
          Swal.fire("Sukses", "Donasi berhasil dikirim!", "success");
          // Reset form donasi
          this.newDonation = {
            name: "",
            email: "",
            amount: null,
            message: "",
            proof: null,
          };
          // Refresh daftar donasi
          this.fetchDonations();
        })
        .catch((error) => {
          console.error("Error sending donation:", error);
          // Jika error status 401, artinya user belum terautentikasi dengan benar
          if (error.response && error.response.status === 401) {
            Swal.fire("Error", "Anda tidak terautentikasi. Silakan login terlebih dahulu.", "error");
          } else {
            Swal.fire("Error", "Gagal mengirim donasi. Silakan coba lagi.", "error");
          }
        });
    },
  },
};
</script>

<style scoped>
/* Tambahkan style tambahan sesuai kebutuhan */
</style>
