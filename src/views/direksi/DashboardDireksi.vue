<template>
  <div class="ml-64 p-6">
    <h1 class="text-3xl font-bold mb-6">Dashboard Direksi</h1>
    
    <!-- Laporan Strategis (Ringkasan) -->
    <div class="mb-6 bg-white p-6 rounded shadow">
      <h2 class="text-2xl font-semibold mb-4">Laporan Strategis</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 border rounded">
          <h3 class="text-xl font-bold">Total Donasi</h3>
          <p class="text-gray-700">Jumlah: {{ dashboardData.donation_count }}</p>
          <p class="text-gray-700">Total: {{ formatCurrency(dashboardData.total_donations_amount) }}</p>
        </div>
        <div class="p-4 border rounded">
          <h3 class="text-xl font-bold">Total Event</h3>
          <p class="text-gray-700">{{ dashboardData.total_events }}</p>
        </div>
        <div class="p-4 border rounded">
          <h3 class="text-xl font-bold">Pendaftaran Event</h3>
          <p class="text-gray-700">{{ dashboardData.event_registrations_count }}</p>
        </div>
      </div>
      <div class="mt-4">
        <h3 class="text-xl font-bold mb-2">Upcoming Events</h3>
        <ul>
          <li
            v-for="event in dashboardData.upcoming_events"
            :key="event.id"
            class="border-b py-2"
          >
            <p class="font-semibold">{{ event.title }}</p>
            <p class="text-gray-600">Mulai: {{ formatDate(event.start_date) }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DireksiDashboard",
  data() {
    return {
      dashboardData: {
        total_donations_amount: 0,
        donation_count: 0,
        total_events: 0,
        upcoming_events: [],
        event_registrations_count: 0,
      },
    };
  },
  mounted() {
    this.fetchDashboardData();
  },
  methods: {
    fetchDashboardData() {
      const token = localStorage.getItem("access_token");
      axios
        .get("http://127.0.0.1:8000/api/direksi-dashboard/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.dashboardData = response.data;
        })
        .catch((error) => {
          console.error("Error fetching dashboard data:", error);
        });
    },
    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    },
  },
};
</script>

<style scoped>
/* Tambahan styling jika diperlukan */
</style>
