<template>
    <nav class="sticky top-0 bg-ikasda-primary shadow-lg">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between items-center py-4">
                <!-- Logo Ikasda -->
                <router-link to="/" class="flex items-center cursor-pointer">
                    <img src="@/assets/img/ikasda_logo.svg" alt="Logo Ikasda" class="w-15 h-10 mr-2 scale-125" />
                    <h1 class="text-lg text-white">IKASDA</h1>
                </router-link>
                <!-- Navbar Links -->
                <ul class="flex space-x-4">
                    <li>
                        <router-link to="/" :class="isActive('/')">Home</router-link>
                    </li>
                    <li>
                        <router-link to="/about" :class="isActive('/about')">About</router-link>
                    </li>
                    <li>
                        <router-link to="/blog" :class="isActive('/blog')">Berita</router-link>
                    </li>
                    <li>
                        <router-link to="/events" :class="isActive('/events')">Events</router-link>
                    </li>
                    <li>
                        <router-link to="/gallery" :class="isActive('/gallery')">Gallery</router-link>
                    </li>
                    <!-- Tombol Akses Dashboard -->
                    <li v-if="!isLoginPage">
                        <router-link to="/login" class="text-gray-800 bg-white hover:text-white px-4 py-2 rounded-lg hover:bg-ikasda-secondary transition duration-300">
                            Login
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isLoginPage = computed(() => route.path === '/login')

// Fungsi untuk menentukan kelas aktif berdasarkan path
const isActive = (path) => {
    return route.path === path
        ? 'text-white font-bold border-b-2 border-white transition duration-800'
        : 'text-gray-400 hover:text-gray-200'
}
</script>
