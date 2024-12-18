<template>
    <aside class="w-64 bg-gray-800 h-screen text-white fixed">
      <div class="py-4 text-center text-2xl font-bold border-b border-gray-600">
        Dashboard
      </div>
      <ul class="mt-6">
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
  