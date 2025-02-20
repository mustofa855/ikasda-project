import "./assets/tailwind.css"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from "vue3-apexcharts"
import axios from 'axios'
import Swal from "sweetalert2";


axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
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
          // Redirect ke halaman login (atau halaman lain sesuai kebutuhan)
          // Jika menggunakan vue-router:
          router.push("/login");
          // Atau jika tidak menggunakan vue-router, bisa menggunakan:
          // window.location.href = "/login";
        });
      }
      return Promise.reject(error);
    }
);