<template>
  <aside class="w-64 bg-gray-800 h-screen text-white fixed flex flex-col justify-between border-r border-gray-700">
    <div>
      <div class="py-6 text-center text-2xl font-bold border-b border-gray-600">
        Dashboard
      </div>
      <ul class="mt-6 space-y-1">
        <li>
          <router-link 
            to="/direksi" 
            :class="['block px-4 py-2 hover:bg-gray-700 transition rounded', isActive('/direksi')]"
          >
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link 
            to="/direksi/statistic" 
            :class="['block px-4 py-2 hover:bg-gray-700 transition rounded', isActive('/direksi/statistic')]"
          >
            Statistik
          </router-link>
        </li>
        <li>
          <router-link 
            to="/direksi/alumni-management" 
            :class="['block px-4 py-2 hover:bg-gray-700 transition rounded', isActive('/direksi/alumni-management')]"
          >
            Manajemen Alumni
          </router-link>
        </li>
        <li>
          <router-link 
            to="/direksi/gallery-management" 
            :class="['block px-4 py-2 hover:bg-gray-700 transition rounded', isActive('/direksi/gallery-management')]"
          >
            Manajemen Galeri
          </router-link>
        </li>
        <li>
          <router-link 
            to="/direksi/event-management" 
            :class="['block px-4 py-2 hover:bg-gray-700 transition rounded', isActive('/direksi/event-management')]"
          >
            Manajemen Event
          </router-link>
        </li>
        <li>
          <router-link 
            to="/direksi/content-management" 
            :class="['block px-4 py-2 hover:bg-gray-700 transition rounded', isActive('/direksi/content-management')]"
          >
            Manajemen Konten
          </router-link>
        </li>
        <li>
          <router-link 
            to="/direksi/financial-reports" 
            :class="['block px-4 py-2 hover:bg-gray-700 transition rounded', isActive('/direksi/financial-reports')]"
          >
            Laporan Keuangan
          </router-link>
        </li>
        <li>
          <router-link 
            to="/direksi/keputusan-bpa" 
            :class="['block px-4 py-2 hover:bg-gray-700 transition rounded', isActive('/direksi/keputusan-bpa')]"
          >
            Keputusan BPA
          </router-link>
        </li>
        <li>
          <router-link 
            to="/direksi/strategic-decision" 
            :class="['block px-4 py-2 hover:bg-gray-700 transition rounded', isActive('/direksi/strategic-decision')]"
          >
            Keputusan Strategis
          </router-link>
        </li>
        <li>
          <router-link 
            to="/direksi/strategic-reports" 
            :class="['block px-4 py-2 hover:bg-gray-700 transition rounded', isActive('/direksi/strategic-reports')]"
          >
            Laporan Strategis
          </router-link>
        </li>
      </ul>
    </div>
    <!-- Bagian bawah sidebar untuk ikon logout -->
    <div class="py-4 text-center">
      <button 
        class="w-12 h-12 rounded-full mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-700 transition"
        @click="handleLogout"
        aria-label="Logout"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-9V5m0 10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
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

// Fungsi untuk memberikan kelas aktif pada router-link
const isActive = (path) => {
  return route.path === path ? "bg-gray-700 font-bold" : "";
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
      
      // Tampilkan pesan sukses (opsional) dan arahkan ke halaman login
      Swal.fire({
        title: "Berhasil",
        text: "Anda telah log out, anda harus login kembali",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        router.push('/login');
      });
    }
  });
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
