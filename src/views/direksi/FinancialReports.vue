<template>
  <div class="ml-64 p-6">
    <h2 class="text-xl font-bold mb-4">Laporan Keuangan</h2>
    
    <!-- Tab Navigation -->
    <div class="mb-4">
      <button
        @click="activeTab = 'mutasi'"
        :class="activeTab === 'mutasi' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'"
        class="px-4 py-2 rounded-l"
      >
        Daftar Mutasi
      </button>
      <button
        @click="activeTab = 'penggunaan'"
        :class="activeTab === 'penggunaan' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'"
        class="px-4 py-2"
      >
        Laporan Penggunaan
      </button>
      <button
        @click="activeTab = 'saldo'"
        :class="activeTab === 'saldo' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'"
        class="px-4 py-2 rounded-r"
      >
        Saldo
      </button>
    </div>
    
    <!-- Export Buttons -->
    <div class="mb-4 flex space-x-2">
      <button
        @click="exportToPDF"
        class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Cetak PDF
      </button>
      <button
        @click="exportToExcel"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Export ke Excel
      </button>
    </div>
    
    <!-- Tab Content -->
    <!-- Tab 1: Daftar Mutasi (Donasi Masuk) -->
    <div v-if="activeTab === 'mutasi'">
      <h3 class="text-lg font-medium mb-2">Daftar Mutasi (Donasi Masuk)</h3>
      <ul>
        <li
          v-for="donation in donations"
          :key="donation.id"
          class="mb-2 border-b pb-2"
        >
          <p>
            <strong>{{ donation.name }}</strong>: Rp {{ formatNumber(donation.amount) }}
          </p>
          <p class="text-sm text-gray-600">{{ donation.created_at }}</p>
        </li>
      </ul>
      <p class="font-bold mt-4">
        Total Donasi: Rp {{ formatNumber(totalDonations) }}
      </p>
    </div>
    
    <!-- Tab 2: Laporan Penggunaan (dengan input penggunaan) -->
    <div v-else-if="activeTab === 'penggunaan'">
      <h3 class="text-lg font-medium mb-2">Laporan Penggunaan</h3>
      <ul>
        <li
          v-for="usage in usages"
          :key="usage.id"
          class="mb-2 border-b pb-2"
        >
          <p>
            <strong>{{ usage.description }}</strong>: Rp {{ formatNumber(usage.amount) }}
          </p>
          <p class="text-sm text-gray-600">{{ usage.date }}</p>
        </li>
      </ul>
      <p class="font-bold mt-4">
        Total Penggunaan: Rp {{ formatNumber(totalUsages) }}
      </p>
      <!-- Form input untuk menambahkan penggunaan baru -->
      <div class="mt-6 p-4 border rounded">
        <h4 class="text-lg font-medium mb-2">Input Penggunaan Dana</h4>
        <form @submit.prevent="submitUsage">
          <div class="mb-4">
            <label for="description" class="block text-gray-700">Deskripsi</label>
            <input
              type="text"
              id="description"
              v-model="newUsage.description"
              placeholder="Masukkan deskripsi penggunaan"
              class="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div class="mb-4">
            <label for="amount" class="block text-gray-700">Jumlah (Rp)</label>
            <input
              type="number"
              id="amount"
              v-model="newUsage.amount"
              placeholder="Masukkan jumlah penggunaan"
              class="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Tambah Penggunaan
          </button>
        </form>
      </div>
    </div>
    
    <!-- Tab 3: Saldo (Rekap Donasi & Penggunaan) -->
    <div v-else-if="activeTab === 'saldo'">
      <h3 class="text-lg font-medium mb-2">Saldo dan Rekap Penggunaan</h3>
      <div class="mb-4">
        <p class="text-lg">
          <strong>Total Donasi:</strong> Rp {{ formatNumber(totalDonations) }}
        </p>
        <p class="text-lg">
          <strong>Total Penggunaan:</strong> Rp {{ formatNumber(totalUsages) }}
        </p>
        <p class="text-xl font-bold mt-2">
          <strong>Saldo:</strong> Rp {{ formatNumber(balance) }}
        </p>
      </div>
      <!-- Tampilkan detail penggunaan -->
      <div>
        <h4 class="text-md font-medium mb-2">Detail Penggunaan</h4>
        <ul>
          <li
            v-for="usage in usages"
            :key="usage.id"
            class="mb-1 border-b pb-1"
          >
            <span>{{ usage.description }}</span>
            <span class="float-right">Rp {{ formatNumber(usage.amount) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const activeTab = ref('mutasi');
const donations = ref([]);
const usages = ref([]);
const newUsage = ref({
  description: '',
  amount: ''
});

// Fungsi mengambil data donasi
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

// Fungsi mengambil data penggunaan
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
  fetchDonations();
  fetchUsages();
});

