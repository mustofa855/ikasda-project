<template>
  <div class="ml-64 p-6">
    <!-- Form Buat Berita Baru -->
    <div class="bg-white shadow rounded p-6 mb-6">
      <h2 class="text-2xl font-bold mb-4">Buat Berita Baru</h2>
      <form @submit.prevent="createNews">
        <!-- Judul Berita -->
        <div class="mb-4">
          <label for="title" class="block text-gray-700">Judul Berita</label>
          <input
            type="text"
            id="title"
            v-model="form.title"
            placeholder="Masukkan judul berita"
            class="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <!-- Ringkasan -->
        <div class="mb-4">
          <label for="excerpt" class="block text-gray-700">Ringkasan</label>
          <textarea
            id="excerpt"
            v-model="form.excerpt"
            placeholder="Tuliskan ringkasan berita..."
            class="w-full border border-gray-300 p-2 rounded"
            rows="3"
          ></textarea>
        </div>
        <!-- Konten Berita -->
        <div class="mb-4">
          <label for="content" class="block text-gray-700">Konten Berita</label>
          <textarea
            id="content"
            v-model="form.content"
            placeholder="Masukkan konten berita lengkap..."
            class="w-full border border-gray-300 p-2 rounded"
            rows="6"
            required
          ></textarea>
        </div>
        <!-- Kategori -->
        <div class="mb-4">
          <label for="category" class="block text-gray-700">Kategori</label>
          <select
            id="category"
            v-model="form.category"
            class="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="" disabled>-- Pilih Kategori --</option>
            <option value="Pengumuman">Pengumuman</option>
            <option value="Sport">Sport</option>
            <option value="Sosial">Kegiatan Sosial</option>
            <option value="Pendidikan">Pendidikan</option>
            <option value="Hiburan">Hiburan</option>
            <option value="Politik">Politik</option>
            <option value="Ekonomi">Ekonomi</option>
            <option value="Teknologi">Teknologi</option>
            <option value="Kesehatan">Kesehatan</option>
            <option value="Budaya">Budaya</option>
            <option value="Otomotif">Otomotif</option>
          </select>
        </div>
        <!-- Unggah Gambar -->
        <div class="mb-4">
          <label for="image" class="block text-gray-700">Gambar Berita</label>
          <input
            type="file"
            id="image"
            ref="imageInput"
            @change="handleImageUpload"
            class="w-full"
            accept="image/*"
          />
        </div>
        <!-- Tombol Submit -->
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Buat Berita
        </button>
      </form>
    </div>

    <!-- Daftar Berita -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Daftar Berita</h2>
      <div class="grid grid-cols-1 gap-4">
        <div
          v-for="news in newsList"
          :key="news.id"
          class="relative bg-white shadow rounded p-4"
        >
          <!-- Tombol titik tiga di pojok kanan atas -->
          <div class="absolute top-2 right-2">
            <button
              @click="toggleDropdown(news.id)"
              class="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <!-- Icon titik tiga (vertical ellipsis) -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 3a2 2 0 110 4 2 2 0 010-4zm0 7a2 2 0 110 4 2 2 0 010-4z" />
              </svg>
            </button>
            <!-- Dropdown opsi edit/hapus -->
            <div
              v-if="dropdownOpenId === news.id"
              class="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-md z-10"
            >
              <button
                @click="openEditModal(news)"
                class="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                @click="deleteNews(news.id)"
                class="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Hapus
              </button>
            </div>
          </div>
          <h3 class="text-xl font-semibold">{{ news.title }}</h3>
          <p class="text-gray-600 mt-2">{{ news.excerpt }}</p>
          <p class="text-gray-500 text-sm mt-1">{{ news.category }}</p>
        </div>
      </div>
    </div>

    <!-- Modal Edit Berita -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 max-h-[90vh] overflow-y-auto">
        <h2 class="text-2xl font-bold mb-4">Edit Berita</h2>
        <form @submit.prevent="updateNews">
          <div class="mb-4">
            <label for="editTitle" class="block text-gray-700">Judul Berita</label>
            <input
              type="text"
              id="editTitle"
              v-model="editForm.title"
              placeholder="Masukkan judul berita"
              class="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div class="mb-4">
            <label for="editExcerpt" class="block text-gray-700">Ringkasan</label>
            <textarea
              id="editExcerpt"
              v-model="editForm.excerpt"
              placeholder="Tuliskan ringkasan berita"
              class="w-full border border-gray-300 p-2 rounded"
              rows="3"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="editContent" class="block text-gray-700">Konten Berita</label>
            <textarea
              id="editContent"
              v-model="editForm.content"
              placeholder="Masukkan konten berita lengkap..."
              class="w-full border border-gray-300 p-2 rounded"
              rows="6"
              required
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="editCategory" class="block text-gray-700">Kategori</label>
            <select
              id="editCategory"
              v-model="editForm.category"
              class="w-full border border-gray-300 p-2 rounded"
              required
            >
              <option value="" disabled>-- Pilih Kategori --</option>
              <option value="Pengumuman">Pengumuman</option>
              <option value="Sport">Sport</option>
              <option value="Sosial">Kegiatan Sosial</option>
              <option value="Pendidikan">Pendidikan</option>
              <option value="Hiburan">Hiburan</option>
              <option value="Politik">Politik</option>
              <option value="Ekonomi">Ekonomi</option>
              <option value="Teknologi">Teknologi</option>
              <option value="Kesehatan">Kesehatan</option>
              <option value="Budaya">Budaya</option>
              <option value="Otomotif">Otomotif</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="editImage" class="block text-gray-700">Gambar Berita</label>
            <input
              type="file"
              id="editImage"
              @change="handleEditImageUpload"
              class="w-full"
              accept="image/*"
            />
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              @click="closeEditModal"
              class="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "ManajemenBerita",
  data() {
    return {
      // Form buat berita baru
      form: {
        title: "",
        excerpt: "",
        content: "",
        category: "",
        image: null
      },
      // Daftar berita
      newsList: [],
      // Untuk tracking dropdown di tiap card (simpan id berita yang aktif)
      dropdownOpenId: null,
      // Modal edit
      showEditModal: false,
      currentNews: null,
      editForm: {
        title: "",
        excerpt: "",
        content: "",
        category: "",
        image: null
      }
    };
  },
  mounted() {
    this.fetchNews();
  },
  methods: {
    /* ========== Form Buat Berita ========== */
    handleImageUpload(event) {
      this.form.image = event.target.files[0];
    },
    async createNews() {
      const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Pastikan data yang Anda masukkan sudah benar!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, buat berita",
        cancelButtonText: "Periksa lagi"
      });
      if (!result.isConfirmed) return;
  
      const formData = new FormData();
      formData.append("title", this.form.title);
      formData.append("excerpt", this.form.excerpt);
      formData.append("content", this.form.content);
      formData.append("category", this.form.category);
      if (this.form.image) {
        formData.append("image", this.form.image);
      }
  
      try {
        const token = localStorage.getItem("access_token");
        await axios.post("http://127.0.0.1:8000/api/news/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        });
        Swal.fire("Berhasil!", "Berita telah dibuat.", "success");
        this.resetForm();
        this.fetchNews();
      } catch (error) {
        Swal.fire("Gagal!", "Terjadi kesalahan saat membuat berita.", "error");
        console.error("Error creating news:", error);
      }
    },
    resetForm() {
      this.form.title = "";
      this.form.excerpt = "";
      this.form.content = "";
      this.form.category = "";
      this.form.image = null;
      if (this.$refs.imageInput) {
        this.$refs.imageInput.value = "";
      }
    },
  
    /* ========== Fetch & Manipulasi Data Berita ========== */
    async fetchNews() {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://127.0.0.1:8000/api/news/", {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.newsList = response.data;
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    },
    toggleDropdown(newsId) {
      this.dropdownOpenId = this.dropdownOpenId === newsId ? null : newsId;
    },
    async deleteNews(newsId) {
      const result = await Swal.fire({
        title: "Hapus Berita",
        text: "Apakah Anda yakin ingin menghapus berita ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal"
      });
      if (!result.isConfirmed) return;
  
      try {
        const token = localStorage.getItem("access_token");
        await axios.delete(`http://127.0.0.1:8000/api/news/${newsId}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire("Berhasil!", "Berita telah dihapus.", "success");
        this.fetchNews();
      } catch (error) {
        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus berita.", "error");
        console.error("Error deleting news:", error);
      }
    },
  
    /* ========== Modal Edit Berita ========== */
    openEditModal(news) {
      this.currentNews = news;
      this.editForm.title = news.title;
      this.editForm.excerpt = news.excerpt;
      this.editForm.content = news.content;
      this.editForm.category = news.category;
      this.editForm.image = null; // Reset gambar edit (jika ingin diubah)
      this.showEditModal = true;
      // Tutup dropdown
      this.dropdownOpenId = null;
    },
    handleEditImageUpload(event) {
      this.editForm.image = event.target.files[0];
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    async updateNews() {
      const formData = new FormData();
      formData.append("title", this.editForm.title);
      formData.append("excerpt", this.editForm.excerpt);
      formData.append("content", this.editForm.content);
      formData.append("category", this.editForm.category);
      if (this.editForm.image) {
        formData.append("image", this.editForm.image);
      }
  
      try {
        const token = localStorage.getItem("access_token");
        await axios.patch(`http://127.0.0.1:8000/api/news/${this.currentNews.id}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        });
        Swal.fire("Berhasil!", "Berita telah diperbarui.", "success");
        this.closeEditModal();
        this.fetchNews();
      } catch (error) {
        Swal.fire("Gagal!", "Terjadi kesalahan saat memperbarui berita.", "error");
        console.error("Error updating news:", error);
      }
    }
  }
};
</script>

<style scoped>
/* Tambahkan styling tambahan jika diperlukan */
</style>
