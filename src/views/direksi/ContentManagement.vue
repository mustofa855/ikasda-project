<template>
  <div class="ml-64 p-6">
    <div class="bg-white shadow rounded p-6">
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
        <!-- Ringkasan (Excerpt) -->
        <div class="mb-4">
          <label for="excerpt" class="block text-gray-700">Ringkasan</label>
          <textarea
            id="excerpt"
            v-model="form.excerpt"
            placeholder="Tuliskan ringkasan berita (contoh: IKASDA PEDULI - ikasda mengadakan kegiatan amal di daerah Cisarua...)"
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
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: "ManajemenBerita",
  data() {
    return {
      form: {
        title: "",
        excerpt: "",
        content: "",
        category: "",
        image: null
      }
    };
  },
  methods: {
    handleImageUpload(event) {
      // Simpan file gambar yang diupload ke properti form.image
      this.form.image = event.target.files[0];
    },
    async createNews() {
      // Tampilkan konfirmasi menggunakan SweetAlert2
      const result = await Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Pastikan data yang Anda masukkan sudah benar!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, buat berita',
        cancelButtonText: 'Periksa lagi'
      });
      
      if (!result.isConfirmed) return;

      // Buat FormData untuk mendukung file upload
      const formData = new FormData();
      formData.append('title', this.form.title);
      formData.append('excerpt', this.form.excerpt);
      formData.append('content', this.form.content);
      formData.append('category', this.form.category);
      if (this.form.image) {
        formData.append('image', this.form.image);
      }
      
      try {
        const token = localStorage.getItem("access_token");
        await axios.post("http://127.0.0.1:8000/api/news/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          }
        });
        Swal.fire("Berhasil!", "Berita telah dibuat.", "success");
        // Reset form (opsional)
        this.form.title = "";
        this.form.excerpt = "";
        this.form.content = "";
        this.form.category = "";
        this.form.image = null;
      } catch (error) {
        Swal.fire("Gagal!", "Terjadi kesalahan saat membuat berita.", "error");
        console.error("Error creating news:", error);
      }
    }
  }
};
</script>

<style scoped>
/* Tambahkan styling tambahan jika diperlukan */
</style>
