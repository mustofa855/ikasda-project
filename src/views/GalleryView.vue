<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- Hero Section -->
    <section class="bg-ikasda-primary text-white py-20 text-center">
      <h1 class="text-4xl font-bold mb-4">Galeri Album</h1>
      <p class="text-lg max-w-3xl mx-auto">
        Pilih album untuk melihat koleksi foto.
      </p>
    </section>

    <!-- Gallery Albums Section -->
    <section class="py-16 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-semibold text-center mb-10">Album Foto</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="album in albums"
            :key="album.id"
            class="bg-gray-50 shadow-lg rounded-lg overflow-hidden"
          >
            <router-link :to="`/gallery/${album.id}`">
              <img
                :src="album.cover_image ? album.cover_image : 'https://via.placeholder.com/400x300'"
                alt="Album Cover"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h3 class="text-lg font-semibold hover:underline">{{ album.title }}</h3>
                <p class="text-gray-600 text-sm">
                  {{ album.description ? album.description : 'Deskripsi tidak tersedia.' }}
                </p>
              </div>
            </router-link>
          </div>
          <div v-if="albums.length === 0" class="col-span-full text-center text-gray-500">
            Tidak ada album.
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-ikasda-primary text-white py-6 text-center">
      <p>© {{ currentYear }} Ikasda. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GalleryView",
  data() {
    return {
      albums: []
    };
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  },
  mounted() {
    this.fetchAlbums();
  },
  methods: {
    fetchAlbums() {
      axios
        .get("http://127.0.0.1:8000/api/galleryalbums/")
        .then(response => {
          this.albums = response.data;
        })
        .catch(error => {
          console.error("Error fetching albums:", error);
        });
    }
  }
};
</script>

<style scoped>
/* Tambahkan styling tambahan jika diperlukan */
</style>
