<template>
    <aside class="w-64 bg-gray-800 h-screen text-white fixed">
      <div class="py-4 text-center text-2xl font-bold border-b border-gray-600">
        Dashboard
      </div>
      <ul class="mt-6">
        <li>
          <router-link 
            to="/direksi" 
            :class="isActive('/direksi')"
            class="block px-4 py-2 hover:bg-gray-700 transition"
          >
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link 
            to="/direksi/statistic" 
            :class="isActive('/direksi/statistic')"
            class="block px-4 py-2 hover:bg-gray-700 transition"
          >
            Statistik
          </router-link>
        </li>
        <li>
          <router-link 
            to="/direksi/alumni-management" 
            :class="isActive('/direksi/alumni-management')"
            class="block px-4 py-2 hover:bg-gray-700 transition"
          >
            Manajemen Alumni
          </router-link>
        </li>
        <li>
          <router-link 
            to="/direksi/event-management" 
            :class="isActive('/direksi/event-management')"
            class="block px-4 py-2 hover:bg-gray-700 transition"
          >
            Manajemen Event
          </router-link>
        </li>
        <li>
          <router-link 
            to="/direksi/content-management" 
            :class="isActive('/direksi/content-management')"
            class="block px-4 py-2 hover:bg-gray-700 transition"
          >
            Manajemen Konten
          </router-link>
        </li>
        <li>
          <router-link 
            to="/direksi/financial-reports" 
            :class="isActive('/direksi/financial-reports')"
            class="block px-4 py-2 hover:bg-gray-700 transition"
          >
            Laporan Keuangan
          </router-link>
        </li>
        <li>
          <router-link 
            to="/direksi/keputusan-bpa" 
            :class="isActive('/direksi/keputusan-bpa')"
            class="block px-4 py-2 hover:bg-gray-700 transition"
          >
            Keputusan BPA
          </router-link>
        </li>
        <li>
          <router-link 
            to="/direksi/strategic-decision" 
            :class="isActive('/direksi/strategic-decision')"
            class="block px-4 py-2 hover:bg-gray-700 transition"
          >
            Keputusan Strategis
          </router-link>
        </li>
        <li>
          <router-link 
            to="/direksi/strategic-reports" 
            :class="isActive('/direksi/strategic-reports')"
            class="block px-4 py-2 hover:bg-gray-700 transition"
          >
            Laporan Strategis
          </router-link>
        </li>
      </ul>
    </aside>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  
  const isActive = (path) => {
    return route.path === path ? "bg-gray-700 font-bold" : "";
  };
  </script>
  
  <style scoped>
  a {
    text-decoration: none;
  }
  </style>
  