<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black opacity-50" @click="close"></div>
      <!-- Modal Content -->
      <div class="bg-white p-6 rounded-lg shadow-lg z-10 w-11/12 md:w-3/4 lg:w-1/2 overflow-y-auto max-h-screen">
        
        <!-- Modal Header -->
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">Edit Album</h2>
          <button @click="close" class="text-gray-500 hover:text-gray-700 text-2xl leading-none">&times;</button>
        </div>
  
        <!-- Cover Album -->
        <div class="mb-4">
          <img 
            :src="coverPreview ? coverPreview : (editAlbum.cover_image ? editAlbum.cover_image : 'https://via.placeholder.com/600x400')"
            alt="Album Cover" 
            class="w-full h-64 object-cover rounded"
          />
        </div>
  
        <!-- Form Edit Album Details -->
        <form @submit.prevent="updateAlbum" class="mb-6">
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Judul Album</label>
            <input type="text" v-model="editAlbum.title" class="w-full border border-gray-300 p-2 rounded" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Deskripsi Album</label>
            <textarea v-model="editAlbum.description" rows="3" class="w-full border border-gray-300 p-2 rounded"></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Ubah Cover Album</label>
            <input type="file" @change="handleCoverChange" accept="image/*" class="w-full" />
            <!-- Preview Cover Baru -->
            <div v-if="coverPreview" class="mt-2">
              <p class="text-gray-600 text-sm mb-1">Preview Cover Baru:</p>
              <img :src="coverPreview" alt="Cover Preview" class="w-full h-64 object-cover rounded" />
            </div>
          </div>
          <div class="flex justify-end">
            <button 
              type="submit"
              :disabled="!newCoverFile"
              :class="[
                'px-4 py-2 rounded transition',
                !newCoverFile 
                  ? 'bg-blue-600 opacity-50 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              ]"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
  
        <!-- Daftar Foto dalam Album -->
        <div>
          <h3 class="text-xl font-semibold mb-4">Foto dalam Album</h3>
          <div v-if="images.length" class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div v-for="image in images" :key="image.id" class="relative group">
              <img :src="image.image" alt="Gallery Image" class="w-full h-32 object-cover rounded" />
              <button 
                @click="deleteImage(image.id)" 
                class="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition"
              >
                Hapus
              </button>
            </div>
          </div>
          <div v-else class="text-gray-500 mb-4">Belum ada foto dalam album ini.</div>
        </div>
  
        <!-- Unggah Foto Baru -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Unggah Foto Baru</label>
          <input type="file" multiple @change="handleFileSelection" class="w-full" accept="image/*" />
        </div>
        <!-- Preview Gambar yang Akan Diupload -->
        <div v-if="selectedFilesPreview.length" class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div v-for="(src, index) in selectedFilesPreview" :key="index" class="border rounded overflow-hidden">
            <img :src="src" alt="Preview Image" class="w-full h-32 object-cover" />
          </div>
        </div>
    
        <div class="flex justify-end">
          <button 
            @click="uploadImages" 
            :disabled="!selectedFiles.length"
            :class="[
              'px-4 py-2 rounded transition mr-2',
              !selectedFiles.length 
                ? 'bg-green-600 opacity-50 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            ]"
          >
            Unggah Foto
          </button>
          <button @click="close" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            Tutup
          </button>
        </div>
        
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  export default {
    name: "ManageAlbumModal",
    props: {
      album: { type: Object, required: true },
      show: { type: Boolean, default: false }
    },
    data() {
      return {
        editAlbum: {
          title: "",
          description: "",
          cover_image: ""
        },
        newCoverFile: null,
        coverPreview: "",
        images: [],
        selectedFiles: []
      };
    },
    computed: {
      selectedFilesPreview() {
        return this.selectedFiles.map(file => URL.createObjectURL(file));
      }
    },
    watch: {
      album: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            // Populate form data with album data
            this.editAlbum.title = newVal.title;
            this.editAlbum.description = newVal.description;
            this.editAlbum.cover_image = newVal.cover_image; // Pastikan properti cover_image ada
            this.coverPreview = ""; // Reset preview cover
            this.fetchImages();
          }
        }
      }
    },
    methods: {
      close() {
        this.$emit("close");
        // Reset selected files dan cover file
        this.selectedFiles = [];
        this.newCoverFile = null;
        this.coverPreview = "";
      },
      fetchImages() {
        const token = localStorage.getItem("access_token");
        axios
          .get(`http://127.0.0.1:8000/api/galleryimages/?album=${this.album.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(response => {
            this.images = response.data;
          })
          .catch(error => {
            console.error("Error fetching images:", error);
          });
      },
      handleCoverChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.newCoverFile = file;
          this.coverPreview = URL.createObjectURL(file);
        }
      },
      updateAlbum() {
        const token = localStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("title", this.editAlbum.title);
        formData.append("description", this.editAlbum.description);
        if (this.newCoverFile) {
          formData.append("cover_image", this.newCoverFile);
        }
        axios
          .patch(`http://127.0.0.1:8000/api/galleryalbums/${this.album.id}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            }
          })
          .then(() => {
            Swal.fire("Berhasil!", "Album berhasil diperbarui.", "success");
            // Jika ada cover baru, update editAlbum.cover_image (atau refresh data)
            if (this.newCoverFile) {
              this.editAlbum.cover_image = this.coverPreview;
            }
          })
          .catch(error => {
            Swal.fire("Gagal!", "Terjadi kesalahan saat memperbarui album.", "error");
            console.error("Error updating album:", error);
          });
      },
      handleFileSelection(event) {
        this.selectedFiles = Array.from(event.target.files);
      },
      uploadImages() {
        if (!this.selectedFiles.length) {
          Swal.fire("Peringatan", "Pilih foto yang akan diunggah.", "warning");
          return;
        }
        const token = localStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("album", this.album.id);
        this.selectedFiles.forEach(file => {
          formData.append("image", file);
        });
        axios
          .post("http://127.0.0.1:8000/api/galleryimages/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            }
          })
          .then(() => {
            Swal.fire("Berhasil!", "Foto berhasil diunggah.", "success");
            this.selectedFiles = [];
            this.fetchImages();
          })
          .catch(error => {
            Swal.fire("Gagal!", "Terjadi kesalahan saat mengunggah foto.", "error");
            console.error("Error uploading images:", error);
          });
      },
      deleteImage(imageId) {
        Swal.fire({
          title: "Hapus Foto?",
          text: "Apakah Anda yakin ingin menghapus foto ini?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya, hapus!",
          cancelButtonText: "Batal",
        }).then(result => {
          if (result.isConfirmed) {
            const token = localStorage.getItem("access_token");
            axios
              .delete(`http://127.0.0.1:8000/api/galleryimages/${imageId}/`, {
                headers: { Authorization: `Bearer ${token}` }
              })
              .then(() => {
                Swal.fire("Berhasil!", "Foto telah dihapus.", "success");
                this.fetchImages();
              })
              .catch(error => {
                Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus foto.", "error");
                console.error("Error deleting image:", error);
              });
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Tambahkan styling tambahan jika diperlukan */
  </style>
  