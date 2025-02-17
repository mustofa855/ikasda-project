<template>
    <div class="min-h-screen bg-gray-100 p-4">
      <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 class="text-3xl font-bold mb-4">{{ album.title }}</h1>
        <p class="text-gray-600 mb-4">
          {{ album.description ? album.description : "Deskripsi tidak tersedia." }}
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="image in album.images"
            :key="image.id"
            class="relative group"
          >
            <img
              :src="image.image"
              alt="Gallery Image"
              class="w-full h-48 object-cover cursor-pointer"
              @click="openLightbox(image.image)"
            />
            <div
              class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              style="pointer-events: none;"
            >
              <span class="text-white text-lg">Zoom</span>
            </div>
          </div>
        </div>
        <div class="mt-6 text-center">
          <button
            @click="goBack"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Kembali ke Album
          </button>
        </div>
      </div>
      
      <!-- Lightbox Modal -->
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      >
        <div class="relative">
          <img
            :src="currentImage"
            alt="Zoomed Image"
            class="max-w-full max-h-screen transition-transform duration-300"
            :style="{ transform: 'scale(' + zoomLevel + ')' }"
          />
          <button
            @click="closeLightbox"
            class="absolute top-2 right-2 text-white text-2xl"
          >&times;</button>
          <!-- Zoom & Download Controls -->
          <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
            <button
              @click="zoomOut"
              class="bg-gray-700 text-white px-3 py-1 rounded"
            >-</button>
            <span class="text-white">{{ zoomLevel.toFixed(1) }}x</span>
            <button
              @click="zoomIn"
              class="bg-gray-700 text-white px-3 py-1 rounded"
            >+</button>
            <button
              @click="downloadImage"
              class="bg-blue-600 text-white px-3 py-1 rounded"
            >Download</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name: "DetailGallery",
    data() {
      return {
        album: {},
        lightboxOpen: false,
        currentImage: "",
        zoomLevel: 1,
      };
    },
    mounted() {
      this.fetchAlbumDetail();
    },
    methods: {
      fetchAlbumDetail() {
        const id = this.$route.params.id;
        axios
          .get(`http://127.0.0.1:8000/api/galleryalbums/${id}/`)
          .then((response) => {
            this.album = response.data;
          })
          .catch((error) => {
            console.error("Error fetching album detail:", error);
          });
      },
      openLightbox(imageUrl) {
        this.currentImage = imageUrl;
        this.zoomLevel = 1; // Reset zoom saat membuka gambar baru
        this.lightboxOpen = true;
      },
      closeLightbox() {
        this.lightboxOpen = false;
        this.currentImage = "";
      },
      zoomIn() {
        this.zoomLevel += 0.2;
      },
      zoomOut() {
        if (this.zoomLevel > 0.4) {
          this.zoomLevel -= 0.2;
        }
      },
      downloadImage() {
        axios
          .get(this.currentImage, { responseType: 'blob' })
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            const urlParts = this.currentImage.split("/");
            link.setAttribute("download", urlParts[urlParts.length - 1] || "download.jpg");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          })
          .catch((error) => {
            console.error("Error downloading image:", error);
          });
      },
      goBack() {
        this.$router.push("/gallery");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Tambahkan styling tambahan jika diperlukan */
  </style>
  