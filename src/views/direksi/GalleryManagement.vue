<template>
    <div class="ml-64 p-6">
      <h1 class="text-3xl font-bold mb-6 text-center">Manajemen Gallery</h1>
      
      <!-- Form Tambah Gallery -->
      <div class="mb-6 bg-white p-6 rounded shadow">
        <h2 class="text-xl font-semibold mb-4">Tambah Gallery Baru</h2>
        <form @submit.prevent="createGallery">
          <div class="mb-4">
            <label for="title" class="block text-gray-700">Judul</label>
            <input 
              type="text" 
              id="title" 
              v-model="newGallery.title" 
              placeholder="Masukkan judul gambar"
              class="w-full border border-gray-300 p-2 rounded" 
              required
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700">Deskripsi</label>
            <textarea 
              id="description" 
              v-model="newGallery.description" 
              placeholder="Masukkan deskripsi gambar (opsional)"
              class="w-full border border-gray-300 p-2 rounded" 
              rows="3"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="image" class="block text-gray-700">Unggah Gambar</label>
            <input 
              type="file" 
              id="image" 
              @change="handleImageUpload" 
              accept="image/*"
              class="w-full" 
              required
            />
          </div>
          <button 
            type="submit" 
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Tambah Gallery
          </button>
        </form>
      </div>
  
      <!-- Daftar Gallery -->
      <div class="bg-white p-6 rounded shadow">
        <h2 class="text-xl font-semibold mb-4">Daftar Gallery</h2>
        <div v-if="galleryList.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="item in galleryList"
            :key="item.id"
            class="border rounded overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              :src="item.image ? item.image : 'https://via.placeholder.com/400x300'"
              alt="Gallery Image"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <h3 class="text-lg font-bold">{{ item.title }}</h3>
              <p class="text-gray-600 text-sm mb-2">
                {{ item.description }}
              </p>
              <div class="flex justify-between">
                <button
                  @click="editGallery(item)"
                  class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  @click="deleteGallery(item.id)"
                  class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center text-gray-500">
          Tidak ada data gallery.
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  
  export default {
    name: "ManajemenGallery",
    data() {
      return {
        newGallery: {
          title: "",
          description: "",
          image: null
        },
        galleryList: []
      };
    },
    mounted() {
      this.fetchGallery();
    },
    methods: {
      fetchGallery() {
        const token = localStorage.getItem("access_token");
        axios
          .get("http://127.0.0.1:8000/api/gallery/", {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
          .then(response => {
            this.galleryList = response.data;
          })
          .catch(error => {
            console.error("Error fetching gallery:", error);
          });
      },
      handleImageUpload(event) {
        this.newGallery.image = event.target.files[0];
      },
      createGallery() {
        Swal.fire({
          title: "Tambah Gallery?",
          text: "Pastikan data yang Anda masukkan sudah benar!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya, tambahkan!",
          cancelButtonText: "Batal"
        }).then(result => {
          if (result.isConfirmed) {
            const token = localStorage.getItem("access_token");
            const formData = new FormData();
            formData.append("title", this.newGallery.title);
            formData.append("description", this.newGallery.description);
            formData.append("image", this.newGallery.image);
            
            axios
              .post("http://127.0.0.1:8000/api/gallery/", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  "Authorization": `Bearer ${token}`
                }
              })
              .then(response => {
                Swal.fire("Berhasil!", "Gallery berhasil ditambahkan.", "success");
                this.newGallery = { title: "", description: "", image: null };
                this.fetchGallery();
              })
              .catch(error => {
                Swal.fire("Gagal!", "Terjadi kesalahan saat menambahkan gallery.", "error");
                console.error("Error creating gallery:", error);
              });
          }
        });
      },
      editGallery(item) {
        Swal.fire("Info", "Fitur edit belum diimplementasikan.", "info");
      },
      deleteGallery(id) {
        Swal.fire({
          title: "Hapus Gallery?",
          text: "Apakah Anda yakin ingin menghapus gallery ini?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya, hapus!",
          cancelButtonText: "Batal"
        }).then(result => {
          if (result.isConfirmed) {
            const token = localStorage.getItem("access_token");
            axios.delete(`http://127.0.0.1:8000/api/gallery/${id}/`, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            })
            .then(response => {
              Swal.fire("Berhasil!", "Gallery telah dihapus.", "success");
              this.fetchGallery();
            })
            .catch(error => {
              Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus gallery.", "error");
              console.error("Error deleting gallery:", error);
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
  