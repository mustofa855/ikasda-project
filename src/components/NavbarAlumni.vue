<template>
  <nav class="bg-ikasda-primary text-white p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <div class="text-lg font-bold">
        <router-link to="/alumni">Ikatan Alumni</router-link>
      </div>

      <!-- Menu Items -->
      <ul class="flex space-x-6">
        <li>
          <router-link to="/alumni" :class="isActive('/alumni')">Dashboard</router-link>
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
          <router-link to="/alumni/news" :class="isActive('/alumni/news')">
            Berita
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

      <!-- Profile Photo & Username with Dropdown -->
      <div ref="profileMenuRef" class="relative">
        <button @click="toggleProfileMenu" class="focus:outline-none flex items-center">
          <img
            :src="profilePhoto"
            alt="Profile Photo"
            class="w-10 h-10 rounded-full border-2 border-white"
          />
          <span class="ml-2">{{ username }}</span>
        </button>

        <!-- Dropdown Menu -->
        <div v-if="showProfileMenu" class="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
          <ul>
            <li>
              <router-link @click="closeMenu" to="/alumni/profile-alumni" class="block px-4 py-2 hover:bg-gray-100">
                Edit Profile
              </router-link>
            </li>
            <li>
              <button @click="handleLogoutClick" class="w-full text-left px-4 py-2 hover:bg-gray-100">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

// Fungsi untuk cek apakah path aktif
const isActive = (path) => {
  return route.path === path
    ? "text-white font-bold border-b-2 border-white"
    : "hover:text-gray-200";
};

// State untuk dropdown
const showProfileMenu = ref(false);
const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value;
};
const closeMenu = () => {
  showProfileMenu.value = false;
};

// Ref untuk container dropdown guna mendeteksi klik di luar
const profileMenuRef = ref(null);
const handleClickOutside = (event) => {
  if (profileMenuRef.value && !profileMenuRef.value.contains(event.target)) {
    closeMenu();
  }
};

// Data profil (foto dan username)
const userProfile = ref({
  fotoProfil: "",
  username: ""
});

// Mengambil data profil dari API
const loadProfile = () => {
  const token = localStorage.getItem("access_token");
  axios
    .get("/api/my-profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const data = response.data;
      if (data.fotoProfil) {
        userProfile.value.fotoProfil = data.fotoProfil;
      }
      // Ubah pengecekan dari data.username menjadi data.name
      if (data.name) {
        userProfile.value.username = data.name;
      }
    })
    .catch((error) => {
      console.error("Error loading profile in navbar:", error);
    });
};

onMounted(() => {
  loadProfile();
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Computed untuk menampilkan foto dan username
const profilePhoto = computed(() => userProfile.value.fotoProfil || "https://via.placeholder.com/150");
const username = computed(() => userProfile.value.username || "User");

// Fungsi Logout dengan konfirmasi
const handleLogoutClick = () => {
  closeMenu();
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
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      Swal.fire({
        title: "Logout Berhasil",
        text: "Anda harus login kembali",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        router.push("/login");
      });
    }
  });
};
</script>

<style scoped>
/* Tambahan style jika dibutuhkan */
</style>
