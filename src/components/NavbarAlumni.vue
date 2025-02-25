<template>
  <nav class="bg-ikasda-primary text-white p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo Ikasda -->
      <router-link to="/" class="flex items-center cursor-pointer">
        <img src="@/assets/img/ikasda_logo.svg" alt="Logo Ikasda" class="w-15 h-10 mr-2 scale-125" />
        <h1 class="text-lg text-white">IKASDA</h1>
      </router-link>

      <!-- Desktop Menu Items -->
      <ul class="hidden md:flex space-x-6">
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

      <!-- Desktop Profile & Dropdown -->
      <div ref="profileMenuRef" class="hidden md:block relative">
        <button @click="toggleProfileMenu" class="focus:outline-none flex items-center">
          <img :src="profilePhoto" alt="Profile Photo" class="w-10 h-10 rounded-full border-2 border-white" />
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

      <!-- Hamburger Menu Button for Mobile -->
      <div class="md:hidden">
        <button @click="toggleMobileMenu" class="focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="showMobileMenu" class="md:hidden bg-ikasda-primary">
      <ul class="flex flex-col space-y-2 p-4">
        <li>
          <router-link to="/alumni" :class="isActive('/alumni')" @click="toggleMobileMenu">
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link to="/alumni/kesan-pesan" :class="isActive('/alumni/kesan-pesan')" @click="toggleMobileMenu">
            Kesan & Pesan
          </router-link>
        </li>
        <li>
          <router-link to="/alumni/event-alumni" :class="isActive('/alumni/event-alumni')" @click="toggleMobileMenu">
            Event
          </router-link>
        </li>
        <li>
          <router-link to="/alumni/news" :class="isActive('/alumni/news')" @click="toggleMobileMenu">
            Berita
          </router-link>
        </li>
        <li>
          <router-link to="/alumni/donasi" :class="isActive('/alumni/donasi')" @click="toggleMobileMenu">
            Donasi
          </router-link>
        </li>
        <li>
          <router-link to="/alumni/forum-diskusi" :class="isActive('/alumni/forum-diskusi')" @click="toggleMobileMenu">
            Forum Diskusi
          </router-link>
        </li>
        <li>
          <router-link to="/alumni/daftar-alumni" :class="isActive('/alumni/daftar-alumni')" @click="toggleMobileMenu">
            Alumni
          </router-link>
        </li>
        <hr class="border-gray-300 my-2" />
        <!-- Mobile Profile Section -->
        <li>
          <router-link to="/alumni/profile-alumni" class="block text-white" @click="toggleMobileMenu">
            Edit Profile
          </router-link>
        </li>
        <li>
          <button @click="handleLogoutClick" class="w-full text-left text-white">
            Logout
          </button>
        </li>
      </ul>
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

// Fungsi cek path aktif
const isActive = (path) => {
  return route.path === path
    ? "text-white font-bold border-b-2 border-white"
    : "hover:text-gray-200";
};

// Desktop Profile Dropdown
const showProfileMenu = ref(false);
const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value;
};
const closeMenu = () => {
  showProfileMenu.value = false;
};

const profileMenuRef = ref(null);
const handleClickOutside = (event) => {
  if (profileMenuRef.value && !profileMenuRef.value.contains(event.target)) {
    closeMenu();
  }
};

// Data Profil
const userProfile = ref({
  fotoProfil: "",
  username: ""
});
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

const profilePhoto = computed(() => userProfile.value.fotoProfil || "https://via.placeholder.com/150");
const username = computed(() => userProfile.value.username || "User");

// Logout dengan konfirmasi
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

// Mobile Menu
const showMobileMenu = ref(false);
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};
</script>

<style scoped>
/* Anda bisa menambahkan styling tambahan jika diperlukan */
</style>
