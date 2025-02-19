<template>
  <!-- Sidebar BPA dengan layout flex column; menu di atas dan tombol logout di bawah -->
  <aside class="w-64 bg-blue-800 h-screen text-white fixed flex flex-col justify-between">
    <div>
      <div class="py-4 text-center text-2xl font-bold">
        Dashboard BPA
      </div>
      <ul class="mt-6">
        <li>
          <router-link 
            to="/bpa/" 
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
            class="block px-4 py-2 hover:bg-blue-700 transition"
          >
            Laporan Audit
          </router-link>
        </li>
        <li>
          <router-link 
            to="/bpa/pengawasan-event" 
            :class="isActive('/bpa/pengawasan-event')"
            class="block px-4 py-2 hover:bg-blue-700 transition"
          >
            Pengawasan Event
          </router-link>
        </li>
        <li>
          <router-link 
            to="/bpa/persetujuan-keputusan" 
            :class="isActive('/bpa/persetujuan-keputusan')"
            class="block px-4 py-2 hover:bg-blue-700 transition"
          >
            Persetujuan Keputusan
          </router-link>
        </li>
        <li>
          <router-link 
            to="/bpa/notifikasi" 
            :class="isActive('/bpa/notifikasi')"
            class="block px-4 py-2 hover:bg-blue-700 transition"
          >
            Notifikasi
          </router-link>
        </li>
      </ul>
    </div>
    <!-- Tombol logout di bagian bawah -->
    <div class="py-4 text-center">
      <button
        class="w-12 h-12 rounded-full mx-auto flex items-center justify-center cursor-pointer hover:bg-blue-700 transition"
        @click="handleLogout"
        aria-label="Logout"
      >
        <!-- Ikon logout menggunakan SVG -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-9V5m0 10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 01-2 2v1" />
        </svg>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

// Fungsi untuk menandai menu aktif berdasarkan route saat ini
const isActive = (path) => {
  return route.path === path ? "bg-blue-700 font-bold" : "";
};

// Fungsi logout: meminta konfirmasi, menghapus token, dan mengarahkan ke halaman login
const handleLogout = () => {
  Swal.fire({
    title: 'Apakah anda yakin ingin log out?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, log out',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      // Hapus token dari localStorage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      
      // Arahkan ke halaman login
      router.push('/login');
    }
  });
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
