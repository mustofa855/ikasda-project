<template>
  <div class="min-h-screen flex flex-col">
    <!-- Menampilkan Navbar atau Sidebar sesuai route -->
    <AppNavbar v-if="currentLayout === 'umum'" />
    <NavbarAlumni v-else-if="currentLayout === 'alumni'" />
    <AppSidebar v-else-if="currentLayout === 'direksi'" />

    <!-- Konten Halaman -->
    <router-view />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

// Pastikan impor komponen ini benar
import AppNavbar from '@/components/AppNavbar.vue';
import NavbarAlumni from '@/components/NavbarAlumni.vue';
import AppSidebar from '@/components/AppSidebar.vue';

const route = useRoute();

// Ambil layout berdasarkan meta di route
const currentLayout = computed(() => route.meta.layout || 'umum');
</script>

<style scoped>
/* Tambahkan styling global atau layout jika diperlukan */
</style>
