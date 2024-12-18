<template>
    <div class="ml-64 p-6">
      <h2 class="text-xl font-bold mb-4">Laporan Keuangan</h2>
  
      <!-- Daftar Donasi Masuk -->
      <div class="mb-6">
        <h3 class="text-lg font-medium">Donasi Masuk</h3>
        <ul>
          <li v-for="donation in donations" :key="donation.id" class="mb-2">
            <p><strong>{{ donation.name }}</strong>: Rp {{ donation.amount.toLocaleString() }}</p>
            <p class="text-sm text-gray-600">{{ donation.date }}</p>
          </li>
        </ul>
      </div>
  
      <!-- Laporan Penggunaan -->
      <div>
        <h3 class="text-lg font-medium">Laporan Penggunaan</h3>
        <ul>
          <li v-for="usage in usages" :key="usage.id" class="mb-2">
            <p><strong>{{ usage.description }}</strong>: Rp {{ usage.amount.toLocaleString() }}</p>
            <p class="text-sm text-gray-600">{{ usage.date }}</p>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const donations = ref([
    { id: 1, name: 'Donatur A', amount: 5000000, date: '2024-01-10' },
    { id: 2, name: 'Donatur B', amount: 3000000, date: '2024-02-15' },
  ]);
  
  const usages = ref([
    { id: 1, description: 'Pembelian Buku', amount: 2000000, date: '2024-01-20' },
    { id: 2, description: 'Pembangunan Gedung', amount: 10000000, date: '2024-02-25' },
  ]);
  </script>
  