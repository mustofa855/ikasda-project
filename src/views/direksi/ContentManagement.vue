<template>
    <div class="p-6">
      <h2 class="text-xl font-bold mb-4">Manajemen Konten</h2>
  
      <!-- Form untuk menambahkan konten -->
      <form @submit.prevent="addContent">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700">Judul</label>
          <input
            type="text"
            id="title"
            v-model="newContent.title"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
  
        <div class="mb-4">
          <label for="type" class="block text-sm font-medium text-gray-700">Jenis Konten</label>
          <select
            id="type"
            v-model="newContent.type"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Berita">Berita</option>
            <option value="Galeri">Galeri</option>
            <option value="Pengumuman">Pengumuman</option>
          </select>
        </div>
  
        <div class="mb-4">
          <label for="content" class="block text-sm font-medium text-gray-700">Konten</label>
          <textarea
            id="content"
            v-model="newContent.content"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows="4"
          ></textarea>
        </div>
  
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Tambahkan Konten
        </button>
      </form>
  
      <!-- Daftar konten -->
      <div class="mt-8">
        <h3 class="text-lg font-medium">Daftar Konten</h3>
        <ul>
          <li v-for="content in contents" :key="content.id" class="mb-2">
            <h4 class="font-semibold">{{ content.title }}</h4>
            <p class="text-sm text-gray-600">{{ content.type }}</p>
            <p>{{ content.content }}</p>
            <button
              class="text-red-600 hover:underline"
              @click="deleteContent(content.id)"
            >
              Hapus
            </button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const contents = ref([]);
  const newContent = ref({
    title: '',
    type: 'Berita',
    content: '',
  });
  
  const addContent = () => {
    const id = Date.now();
    contents.value.push({ id, ...newContent.value });
    newContent.value = { title: '', type: 'Berita', content: '' };
  };
  
  const deleteContent = (id) => {
    contents.value = contents.value.filter((content) => content.id !== id);
  };
  </script>
  