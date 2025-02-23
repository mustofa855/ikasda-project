import "./assets/tailwind.css"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from "vue3-apexcharts"
import axios from 'axios'
import Swal from "sweetalert2";

// Menggunakan import.meta.env untuk mengakses variabel lingkungan pada Vite
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const app = createApp(App)

app.use(router)
app.component("apexchart", VueApexCharts);
app.mount('#app')

// Tambahkan interceptor response
axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Jika error response status 401 (Unauthorized)
      if (error.response && error.response.status === 401) {
        Swal.fire({
          title: "Session Expired",
          text: "Sesi Anda telah habis. Silakan login kembali.",
          icon: "warning",
          confirmButtonText: "OK"
        }).then(() => {
          // Hapus token dari localStorage
          localStorage.removeItem("access_token");
          // Redirect ke halaman login
          router.push("/login");
        });
      }
      return Promise.reject(error);
    }
);
