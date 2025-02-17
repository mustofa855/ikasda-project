<template>
  <div class="ml-64 p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Manajemen Album Gallery</h1>

    <!-- Form Tambah Album -->
    <div class="mb-6 bg-white p-6 rounded shadow">
      <h2 class="text-xl font-semibold mb-4">Tambah Album Baru</h2>
      <form @submit.prevent="createAlbum">
        <div class="mb-4">
          <label for="title" class="block text-gray-700">Judul Album</label>
          <input
            type="text"
            id="title"
            v-model="newAlbum.title"
            placeholder="Masukkan judul album"
            class="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-gray-700">Deskripsi</label>
          <textarea
            id="description"
            v-model="newAlbum.description"
            placeholder="Masukkan deskripsi album (opsional)"
            class="w-full border border-gray-300 p-2 rounded"
            rows="3"
          ></textarea>
        </div>
        <div class="mb-4">
          <label for="cover" class="block text-gray-700">Unggah Cover Album</label>
          <input
            type="file"
            id="cover"
            @change="handleCoverUpload"
            accept="image/*"
            class="w-full"
            required
          />
        </div>
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Tambah Album
        </button>
      </form>
    </div>

    <!-- Form Tambah Foto ke Album -->
    <div class="mb-6 bg-white p-6 rounded shadow" v-if="selectedAlbum">
      <h2 class="text-xl font-semibold mb-4">Tambah Foto ke Album: {{ selectedAlbum.title }}</h2>
      <form @submit.prevent="uploadImages">
        <div class="mb-4">
          <label for="images" class="block text-gray-700">Unggah Foto (bisa pilih banyak)</label>
          <input
            type="file"
            id="images"
            @change="handleImagesUpload"
            accept="image/*"
            multiple
            class="w-full"
            required
          />
        </div>
        <button
          type="submit"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Unggah Foto
        </button>
      </form>
    </div>

    <!-- Daftar Album -->
    <div class="bg-white p-6 rounded shadow">
      <h2 class="text-xl font-semibold mb-4">Daftar Album</h2>
      <div v-if="albumList.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="album in albumList"
          :key="album.id"
          class="relative border rounded overflow-hidden shadow hover:shadow-lg transition"
        >
          <!-- Tombol menu titik tiga -->
          <button
            @click.stop="toggleDropdown(album.id)"
            class="absolute top-2 right-2 text-gray-600 bg-white px-2 rounded hover:text-gray-800 focus:outline-none z-20 dropdown-button"
          >
            ⋮
          </button>
          <!-- Dropdown menu -->
          <div
            v-if="openDropdownId === album.id"
            class="absolute top-8 right-2 bg-white border rounded shadow z-20 dropdown-menu"
          >
            <button
              @click="handleEdit(album)"
              class="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              @click="handleDelete(album.id)"
              class="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Hapus
            </button>
          </div>

          <img
            :src="album.cover_image ? album.cover_image : 'https://via.placeholder.com/400x300'"
            alt="Album Cover"
            class="w-full h-48 object-cover cursor-pointer"
            @click="selectAlbum(album)"
          />
          <div class="p-4">
            <h3
              class="text-lg font-bold cursor-pointer hover:underline"
              @click="selectAlbum(album)"
            >
              {{ album.title }}
            </h3>
            <p class="text-gray-600 text-sm mb-2">
              {{ album.description ? album.description : 'Deskripsi tidak tersedia.' }}
            </p>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">
        Tidak ada album.
      </div>
    </div>

    <!-- Modal untuk mengelola foto dalam album -->
    <ManageAlbumModal
      v-if="showModal"
      :album="selectedAlbum"
      :show="showModal"
      @close="closeModal"
    />
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import ManageAlbumModal from "@/components/ManageAlbumModal.vue";

