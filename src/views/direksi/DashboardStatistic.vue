<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">Statistik</h2>

    <div class="mb-8">
      <canvas id="chart"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { Chart } from 'chart.js';

onMounted(() => {
  const ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Partisipasi Event', 'Donasi', 'Engagement'],
      datasets: [
        {
          label: 'Statistik',
          data: [120, 300, 450],
          backgroundColor: ['#4CAF50', '#FFC107', '#2196F3'],
        },
      ],
    },
  });
});
</script>
