<template>
  <nav class="bg-ikasda-primary text-white p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <div class="text-lg font-bold">
        <router-link to="/alumni">
          Ikatan Alumni
        </router-link>
      </div>

      <!-- Menu Items -->
      <ul class="flex space-x-6">
        <li>
          <router-link to="/alumni" :class="isActive('/alumni')">
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link to="/alumni/profile-alumni" :class="isActive('/alumni/profile-alumni')">
            Profil Alumni
          </router-link>
        </li>
        <li>
          <router-link to="/alumni/kesan-pesan" :class="isActive('/alumni/kesan-pesan')">
            Kesan & Pesan
          </router-link>
        </li>
        <li>
          <router-link to="/alumni/event-alumni" :class="isActive('/alumni/event-alumni')">
            Event
          </router-link>
        </li>
        <li>
          <router-link to="/alumni/donasi" :class="isActive('/alumni/donasi')">
            Donasi
          </router-link>
        </li>
        <li>
          <router-link to="/alumni/forum-diskusi" :class="isActive('/alumni/forum-diskusi')">
            Forum Diskusi
          </router-link>
        </li>
        <li>
          <router-link to="/alumni/daftar-alumni" :class="isActive('/alumni/daftar-alumni')">
            Alumni
          </router-link>
        </li>
      </ul>

      <!-- Logout Button -->
      <button
        @click="handleLogout"
        class="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();

// Fungsi untuk mengecek apakah path aktif
const isActive = (path) => {
  return route.path === path
    ? "text-white font-bold border-b-2 border-white"
    : "hover:text-gray-200";
};

// Fungsi Logout dengan konfirmasi SweetAlert2
const handleLogout = () => {
  Swal.fire({
    title: "Konfirmasi Logout",
    text: "Apakah Anda yakin ingin logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Logout",
    cancelButtonText: "Batal"
  }).then((result) => {
    if (result.isConfirmed) {
      // Hapus token dari localStorage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      // Tampilkan notifikasi logout berhasil (opsional)
      Swal.fire({
        title: "Logout Berhasil",
        text: "Anda harus login kembali",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        // Redirect ke halaman login setelah notifikasi
        router.push("/login");
      });
    }
  });
};
</script>

<style scoped>
/* Tambahkan style tambahan jika dibutuhkan */
</style>
