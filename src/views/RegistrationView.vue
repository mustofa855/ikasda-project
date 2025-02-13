<template>
  <div class="registration-container container mx-auto p-6 bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4 text-center">Registrasi</h2>
      <form @submit.prevent="register">
        <!-- Username -->
        <div class="mb-4">
          <label for="username" class="block text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            v-model="form.username"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <!-- First Name -->
        <div class="mb-4">
          <label for="first_name" class="block text-gray-700">First Name</label>
          <input
            type="text"
            id="first_name"
            v-model="form.first_name"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <!-- Last Name -->
        <div class="mb-4">
          <label for="last_name" class="block text-gray-700">Last Name</label>
          <input
            type="text"
            id="last_name"
            v-model="form.last_name"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <!-- Password -->
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            class="w-full px-3 py-2 border rounded"
            required
          />
          <!-- Validasi real-time: tampilkan pesan error jika password kurang dari 8 karakter -->
          <small v-if="form.password && form.password.length < 8" class="text-red-500">
            Masukkan minimal 8 karakter
          </small>
        </div>
        <!-- Nomor Telepon -->
        <div class="mb-4">
          <label for="phone" class="block text-gray-700">Nomor Telepon</label>
          <input
            type="tel"
            id="phone"
            v-model="form.phone"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <!-- Data tambahan untuk Alumni -->
        <div>
          <div class="mb-4">
            <label for="graduation_year" class="block text-gray-700">Angkatan</label>
            <input
              type="number"
              id="graduation_year"
              v-model="form.graduation_year"

              class="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div class="mb-4">
            <label for="education" class="block text-gray-700">Pendidikan Terakhir</label>
            <input
              type="text"
              id="education"
              v-model="form.education"

              class="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div class="mb-4">
            <label for="job" class="block text-gray-700">Pekerjaan</label>
            <input
              type="text"
              id="job"
              v-model="form.job"

              class="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>
        <!-- Tombol Registrasi -->
        <button type="submit" class="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Register
        </button>
      </form>
      <!-- Pesan setelah registrasi -->
      <p v-if="message" class="mt-4 text-center">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "RegistrationView",
  data() {
    return {
      form: {
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        // Role otomatis di-set ke "alumni"
        role: "alumni",
        phone: "",
        graduation_year: "",
        education: "",
        job: ""
      },
      message: ""
    };
  },
  methods: {
    // Fungsi untuk memvalidasi domain email (opsional)
    validateEmailDomain(email) {
      const allowedDomains = ["gmail.com", "yahoo.com"];
      const parts = email.split("@");
      if (parts.length !== 2) return false;
      const domain = parts[1].toLowerCase();
      return allowedDomains.includes(domain);
    },
    register() {
      // Cegah registrasi jika password kurang dari 8 karakter
      if (this.form.password.length < 8) {
        Swal.fire({
          title: "Password terlalu pendek!",
          text: "Pastikan password memiliki minimal 8 karakter.",
          icon: "error",
          confirmButtonText: "OK"
        });
        return;
      }
      // (Opsional) Validasi domain email jika diinginkan
      if (!this.validateEmailDomain(this.form.email)) {
        Swal.fire({
          title: "Email tidak valid!",
          text: "Tolong gunakan email dengan domain gmail.com atau yahoo.com.",
          icon: "error",
          confirmButtonText: "OK"
        });
        return;
      }
      // Tampilkan swal konfirmasi
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Pastikan data yang Anda masukkan sudah benar!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, registrasi sekarang!",
        cancelButtonText: "Periksa lagi"
      }).then((result) => {
        if (result.isConfirmed) {
          // Lanjutkan dengan pengiriman data ke backend
          axios
            .post("http://127.0.0.1:8000/api/register/", this.form)
            .then((response) => {
              Swal.fire("Berhasil!", "Registrasi berhasil!", "success").then(() => {
                this.$router.push("/login");
              });
            })
            .catch((error) => {
              Swal.fire("Gagal!", "Registrasi gagal!", "error");
              this.message =
                error.response && error.response.data
                  ? JSON.stringify(error.response.data)
                  : "Registrasi gagal.";
              console.error("Error during registration:", error);
            });
        }
      });
    }
  }
};
</script>

<style scoped>
/* Tambahkan styling jika diperlukan */
</style>