// Total donasi, penggunaan, dan saldo (saldo = totalDonasi - totalPenggunaan)
const totalDonations = computed(() =>
  donations.value.reduce((sum, donation) => sum + parseFloat(donation.amount), 0)
);

const totalUsages = computed(() =>
  usages.value.reduce((sum, usage) => sum + parseFloat(usage.amount), 0)
);

const balance = computed(() => totalDonations.value - totalUsages.value);

// Fungsi format angka
const formatNumber = (num) => {
  return Number(num).toLocaleString('id-ID');
};

// Fungsi untuk mengirim data penggunaan baru ke backend
const submitUsage = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const payload = {
      description: newUsage.value.description,
      amount: parseFloat(newUsage.value.amount)
    };
    await axios.post("http://127.0.0.1:8000/api/usages/", payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    await fetchUsages();
    newUsage.value.description = '';
    newUsage.value.amount = '';
  } catch (error) {
    console.error("Error submitting usage:", error);
  }
};

// Fungsi export ke Excel dan PDF (tidak berubah)
const exportToExcel = () => {
  let exportData = [];
  let sheetName = "";
  if (activeTab.value === 'mutasi') {
    sheetName = "Mutasi";
    exportData = donations.value.map(donation => ({
      "Donatur": donation.name,
      "Jumlah (Rp)": donation.amount,
      "Tanggal": donation.created_at
    }));
  } else if (activeTab.value === 'penggunaan') {
    sheetName = "Penggunaan";
    exportData = usages.value.map(usage => ({
      "Deskripsi": usage.description,
      "Jumlah (Rp)": usage.amount,
      "Tanggal": usage.date
    }));
  } else if (activeTab.value === 'saldo') {
    sheetName = "Saldo";
    exportData = [
      { "Total Donasi": totalDonations.value },
      { "Total Penggunaan": totalUsages.value },
      { "Saldo": balance.value }
    ];
  }
  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `${sheetName}.xlsx`);
};

const exportToPDF = () => {
  const doc = new jsPDF();
  let title = "";
  let data = [];
  let headers = [];
  
  if (activeTab.value === 'mutasi') {
    title = "Daftar Mutasi (Donasi Masuk)";
    data = donations.value.map(donation => [
      donation.name,
      formatNumber(donation.amount),
      donation.created_at
    ]);
    headers = [['Donatur', 'Jumlah (Rp)', 'Tanggal']];
  } else if (activeTab.value === 'penggunaan') {
    title = "Laporan Penggunaan";
    data = usages.value.map(usage => [
      usage.description,
      formatNumber(usage.amount),
      usage.date
    ]);
    headers = [['Deskripsi', 'Jumlah (Rp)', 'Tanggal']];
  } else if (activeTab.value === 'saldo') {
    title = "Rekap Saldo dan Penggunaan";
    data = [
      ["Total Donasi", formatNumber(totalDonations.value)],
      ["Total Penggunaan", formatNumber(totalUsages.value)],
      ["Saldo", formatNumber(balance.value)]
    ];
    headers = [['Keterangan', 'Nilai']];
  }
  
  doc.setFontSize(18);
  doc.text(title, 14, 22);
  doc.setFontSize(12);
  
  autoTable(doc, {
    startY: 30,
    head: headers,
    body: data,
  });
  
  if (activeTab.value === 'mutasi') {
    doc.text(`Total Donasi: Rp ${formatNumber(totalDonations.value)}`, 14, doc.lastAutoTable.finalY + 10);
  } else if (activeTab.value === 'penggunaan') {
    doc.text(`Total Penggunaan: Rp ${formatNumber(totalUsages.value)}`, 14, doc.lastAutoTable.finalY + 10);
  }
  
  let fileName = "";
  if (activeTab.value === 'mutasi') fileName = "Daftar_Mutasi.pdf";
  else if (activeTab.value === 'penggunaan') fileName = "Laporan_Penggunaan.pdf";
  else if (activeTab.value === 'saldo') fileName = "Rekap_Saldo.pdf";
  
  doc.save(fileName);
};
</script>

<style scoped>
/* Anda dapat menambahkan styling tambahan jika diperlukan */
</style>
