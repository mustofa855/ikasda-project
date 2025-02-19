<template>
  <div class="ml-64 p-6">
    <h1 class="text-3xl font-bold mb-6">Pengawasan Event</h1>
    <div class="bg-white p-6 rounded shadow">
      <table class="min-w-full divide-y divide-gray-300">
        <thead class="bg-gray-200">
          <tr>
            <th class="py-3 px-4 text-left text-sm font-medium text-gray-700">No</th>
            <th class="py-3 px-4 text-left text-sm font-medium text-gray-700">Judul Event</th>
            <th class="py-3 px-4 text-left text-sm font-medium text-gray-700">Lokasi</th>
            <th class="py-3 px-4 text-left text-sm font-medium text-gray-700">Tanggal Mulai</th>
            <th class="py-3 px-4 text-left text-sm font-medium text-gray-700">Pendaftar</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-300">
          <tr v-for="(event, index) in events" :key="event.id" class="hover:bg-gray-50">
            <td class="py-3 px-4 text-sm text-gray-800">{{ index + 1 }}</td>
            <td class="py-3 px-4 text-sm text-gray-800">{{ event.title }}</td>
            <td class="py-3 px-4 text-sm text-gray-800">{{ event.location }}</td>
            <td class="py-3 px-4 text-sm text-gray-800">{{ formatDate(event.start_date) }}</td>
            <td class="py-3 px-4 text-sm text-gray-800">{{ event.registration_count }}</td>
          </tr>
          <tr v-if="events.length === 0">
            <td class="py-3 px-4 text-center text-sm text-gray-700" colspan="5">
              Tidak ada data event untuk diawasi.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const events = ref([]);

const formatDate = (dateStr) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const fetchEventSupervision = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get("http://127.0.0.1:8000/api/event-supervision/", {
      headers: { Authorization: `Bearer ${token}` }
    });
    events.value = response.data;
  } catch (error) {
    console.error("Error fetching event supervision data:", error);
  }
};

onMounted(() => {
  fetchEventSupervision();
});
</script>