export default {
  name: "ManagementGallery",
  components: { ManageAlbumModal },
  data() {
    return {
      newAlbum: {
        title: "",
        description: "",
        cover_image: null,
      },
      albumList: [],
      selectedAlbum: null,
      newImages: [],
      showModal: false,
      openDropdownId: null,
    };
  },
  mounted() {
    this.fetchAlbums();
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    fetchAlbums() {
      const token = localStorage.getItem("access_token");
      axios
        .get("http://127.0.0.1:8000/api/galleryalbums/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.albumList = response.data;
        })
        .catch((error) => {
          console.error("Error fetching albums:", error);
        });
    },
    handleCoverUpload(event) {
      this.newAlbum.cover_image = event.target.files[0];
    },
    createAlbum() {
      Swal.fire({
        title: "Tambah Album?",
        text: "Pastikan data yang Anda masukkan sudah benar!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, tambahkan!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem("access_token");
          const formData = new FormData();
          formData.append("title", this.newAlbum.title);
          formData.append("description", this.newAlbum.description);
          formData.append("cover_image", this.newAlbum.cover_image);

          axios
            .post("http://127.0.0.1:8000/api/galleryalbums/", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            })
            .then(() => {
              Swal.fire("Berhasil!", "Album berhasil ditambahkan.", "success");
              this.newAlbum = { title: "", description: "", cover_image: null };
              this.fetchAlbums();
            })
            .catch((error) => {
              Swal.fire("Gagal!", "Terjadi kesalahan saat menambahkan album.", "error");
              console.error("Error creating album:", error);
            });
        }
      });
    },
    selectAlbum(album) {
      this.selectedAlbum = album;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedAlbum = null;
      this.openDropdownId = null;
    },
    handleImagesUpload(event) {
      this.newImages = Array.from(event.target.files);
    },
    uploadImages() {
      if (!this.selectedAlbum) {
        Swal.fire("Peringatan", "Pilih album terlebih dahulu.", "warning");
        return;
      }
      if (this.newImages.length === 0) {
        Swal.fire("Peringatan", "Pilih foto yang akan diunggah.", "warning");
        return;
      }
      const token = localStorage.getItem("access_token");
      const formData = new FormData();
      formData.append("album", this.selectedAlbum.id);
      this.newImages.forEach((file) => {
        formData.append("image", file);
      });
      axios
        .post("http://127.0.0.1:8000/api/galleryimages/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          Swal.fire("Berhasil!", "Foto berhasil diunggah.", "success");
          this.newImages = [];
          this.fetchAlbums();
        })
        .catch((error) => {
          Swal.fire("Gagal!", "Terjadi kesalahan saat mengunggah foto.", "error");
          console.error("Error uploading images:", error);
        });
    },
    toggleDropdown(albumId) {
      this.openDropdownId = this.openDropdownId === albumId ? null : albumId;
    },
    handleEdit(album) {
      Swal.fire({
        title: "Edit Album?",
        text: "Apakah Anda ingin mengedit album ini?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya, edit!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.selectedAlbum = album;
          this.showModal = true;
          this.openDropdownId = null;
        }
      });
    },
    handleDelete(albumId) {
      Swal.fire({
        title: "Hapus Album?",
        text: "Apakah Anda yakin ingin menghapus album ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem("access_token");
          axios
            .delete(`http://127.0.0.1:8000/api/galleryalbums/${albumId}/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(() => {
              Swal.fire("Berhasil!", "Album telah dihapus.", "success");
              this.fetchAlbums();
              this.openDropdownId = null;
            })
            .catch((error) => {
              Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus album.", "error");
              console.error("Error deleting album:", error);
            });
        }
      });
    },
    handleClickOutside(event) {
      // Jika klik tidak berada di dalam elemen dengan class dropdown-button atau dropdown-menu, tutup dropdown
      if (!event.target.closest(".dropdown-button") && !event.target.closest(".dropdown-menu")) {
        this.openDropdownId = null;
      }
    },
  },
};
</script>

<style scoped>
/* Tambahkan styling tambahan jika diperlukan */
</style>
