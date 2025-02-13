<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- Hero Section -->
    <section class="bg-ikasda-primary text-white py-20 text-center">
      <h1 class="text-4xl font-bold mb-4">Galeri Dokumentasi</h1>
      <p class="text-lg max-w-3xl mx-auto">
        Dokumentasi foto dan video dari acara alumni.
      </p>
    </section>

    <!-- Gallery Section -->
    <section class="py-16 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-semibold text-center mb-10">Foto & Video</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Render gallery items dari API -->
          <div
            v-for="item in galleries"
            :key="item.id"
            class="bg-gray-50 shadow-lg rounded-lg overflow-hidden"
          >
            <img
              :src="item.image ? item.image : 'https://via.placeholder.com/400x300'"
              alt="Gallery Item"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <h3 class="text-lg font-semibold">{{ item.title }}</h3>
              <p class="text-gray-600 text-sm">
                {{ item.description ? item.description : 'Deskripsi tidak tersedia.' }}
              </p>
            </div>
          </div>
          <div v-if="galleries.length === 0" class="col-span-full text-center text-gray-500">
            Tidak ada data galeri.
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-ikasda-primary text-white py-6 text-center">
      <p>© {{ currentYear }} Ikatan Alumni SMA NEGERI 2 LEMBANG. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GalleryView",
  data() {
    return {
      galleries: []
    };
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  },
  mounted() {
    this.fetchGallery();
  },
  methods: {
    fetchGallery() {
      axios
        .get("http://127.0.0.1:8000/api/gallery/")
        .then(response => {
          this.galleries = response.data;
        })
        .catch(error => {
          console.error("Error fetching gallery:", error);
        });
    }
  }
};
</script>

<style scoped>
/* Tambahkan styling tambahan jika diperlukan */
</style>
