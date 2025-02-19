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
            <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Tanggal</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-300">
          <tr v-for="(item, index) in usageData" :key="index">
            <td class="py-3 px-6 text-sm text-gray-800">{{ item.description }}</td>
            <td class="py-3 px-6 text-sm text-gray-800">{{ formatCurrency(item.amount) }}</td>
            <td class="py-3 px-6 text-sm text-gray-800">{{ item.date }}</td>
          </tr>
          <tr v-if="usageData.length === 0">
            <td class="py-3 px-6 text-center text-sm text-gray-700" colspan="3">
              Tidak ada data penggunaan dana
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Grafik Partisipasi Alumni -->
    <div class="bg-white p-6 rounded shadow">
      <h2 class="text-2xl font-bold mb-4">Grafik Partisipasi Alumni</h2>
      <!-- Bungkus canvas dalam div dengan tinggi tetap (misal: h-52) -->
      <div class="relative h-52">
        <canvas id="alumniChart" class="w-full h-full"></canvas>
      </div>
    </div>
    
    <!-- Saldo dan Rekap Penggunaan -->
    <div class="bg-white p-6 rounded shadow mt-8">
      <h2 class="text-2xl font-bold mb-4">Saldo dan Rekap Penggunaan</h2>
      <div class="mb-4">
        <p class="text-lg">
          <strong>Total Donasi:</strong> Rp {{ formatCurrency(totalDonations) }}
        </p>
        <p class="text-lg">
          <strong>Total Penggunaan:</strong> Rp {{ formatCurrency(totalUsages) }}
        </p>
        <p class="text-xl font-bold mt-2">
          <strong>Saldo:</strong> Rp {{ formatCurrency(balance) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { Icon } from '@iconify/vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const totalAlumni = ref(0);
const totalEvents = ref(0);
const totalDonations = ref(0);
const totalUsages = ref(0);
const usageData = ref([]);
const alumniParticipation = ref([]);
const alumniChart = ref(null);

const balance = computed(() => totalDonations.value - totalUsages.value);

const formatCurrency = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(value);
};

const formatNumber = (num) => {
  return Number(num).toLocaleString('id-ID');
};

const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get("http://127.0.0.1:8000/api/bpa-dashboard/", {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Debug: console.log(response.data);
    totalAlumni.value = response.data.total_alumni;
    totalEvents.value = response.data.total_events;
    totalDonations.value = response.data.total_donations;
    totalUsages.value = response.data.total_usages;
    usageData.value = response.data.usage_data || [];
    alumniParticipation.value = response.data.alumni_participation || [];
    renderAlumniChart();
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
};

const renderAlumniChart = () => {
  if (!alumniParticipation.value || alumniParticipation.value.length === 0) {
    return;
  }
  const labels = alumniParticipation.value.map(item => item.label);
  const counts = alumniParticipation.value.map(item => item.count);
  const ctx = document.getElementById("alumniChart").getContext("2d");
  if (alumniChart.value) {
    alumniChart.value.destroy();
  }
  alumniChart.value = new Chart(ctx, {
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
};

onMounted(() => {
  fetchDashboardData();
});
</script>

<style scoped>
/* Tambahan styling jika diperlukan */
</style>
