<template>
  <div class="bg-gray-100">
    <!-- Hero Section -->
    <section class="bg-ikasda-primary text-white py-20 text-center">
      <h1 class="text-4xl font-bold mb-4">
        Selamat Datang di Website Ikatan Alumni SMA NEGERI 2 LEMBANG
      </h1>
      <p class="text-lg max-w-2xl mx-auto">
        Menyatukan alumni, menyambung silaturahmi, dan membangun masa depan bersama.
      </p>
      <p class="text-lg text-white mb-2">
        Yuk, login ke akun alumni kamu untuk melihat berita, event, dan galeri komunitas alumni!
      </p>
      <router-link to="/about">
        <button class="mt-2 px-8 py-2 bg-white text-ikasda-primary font-semibold rounded-md shadow hover:bg-gray-200">
          Pelajari Lebih Lanjut
        </button>
      </router-link>
    </section>

    <!-- Berita Terkini -->
    <section class="py-10 px-6">
      <h2 class="text-3xl font-semibold mb-6 text-center">Berita Terkini</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="(item, index) in berita" :key="item.id" class="bg-white shadow rounded p-4">
          <img :src="item.image ? item.image : 'https://via.placeholder.com/400x300'" alt="Thumbnail Berita"
            class="w-full h-48 object-cover mb-4 rounded" />
          <h3 class="text-xl font-bold mb-2">{{ item.title }}</h3>
          <p class="text-gray-700 mb-2">
            {{ item.excerpt ? item.excerpt : item.content.substring(0, 100) + '...' }}
          </p>
          <router-link :to="`/news/${item.id}`" class="text-blue-600 hover:underline font-semibold">
            Baca Selengkapnya
          </router-link>
        </div>
        <div v-if="berita.length === 0" class="col-span-full text-center text-gray-500">
          Tidak ada berita untuk ditampilkan.
        </div>
      </div>
    </section>

    <!-- Event Mendatang -->
    <section class="py-10 px-6 bg-gray-100">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-semibold text-center mb-10">Event Mendatang</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <EventCard v-for="(event, index) in events" :key="event.id" :title="event.title"
            :date="formatDate(event.start_date)" :location="event.location" />
        </div>
      </div>
    </section>

    <!-- Tentang Kami Section -->
    <section class="py-16 px-4 bg-white text-center">
      <h2 class="text-3xl font-semibold mb-6">Tentang Kami</h2>
      <p class="text-gray-600 max-w-3xl mx-auto">
        Ikatan Alumni SMA ini dibentuk untuk mempererat hubungan antar alumni,
        berbagi pengalaman, dan menciptakan kolaborasi yang berdampak positif
        bagi masyarakat dan sekolah kita tercinta.
      </p>
    </section>

    <!-- Event Section (Static Contoh) -->
    <section class="py-16 bg-gray-50 text-center">
      <h2 class="text-3xl font-semibold mb-6">Event Mendatang</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <!-- Card 1 -->
        <div class="bg-white shadow rounded-lg p-6">
          <h3 class="text-xl font-bold mb-2">Reuni Akbar 2024</h3>
          <p class="text-gray-600">Tanggal: 10 Juli 2024</p>
          <p class="text-gray-600">Lokasi: Aula SMA Kita</p>
          <button class="mt-4 px-6 py-2 bg-ikasda-primary text-white font-semibold rounded-md hover:bg-blue-700">
            Detail
          </button>
        </div>
        <!-- Card 2 -->
        <div class="bg-white shadow rounded-lg p-6">
          <h3 class="text-xl font-bold mb-2">Donasi Pendidikan</h3>
          <p class="text-gray-600">Tanggal: 20 Agustus 2024</p>
          <p class="text-gray-600">Lokasi: Online</p>
          <button class="mt-4 px-6 py-2 bg-ikasda-primary text-white font-semibold rounded-md hover:bg-blue-700">
            Detail
          </button>
        </div>
        <!-- Card 3 -->
        <div class="bg-white shadow rounded-lg p-6">
          <h3 class="text-xl font-bold mb-2">Lomba Olahraga Alumni</h3>
          <p class="text-gray-600">Tanggal: 15 September 2024</p>
          <p class="text-gray-600">Lokasi: Lapangan SMA</p>
          <button class="mt-4 px-6 py-2 bg-ikasda-primary text-white font-semibold rounded-md hover:bg-blue-700">
            Detail
          </button>
        </div>
      </div>
    </section>

    <!-- Pesan Alumni Section (Static) -->
    <section class="py-16 bg-white text-center">
      <h2 class="text-3xl font-semibold mb-6">Kesan dan Pesan Alumni</h2>
      <div class="max-w-4xl mx-auto">
        <blockquote class="text-lg italic text-gray-600">
          "Ikatan Alumni ini memberikan wadah yang luar biasa untuk tetap
          terhubung dan berbagi pengalaman. Saya merasa sangat bersyukur menjadi
          bagian dari komunitas ini."
        </blockquote>
        <p class="text-right mt-4 text-gray-700 font-semibold">
          - Mustofa Firdaus, Angkatan 1 (2017)
        </p>
      </div>
    </section>

    <!-- Pesan Alumni Section (Dinamis, berganti tiap 30 detik dengan efek fade) -->
    <section class="py-16 bg-white text-center">
      <h2 class="text-3xl font-semibold mb-6">Kesan dan Pesan Alumni (Dinamis)</h2>
      <div class="max-w-4xl mx-auto">
        <!-- Bungkus pesan dengan transition. Key dibuat berdasarkan currentFeedbackIndex untuk trigger transisi -->
        <transition name="fade" mode="out-in">
          <div :key="currentFeedbackIndex">
            <blockquote class="text-lg italic text-gray-600">
              "{{ currentFeedback.message }}"
            </blockquote>
            <p class="text-right mt-4 text-gray-700 font-semibold">
              - {{ currentFeedback.full_name }}
            </p>
          </div>
        </transition>
      </div>
    </section>


    <!-- Footer -->
    <footer class="bg-ikasda-primary text-white py-6 text-center">
      <p>© {{ currentYear }} Ikatan Alumni SMA NEGERI 2 LEMBANG. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import EventCard from '@/components/EventCard.vue';

