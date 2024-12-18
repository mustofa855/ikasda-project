<template>
    <div class="ml-64 p-6">
      <h2 class="text-xl font-bold mb-4">Statistik</h2>
  
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Grafik Partisipasi Event -->
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-lg font-bold mb-4">Partisipasi Event</h3>
          <apexchart type="bar" :options="chartOptions" :series="chartSeries" />
        </div>
  
        <!-- Grafik Donasi dan Engagement -->
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-lg font-bold mb-4">Donasi dan Engagement</h3>
          <apexchart type="pie" :options="pieOptions" :series="pieSeries" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import "vue3-apexcharts"; // Hanya impor library ApexCharts untuk Vue 3
  
  // Data untuk grafik batang (bar chart)
  const chartSeries = ref([
    {
      name: "Statistik",
      data: [120, 300, 450], // Data: Partisipasi Event, Donasi, Engagement
    },
  ]);
  const chartOptions = ref({
    chart: {
      id: "bar-chart",
    },
    xaxis: {
      categories: ["Partisipasi Event", "Donasi", "Engagement"], // Kategori di sumbu X
    },
    colors: ["#4CAF50", "#FFC107", "#2196F3"],
    title: {
      text: "Statistik Aktivitas",
      align: "center",
    },
  });
  
  // Data untuk grafik pie (pie chart)
  const pieSeries = ref([120, 300, 450]); // Data: Partisipasi Event, Donasi, Engagement
  const pieOptions = ref({
    labels: ["Partisipasi Event", "Donasi", "Engagement"],
    legend: {
      position: "bottom",
    },
    colors: ["#4CAF50", "#FFC107", "#2196F3"],
  });
  </script>
  
  <style scoped>
  /* Tambahkan gaya jika diperlukan */
  </style>
  