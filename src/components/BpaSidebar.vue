<template>
    <aside class="w-64 bg-blue-800 h-screen text-white fixed">
      <div class="py-4 text-center text-2xl font-bold">
        Dashboard BPA
      </div>
      <ul class="mt-6">
        <li>
          <router-link 
            to="/bpa" 
            :class="isActive('/bpa')"
            class="block px-4 py-2 hover:bg-blue-700 transition"
          >
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link 
            to="/bpa/activity-audit" 
            :class="isActive('/bpa/activity-audit')"
            class="block px-4 py-2 hover:bg-blue-700 transition"
          >
            Audit Aktivitas
          </router-link>
        </li>
        <li>
          <router-link 
            to="/bpa/audit-reports" 
            :class="isActive('/bpa/audit-reports')"
            class="block px-4 py-2 hover:bg-blue-700 transition duration-300"
          >
            Laporan Audit
          </router-link>
        </li>
        <li>
          <router-link 
            to="/bpa/pengawasan-event" 
            :class="isActive('/bpa/pengawasan-event')"
            class="block px-4 py-2 hover:bg-blue-700 transition duration-300"
          >
            Pengawasan Events
          </router-link>
        </li>
        <li>
          <router-link 
            to="/bpa/event-bpa" 
            :class="isActive('/bpa/event-bpa')"
            class="block px-4 py-2 hover:bg-blue-700 transition duration-300"
          >
            Event BPA
          </router-link>
        </li>
      </ul>
    </aside>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  
  const isActive = (path) => {
    return route.path === path ? "bg-blue-700 font-bold" : "";
  };
  </script>
  
  <style scoped>
  a {
    text-decoration: none;
  }
  </style>
  