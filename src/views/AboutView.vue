<template>
  <div class="bg-gray-100">
    <!-- Hero Section -->
    <section class="bg-ikasda-primary text-white py-20 text-center">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold mb-4">Tentang Kami</h1>
        <p class="text-lg max-w-3xl mx-auto">
          Ikatan Alumni SMA Kita adalah komunitas alumni yang berdedikasi untuk mempererat hubungan, membangun masa depan bersama, dan memberikan dampak positif bagi sekolah dan masyarakat.
        </p>
      </div>
    </section>

    <!-- Visi dan Misi Section -->
    <section class="py-16 bg-white text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-semibold mb-6">Visi dan Misi</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Visi -->
          <div class="bg-gray-50 p-6 shadow rounded-lg">
            <h3 class="text-xl font-bold mb-4">Visi</h3>
            <p class="text-gray-600">
              Membangun komunitas alumni yang solid, aktif, dan memberikan kontribusi nyata kepada sekolah, alumni, dan masyarakat.
            </p>
          </div>
          <!-- Misi -->
          <div class="bg-gray-50 p-6 shadow rounded-lg">
            <h3 class="text-xl font-bold mb-4">Misi</h3>
            <ul class="list-disc list-inside text-gray-600 text-left">
              <li>Meningkatkan silaturahmi dan komunikasi antar alumni.</li>
              <li>Memfasilitasi kegiatan yang mendukung pengembangan alumni.</li>
              <li>Memberikan bantuan dan dukungan kepada sekolah dan masyarakat.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Struktur Direksi Section -->
    <section class="py-16 bg-gray-50 text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-semibold mb-6">Struktur Direksi</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div v-for="item in direksi" :key="item.id" class="bg-white shadow rounded-lg p-6">
            <h3 class="text-xl font-bold mb-2">{{ item.jabatan }}</h3>
            <p class="text-gray-600">{{ item.nama }}</p>
          </div>
          <div v-if="direksi.length === 0" class="w-full">
            <p class="text-gray-600">Data Direksi belum tersedia.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Struktur BPA Section -->
    <section class="py-16 bg-white text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-semibold mb-6">Badan Pengawas Alumni (BPA)</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div v-for="item in bpa" :key="item.id" class="bg-gray-50 shadow rounded-lg p-6">
            <h3 class="text-xl font-bold mb-2">{{ item.jabatan }}</h3>
            <p class="text-gray-600">{{ item.nama }}</p>
          </div>
          <div v-if="bpa.length === 0" class="w-full">
            <p class="text-gray-600">Data BPA belum tersedia.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-ikasda-primary text-white py-6 text-center">
      <div class="container mx-auto px-4">
        <p>© {{ currentYear }} Ikatan Alumni SMA NEGERI 2 LEMBANG. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const currentYear = ref(new Date().getFullYear());
const direksi = ref([]);
const bpa = ref([]);

// Definisikan urutan hierarki untuk Direksi
const direksiOrder = [
  "Ketua",
  "Wakil Ketua",
  "Sekretaris 1",
  "Sekretaris 2",
  "Bendahara 1",
  "Bendahara 2",
  "Bid. Seni Budaya",
  "Bid. Kaderisasi & Pengembangan SDM",
  "Bid. Ekonomi Kreatif",
  "Bid. Sosial Masyarakat Strategis",
  "Bid. Olahraga",
  "Bid. Hubungan Eksternal",
  "Bid. Lingkungan Hidup",
  "Bid. Media Kreatif"
];

// Definisikan urutan hierarki untuk BPA
const bpaOrder = [
  "Ketua BPA",
  "Wakil Ketua BPA",
  "Sekretaris BPA",
  "Peng. Sekretaris dan Bendahara",
  "Peng. Sosial Politik",
  "Peng. Komunikasi dan Informasi",
  "Peng. Ketua Angkatan",
  "Peng. Keorganisasian"
];

const fetchData = async () => {
  try {
    // Ambil data Direksi
    const direksiRes = await axios.get('/api/direksi/');
    direksi.value = direksiRes.data.sort((a, b) => {
      const indexA = direksiOrder.indexOf(a.jabatan);
      const indexB = direksiOrder.indexOf(b.jabatan);
      return (indexA !== -1 ? indexA : 999) - (indexB !== -1 ? indexB : 999);
    });

    // Ambil data BPA
    const bpaRes = await axios.get('/api/bpa/');
    bpa.value = bpaRes.data.sort((a, b) => {
      const indexA = bpaOrder.indexOf(a.jabatan);
      const indexB = bpaOrder.indexOf(b.jabatan);
      return (indexA !== -1 ? indexA : 999) - (indexB !== -1 ? indexB : 999);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
});
</script>


<style>
/* Tambahkan styling tambahan jika diperlukan */
</style>
