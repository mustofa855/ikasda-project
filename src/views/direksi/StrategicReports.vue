<template>
  <div class="ml-64 p-6">
    <h2 class="text-xl font-bold mb-4">Laporan Strategis</h2>
    
    <!-- Ringkasan Statistik -->
    <div class="grid grid-cols-3 gap-4 mb-8">
      <div class="bg-gray-100 p-4 rounded shadow">
        <h3 class="text-lg font-semibold">Total Alumni</h3>
        <p class="text-3xl font-bold text-blue-600">{{ totalAlumni }}</p>
      </div>
      <div class="bg-gray-100 p-4 rounded shadow">
        <h3 class="text-lg font-semibold">Total Donasi</h3>
        <p class="text-3xl font-bold text-green-600">Rp {{ formatNumber(totalDonasi) }}</p>
      </div>
      <div class="bg-gray-100 p-4 rounded shadow">
        <h3 class="text-lg font-semibold">Jumlah Event</h3>
        <p class="text-3xl font-bold text-purple-600">{{ totalEvent }}</p>
      </div>
    </div>
    
    <!-- Laporan Keuangan -->
    <div class="mb-8">
      <h3 class="text-lg font-bold mb-2">Laporan Keuangan</h3>
      <table class="table-auto w-full border">
        <thead>
          <tr class="bg-gray-200 text-left">
            <th class="px-4 py-2 border">Tanggal</th>
            <th class="px-4 py-2 border">Sumber Donasi</th>
            <th class="px-4 py-2 border">Jumlah</th>
            <th class="px-4 py-2 border">Penggunaan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in combinedRecords" :key="record.date + record.source">
            <td class="px-4 py-2 border">{{ formatDate(record.date) }}</td>
            <td class="px-4 py-2 border">{{ record.source }}</td>
            <td class="px-4 py-2 border">Rp {{ formatNumber(record.amount) }}</td>
            <td class="px-4 py-2 border">{{ record.usage }}</td>
          </tr>
        </tbody>
      </table>
      
      <!-- Tabel Rekap Dana -->
      <div class="mt-6">
        <h3 class="text-lg font-bold mb-2">Rekap Dana</h3>
        <table class="table-auto w-full border">
          <thead>
            <tr class="bg-gray-200 text-left">
              <th class="px-4 py-2 border">Total Donasi</th>
              <th class="px-4 py-2 border">Total Penggunaan</th>
              <th class="px-4 py-2 border">Saldo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-4 py-2 border">Rp {{ formatNumber(totalDonasi) }}</td>
              <td class="px-4 py-2 border">Rp {{ formatNumber(totalPenggunaan) }}</td>
              <td class="px-4 py-2 border">Rp {{ formatNumber(saldo) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
    
    <!-- Data Event -->
    <div>
      <h3 class="text-lg font-bold mb-2">Data Event</h3>
      <table class="table-auto w-full border">
        <thead>
          <tr class="bg-gray-200 text-left">
            <th class="px-4 py-2 border">Nama Event</th>
            <th class="px-4 py-2 border">Tanggal</th>
            <th class="px-4 py-2 border">Partisipasi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.id">
            <td class="px-4 py-2 border">{{ event.title }}</td>
            <td class="px-4 py-2 border">{{ formatDate(event.start_date) }}</td>
            <td class="px-4 py-2 border">
              {{ event.participation || 'N/A' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// Data refs
const alumni = ref([]);
const donations = ref([]);
const events = ref([]);
const usages = ref([]);

// Ambil data alumni
const fetchAlumni = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get("http://127.0.0.1:8000/api/alumni/", {
      headers: { Authorization: `Bearer ${token}` }
    });
    alumni.value = response.data;
  } catch (error) {
    console.error("Error fetching alumni:", error);
  }
};

// Ambil data donasi
const fetchDonations = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get("http://127.0.0.1:8000/api/donations/", {
      headers: { Authorization: `Bearer ${token}` }
    });
    donations.value = response.data;
  } catch (error) {
    console.error("Error fetching donations:", error);
  }
};

// Ambil data event
const fetchEvents = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get("http://127.0.0.1:8000/api/events/", {
      headers: { Authorization: `Bearer ${token}` }
    });
    events.value = response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

// Ambil data penggunaan
const fetchUsages = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get("http://127.0.0.1:8000/api/usages/", {
      headers: { Authorization: `Bearer ${token}` }
    });
    usages.value = response.data;
  } catch (error) {
    console.error("Error fetching usages:", error);
  }
};

onMounted(() => {
  fetchAlumni();
  fetchDonations();
  fetchEvents();
  fetchUsages();
});

// Computed values
const totalAlumni = computed(() => alumni.value.length);
const totalDonasi = computed(() =>
  donations.value.reduce((sum, d) => sum + parseFloat(d.amount), 0)
);
const totalEvent = computed(() => events.value.length);

// Hitung total penggunaan
const totalPenggunaan = computed(() =>
  usages.value.reduce((sum, u) => sum + parseFloat(u.amount), 0)
);

// Hitung saldo = total donasi - total penggunaan
const saldo = computed(() => totalDonasi.value - totalPenggunaan.value);

// Gabungkan data donasi dan penggunaan menjadi satu laporan keuangan
const combinedRecords = computed(() => {
  const donationRecords = donations.value.map(donation => ({
    date: donation.created_at,
    source: donation.name,
    amount: donation.amount,
    usage: donation.message || ""
  }));
  const usageRecords = usages.value.map(usage => ({
    date: usage.date,
    source: "",
    amount: usage.amount,
    usage: usage.description
  }));
  const combined = donationRecords.concat(usageRecords);
  // Urutkan berdasarkan tanggal (ascending)
  combined.sort((a, b) => new Date(a.date) - new Date(b.date));
  return combined;
});

// Fungsi format angka
const formatNumber = (num) => {
  return Number(num).toLocaleString();
};

// Fungsi format tanggal
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
};
</script>

<style scoped>
/* Tambahkan styling tambahan jika diperlukan */
</style>
