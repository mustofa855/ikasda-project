<template>
    <div class="ml-64 p-6">
      <h1 class="text-2xl font-bold mb-6">Manajemen Alumni</h1>
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th class="py-2 px-4 border">Nama</th>
            <th class="py-2 px-4 border">Email</th>
            <th class="py-2 px-4 border">Status</th>
            <th class="py-2 px-4 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(alumni, index) in alumniData" :key="index" class="hover:bg-gray-100">
            <td class="py-2 px-4 border">{{ alumni.name }}</td>
            <td class="py-2 px-4 border">{{ alumni.email }}</td>
            <td class="py-2 px-4 border">{{ alumni.status }}</td>
            <td class="py-2 px-4 border space-x-2">
              <button @click="verifyAlumni(index)" class="bg-blue-500 text-white px-2 py-1 rounded">
                Verifikasi
              </button>
              <button @click="resetPassword(index)" class="bg-yellow-500 text-white px-2 py-1 rounded">
                Reset Password
              </button>
              <button @click="deleteAlumni(index)" class="bg-red-500 text-white px-2 py-1 rounded">
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
  
  // Data Alumni (Dummy Data)
  const alumniData = ref([
    { name: "Budi", email: "budi@mail.com", status: "Pending" },
    { name: "Siti", email: "siti@mail.com", status: "Verified" },
  ]);
  
  const verifyAlumni = (index) => {
    alumniData.value[index].status = "Verified";
  };
  
  const resetPassword = (index) => {
    alert(`Password untuk ${alumniData.value[index].name} telah direset.`);
  };
  
  const deleteAlumni = (index) => {
    alumniData.value.splice(index, 1);
  };
  </script>
  