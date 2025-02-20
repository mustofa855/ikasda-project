<template>
  <nav class="sticky top-0 z-50 bg-ikasda-primary shadow-lg">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <!-- Logo Ikasda -->
        <router-link to="/" class="flex items-center cursor-pointer">
          <img src="@/assets/img/ikasda_logo.svg" alt="Logo Ikasda" class="w-15 h-10 mr-2 scale-125" />
          <h1 class="text-lg text-white">IKASDA</h1>
        </router-link>

        <!-- Desktop Navigation -->
        <ul class="hidden md:flex space-x-4">
          <li>
            <router-link to="/" :class="isActive('/')">Home</router-link>
          </li>
          <li>
            <router-link to="/about" :class="isActive('/about')">About</router-link>
          </li>
          <li>
            <router-link to="/news" :class="isActive('/news')">Berita</router-link>
          </li>
          <li>
            <router-link to="/events" :class="isActive('/events')">Events</router-link>
          </li>
          <li>
            <router-link to="/gallery" :class="isActive('/gallery')">Gallery</router-link>
          </li>
          <li v-if="!isLoginPage">
            <router-link
              to="/login"
              class="text-gray-800 bg-white hover:text-white px-4 py-2 rounded-lg hover:bg-ikasda-secondary transition duration-300"
            >
              Login
            </router-link>
          </li>
        </ul>

        <!-- Mobile Navigation Toggle -->
        <button @click="toggleMenu" class="md:hidden text-white focus:outline-none">
          <svg
            v-if="!isOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu with Transition -->
    <transition name="mobile-menu">
      <div v-if="isOpen" class="md:hidden bg-ikasda-primary">
        <ul class="px-4 pb-4 space-y-2">
          <li>
            <router-link to="/" @click="closeMenu" :class="isActive('/')">Home</router-link>
          </li>
          <li>
            <router-link to="/about" @click="closeMenu" :class="isActive('/about')">About</router-link>
          </li>
          <li>
            <router-link to="/news" @click="closeMenu" :class="isActive('/news')">Berita</router-link>
          </li>
          <li>
            <router-link to="/events" @click="closeMenu" :class="isActive('/events')">Events</router-link>
          </li>
          <li>
            <router-link to="/gallery" @click="closeMenu" :class="isActive('/gallery')">Gallery</router-link>
          </li>
          <li v-if="!isLoginPage">
            <router-link
              to="/login"
              @click="closeMenu"
              class="block text-gray-800 bg-white hover:text-white px-4 py-2 rounded-lg hover:bg-ikasda-secondary transition duration-300"
            >
              Login
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isLoginPage = computed(() => route.path === '/login')
const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

// Fungsi untuk menentukan kelas aktif berdasarkan path
const isActive = (path) => {
  return route.path === path
    ? 'text-white font-bold border-b-2 border-white transition duration-800'
    : 'text-gray-400 hover:text-gray-200'
}
</script>

<style scoped>
/* Transition untuk menu mobile */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.mobile-menu-enter-to,
.mobile-menu-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
