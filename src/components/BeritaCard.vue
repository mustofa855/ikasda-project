<template>
    <div class="border rounded-lg shadow">
      <img :src="imgSrc" alt="Gambar Berita" class="w-full h-32 object-cover" />
      <div class="p-4">
        <h3 class="font-bold">{{ title }}</h3>
        <p class="text-gray-600">{{ description }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['title', 'description', 'imgSrc'],
  };
  </script>
  