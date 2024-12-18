<template>
    <div class="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Event Alumni
      </h1>
  
      <!-- Daftar Event -->
      <div>
        <div
          v-for="event in events"
          :key="event.id"
          class="mb-4 p-4 border rounded-lg shadow-md"
        >
          <h2 class="text-xl font-semibold mb-2">{{ event.title }}</h2>
          <p class="text-gray-700">{{ event.description }}</p>
          <p class="text-gray-500 text-sm mt-2">Tanggal: {{ event.date }}</p>
  
          <!-- Tombol Daftar Event -->
          <button
            @click="registerEvent(event.id)"
            class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Daftar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "EventAlumni",
    data() {
      return {
        events: [
          {
            id: 1,
            title: "Reuni Akbar 2024",
            description: "Reuni besar untuk semua alumni sekolah.",
            date: "2024-12-10",
          },
          {
            id: 2,
            title: "Webinar Karir Alumni",
            description: "Webinar untuk berbagi pengalaman dan motivasi.",
            date: "2024-09-15",
          },
        ],
      };
    },
    methods: {
      registerEvent(eventId) {
        alert(`Anda berhasil mendaftar untuk event dengan ID ${eventId}`);
      },
    },
  };
  </script>
  