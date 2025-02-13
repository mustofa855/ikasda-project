<template>
  <div class="min-h-screen flex flex-col">
    <!-- Menampilkan Navbar atau Sidebar sesuai route -->
    <AppNavbar v-if="currentLayout === 'umum'" />
    <NavbarAlumni v-else-if="currentLayout === 'alumni'" />
    <AppSidebar v-else-if="currentLayout === 'direksi'" />
    <BpaSidebar v-else-if="currentLayout === 'bpa'" />

    <!-- Konten Halaman -->
    <router-view />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

// Impor komponen layout
import AppNavbar from '@/components/AppNavbar.vue';
import NavbarAlumni from '@/components/NavbarAlumni.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import BpaSidebar from '@/components/BpaSidebar.vue';

const route = useRoute();

// Ambil layout berdasarkan meta di route, fallback ke 'umum'
const currentLayout = computed(() => route.meta.layout || 'umum');
</script>

<style scoped>
/* Tambahkan styling global atau layout jika diperlukan */
</style>
