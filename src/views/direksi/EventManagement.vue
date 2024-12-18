<template>
    <div class="ml-64 p-6">
      <h1 class="text-2xl font-bold mb-6">Manajemen Event</h1>
      <button @click="addEvent" class="bg-green-500 text-white px-4 py-2 rounded mb-4">
        Tambah Event
      </button>
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th class="py-2 px-4 border">Judul Event</th>
            <th class="py-2 px-4 border">Tanggal</th>
            <th class="py-2 px-4 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(event, index) in events" :key="index" class="hover:bg-gray-100">
            <td class="py-2 px-4 border">{{ event.title }}</td>
            <td class="py-2 px-4 border">{{ event.date }}</td>
            <td class="py-2 px-4 border space-x-2">
              <button @click="editEvent(index)" class="bg-blue-500 text-white px-2 py-1 rounded">
                Edit
              </button>
              <button @click="deleteEvent(index)" class="bg-red-500 text-white px-2 py-1 rounded">
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Data Event (Dummy Data)
  const events = ref([
    { title: "Reuni Akbar 2024", date: "2024-12-01" },
    { title: "Donasi untuk Sekolah", date: "2024-11-15" },
  ]);
  
  const addEvent = () => {
    const newEvent = { title: "Event Baru", date: "2024-01-01" };
    events.value.push(newEvent);
  };
  
  const editEvent = (index) => {
    events.value[index].title = prompt("Edit Judul Event:", events.value[index].title) || events.value[index].title;
  };
  
  const deleteEvent = (index) => {
    events.value.splice(index, 1);
  };
  </script>
  