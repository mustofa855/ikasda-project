<template>
    <div class="ml-64 p-6">
      <h2 class="text-xl font-bold mb-4">Keputusan Strategis</h2>
  
      <form @submit.prevent="submitDecision" class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium">Judul Kebijakan/Event</label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            class="w-full border px-3 py-2 rounded"
            placeholder="Masukkan judul kebijakan/event"
            required
          />
        </div>
        <div>
          <label for="description" class="block text-sm font-medium">Deskripsi</label>
          <textarea
            id="description"
            v-model="form.description"
            class="w-full border px-3 py-2 rounded"
            rows="4"
            placeholder="Deskripsi kebijakan/event"
            required
          ></textarea>
        </div>
        <div>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
            Simpan Keputusan
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const form = ref({
    title: '',
    description: '',
  });
  
  const submitDecision = () => {
    console.log('Keputusan Strategis:', form.value);
    alert('Keputusan berhasil disimpan!');
  };
  </script>
  