import "./assets/tailwind.css"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from "vue3-apexcharts"
import axios from 'axios'


axios.defaults.baseURL = 'http://127.0.0.1:8000'
const app = createApp(App)

app.use(router)
app.component("apexchart", VueApexCharts);
app.mount('#app')
