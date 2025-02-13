<template>
  <div class="login-container container mx-auto p-6 bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="username" class="block text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <!-- Field Password dengan icon show/hide -->
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password</label>
          <div class="relative">
            <input
              :type="passwordVisible ? 'text' : 'password'"
              id="password"
              v-model="password"
              class="w-full px-3 py-2 border rounded pr-10"
              required
            />
            <span 
              class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              @click="togglePasswordVisibility"
            >
              <!-- Tampilkan icon sesuai state -->
              <svg
                v-if="!passwordVisible"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.964 9.964 0 012.86-4.396M6.91 6.91A9.957 9.957 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.05 10.05 0 01-1.396 2.665M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3l18 18"
                />
              </svg>
            </span>
          </div>
        </div>

        <div class="mb-4 text-center">
          <p class="text-sm">
            Belum punya akun? 
            <router-link to="/register" class="text-blue-600 hover:underline">
              Daftar di sini
            </router-link>
          </p>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      passwordVisible: false, // State untuk menampilkan/menghilangkan password
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    login() {
      axios
        .post("http://127.0.0.1:8000/api/token/", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          // Simpan token (access dan refresh) di localStorage
          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);

          // Ambil user_role dari respons
          const userRole = response.data.user_role;

          // Redirect berdasarkan nilai user_role
          if (userRole === "alumni") {
            this.$router.push("/alumni"); // Dashboard Alumni
          } else if (userRole === "direksi") {
            this.$router.push("/direksi"); // Dashboard Direksi
          } else if (userRole === "bpa") {
            this.$router.push("/bpa"); // Dashboard BPA
          } else {
            // Jika user role tidak dikenal, tampilkan swal error
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "User role tidak dikenal.",
            });
          }
        })
        .catch((error) => {
          // Tangani error ketika login gagal, misalnya password salah atau username tidak valid
          let message = "";
          if (
            error.response &&
            error.response.data &&
            error.response.data.detail
          ) {
            message = error.response.data.detail;
          } else {
            message =
              "Login gagal. Cek kembali username dan password Anda.";
          }

          // Tampilkan pesan error dengan swal
          Swal.fire({
            icon: "error",
            title: "Login Gagal",
            text: message,
          });

          console.error("Error saat login:", error);
        });
    },
  },
};
</script>

<style scoped>
/* Tambahan gaya jika diperlukan */
</style>