const currentYear = ref(new Date().getFullYear());

// Contoh pengambilan berita (sesuaikan dengan API Anda)
const berita = ref([]);
function fetchBerita() {
  axios.get("http://127.0.0.1:8000/api/news/")
    .then(response => {
      // Misal API mengembalikan array berita
      berita.value = response.data.slice(0, 3);
    })
    .catch(error => {
      console.error("Error fetching news:", error);
    });
}

// Contoh pengambilan event
const events = ref([]);
function fetchEvents() {
  axios.get("http://127.0.0.1:8000/api/events/")
    .then(response => {
      const now = new Date();
      const upcomingEvents = response.data.filter(event => new Date(event.start_date) >= now);
      upcomingEvents.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
      events.value = upcomingEvents.slice(0, 3);
    })
    .catch(error => {
      console.error("Error fetching events:", error);
    });
}

// Logika untuk pesan alumni dinamis
const apiFeedbacks = ref([]);
const currentFeedbackIndex = ref(0);
const currentFeedback = computed(() => {
  if (apiFeedbacks.value.length === 0) return { message: "", full_name: "" };
  return apiFeedbacks.value[currentFeedbackIndex.value];
});

function fetchFeedbacks() {
  axios.get("http://127.0.0.1:8000/api/feedbacks/")
    .then(response => {
      apiFeedbacks.value = response.data;
    })
    .catch(error => {
      console.error("Error fetching feedbacks:", error);
    });
}

let intervalId = null;
onMounted(() => {
  fetchBerita();
  fetchEvents();
  fetchFeedbacks();
  intervalId = setInterval(() => {
    if (apiFeedbacks.value.length > 0) {
      currentFeedbackIndex.value = (currentFeedbackIndex.value + 1) % apiFeedbacks.value.length;
    }
  }, 10000); // Ganti pesan setiap 10 detik
});
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});

function formatDate(dateStr) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateStr).toLocaleDateString(undefined, options);
}
</script>

<style scoped>
/* Tambahkan styling tambahan jika diperlukan */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
