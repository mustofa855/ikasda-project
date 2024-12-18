<template>
    <div class="border rounded-lg p-4 shadow">
      <h3 class="font-bold text-lg">{{ title }}</h3>
      <p class="text-gray-600">Tanggal: {{ date }}</p>
      <p class="text-gray-600">Lokasi: {{ location }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: ['title', 'date', 'location'],
  };
  </script>
  