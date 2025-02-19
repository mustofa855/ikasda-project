<template>
  <div class="ml-64 p-6">
    <h1 class="text-3xl font-bold mb-6">Dashboard Admin</h1>
    
    <!-- Ringkasan Data -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <!-- Total Alumni -->
      <div class="bg-white p-6 rounded shadow flex items-center">
        <Icon icon="mdi:account-group" class="h-10 w-10 text-blue-500 mr-4" />
        <div>
          <p class="text-sm text-gray-600">Total Alumni</p>
          <p class="text-2xl font-bold text-gray-800">{{ totalAlumni }}</p>
        </div>
      </div>
      <!-- Total Event -->
      <div class="bg-white p-6 rounded shadow flex items-center">
        <Icon icon="mdi:calendar" class="h-10 w-10 text-green-500 mr-4" />
        <div>
          <p class="text-sm text-gray-600">Total Event</p>
          <p class="text-2xl font-bold text-gray-800">{{ totalEvents }}</p>
        </div>
      </div>
      <!-- Total Donasi -->
      <div class="bg-white p-6 rounded shadow flex items-center">
        <Icon icon="mdi:cash" class="h-10 w-10 text-green-600 mr-4" />
        <div>
          <p class="text-sm text-gray-600">Total Donasi</p>
          <p class="text-2xl font-bold text-gray-800">{{ formatCurrency(totalDonations) }}</p>
        </div>
      </div>
    </div>
    
    <!-- Laporan Penggunaan Dana -->
    <div class="bg-white p-6 rounded shadow mb-8">
      <h2 class="text-2xl font-bold mb-4">Laporan Penggunaan Dana</h2>
      <table class="min-w-full divide-y divide-gray-300">
        <thead class="bg-gray-200">
          <tr>
            <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Deskripsi</th>
            <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Jumlah Dana</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-300">
          <tr v-for="(item, index) in usageData" :key="index">
            <td class="py-3 px-6 text-sm text-gray-800">{{ item.description }}</td>
            <td class="py-3 px-6 text-sm text-gray-800">{{ formatCurrency(item.amount) }}</td>
          </tr>
          <tr v-if="usageData.length === 0">
            <td class="py-3 px-6 text-center text-sm text-gray-700" colspan="2">
              Tidak ada data penggunaan dana
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Grafik Partisipasi Alumni -->
    <div class="bg-white p-6 rounded shadow">
      <h2 class="text-2xl font-bold mb-4">Grafik Partisipasi Alumni</h2>
      <!-- Bungkus canvas dalam div dengan tinggi tetap (misal: h-52 = 208px) -->
      <div class="relative h-52">
        <canvas id="alumniChart" class="w-full h-full"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Icon } from "@iconify/vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: "DashboardAdmin",
  components: { Icon },
  data() {
    return {
      totalAlumni: 0,
      totalEvents: 0,
      totalDonations: 0,
      usageData: [],
      alumniParticipation: [],
      alumniChart: null,
    };
  },
  mounted() {
    this.fetchDashboardData();
  },
  methods: {
    fetchDashboardData() {
      const token = localStorage.getItem("access_token");
      axios
        .get("http://127.0.0.1:8000/api/bpa-dashboard/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          // Pastikan backend mengembalikan data dengan properti:
          // total_alumni, total_events, total_donations, usage_data, alumni_participation
          this.totalAlumni = response.data.total_alumni;
          this.totalEvents = response.data.total_events;
          this.totalDonations = response.data.total_donations;
          this.usageData = response.data.usage_data || [];
          this.alumniParticipation = response.data.alumni_participation || [];
          this.renderAlumniChart();
        })
        .catch((error) => {
          console.error("Error fetching dashboard data:", error);
        });
    },
    renderAlumniChart() {
      if (!this.alumniParticipation || this.alumniParticipation.length === 0) {
        return;
      }
      const labels = this.alumniParticipation.map(item => item.label);
      const counts = this.alumniParticipation.map(item => item.count);
      const ctx = document.getElementById("alumniChart").getContext("2d");
      if (this.alumniChart) {
        this.alumniChart.destroy();
      }
      this.alumniChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [{
            label: "Partisipasi Alumni",
            data: counts,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => new Intl.NumberFormat("id-ID").format(value)
              }
            }
          }
        }
      });
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(value);
    }
  }
};
</script>

<style scoped>
/* Anda dapat menambahkan styling tambahan jika diperlukan */
</style>
