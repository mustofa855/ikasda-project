<template>
    <div class="ml-64 p-6">
      <h2 class="text-xl font-bold mb-4">Notifikasi Persetujuan BPA</h2>
  
      <div v-if="proposals.length > 0">
        <ul class="space-y-4">
          <li
            v-for="proposal in proposals"
            :key="proposal.id"
            class="p-4 border rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 class="font-semibold">{{ proposal.title }}</h3>
              <p class="text-sm text-gray-600">{{ proposal.date }}</p>
            </div>
            <button
              @click="approveProposal(proposal.id)"
              class="bg-green-500 text-white px-4 py-2 rounded"
            >
              Setujui
            </button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p class="text-gray-500">Tidak ada proposal yang menunggu persetujuan.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const proposals = ref([
    { id: 1, title: 'Proposal Webinar Alumni', date: '15/12/2024' },
    { id: 2, title: 'Proposal Reuni Akbar 2024', date: '10/12/2024' },
  ]);
  
  const approveProposal = (id) => {
    const index = proposals.value.findIndex((proposal) => proposal.id === id);
    if (index !== -1) {
      proposals.value.splice(index, 1);
      alert('Proposal berhasil disetujui!');
    }
  };
  </script>
  