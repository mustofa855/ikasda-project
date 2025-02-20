<template>
    <div class="ml-64 my-10 p-8 bg-gray-50 rounded-xl shadow-md">
      <h1 class="text-center text-3xl font-bold text-gray-800 mb-6">
        Admin: Kelola Kepengurusan IKASDA
      </h1>
  
      <!-- Form Tambah Data -->
      <form @submit.prevent="handleSubmit" class="bg-white border border-gray-200 p-6 rounded-lg shadow mb-8">
        <div class="mb-4">
          <label for="type" class="block mb-1 font-semibold text-gray-700">Pilih Tipe:</label>
          <select v-model="form.type" id="type" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300">
            <option value="direksi">Direksi</option>
            <option value="bpa">BPA</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="jabatan" class="block mb-1 font-semibold text-gray-700">Jabatan:</label>
          <input type="text" id="jabatan" v-model="form.jabatan" required class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300" />
        </div>
        <div class="mb-4">
          <label for="nama" class="block mb-1 font-semibold text-gray-700">Nama:</label>
          <input type="text" id="nama" v-model="form.nama" required class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300" />
        </div>
        <button type="submit" class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors duration-200">
          Tambah
        </button>
      </form>
  
      <!-- Tabel List Data -->
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200 rounded shadow">
          <thead class="bg-blue-500 text-white">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-medium uppercase">Tipe</th>
              <th class="px-6 py-3 text-left text-sm font-medium uppercase">Jabatan</th>
              <th class="px-6 py-3 text-left text-sm font-medium uppercase">Nama</th>
              <th class="px-6 py-3 text-left text-sm font-medium uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="item in paginatedEntries" :key="item.id" class="hover:bg-gray-100">
              <td class="px-6 py-3 text-sm text-gray-800">{{ item.type }}</td>
              <td class="px-6 py-3 text-sm text-gray-800">{{ item.jabatan }}</td>
              <td class="px-6 py-3 text-sm text-gray-800">{{ item.nama }}</td>
              <td class="px-6 py-3">
                <button @click="openModal(item)" title="Lihat Detail" class="text-blue-500 hover:text-blue-700">
                  <!-- Menggunakan Iconify untuk icon mata -->
                  <Icon icon="mdi:eye" class="w-6 h-6 inline" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Pagination Controls -->
      <div class="flex justify-center mt-4 space-x-2">
        <button
          :disabled="currentPage === 1"
          @click="prevPage"
          class="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <template v-for="page in totalPages" :key="page">
          <button
            @click="goToPage(page)"
            :class="{'bg-blue-500 text-white': currentPage === page, 'bg-gray-300 text-gray-800': currentPage !== page}"
            class="px-3 py-1 rounded"
          >
            {{ page }}
          </button>
        </template>
        <button
          :disabled="currentPage === totalPages"
          @click="nextPage"
          class="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
  
      <!-- Modal Detail Data -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <!-- Tombol X di pojok kanan atas -->
          <button type="button" @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            <Icon icon="mdi:close" class="w-6 h-6" />
          </button>
          <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">Detail Data</h2>
          <form @submit.prevent="handleModalSubmit" class="space-y-4">
            <!-- Field tipe -->
            <div>
              <label for="modal-type" class="block mb-1 font-semibold text-gray-700">Tipe:</label>
              <select
                id="modal-type"
                v-model="modalData.type"
                :disabled="!isEditing"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="direksi">Direksi</option>
                <option value="bpa">BPA</option>
              </select>
            </div>
            <div>
              <label for="modal-jabatan" class="block mb-1 font-semibold text-gray-700">Jabatan:</label>
              <input
                type="text"
                id="modal-jabatan"
                v-model="modalData.jabatan"
                :disabled="!isEditing"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label for="modal-nama" class="block mb-1 font-semibold text-gray-700">Nama:</label>
              <input
                type="text"
                id="modal-nama"
                v-model="modalData.nama"
                :disabled="!isEditing"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div class="flex flex-wrap gap-3 justify-center mt-4">
              <!-- Tampilkan tombol Edit jika belum dalam mode edit -->
              <button
                v-if="!isEditing"
                type="button"
                class="bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-semibold py-2 px-4 rounded transition-colors duration-200"
                @click="confirmEdit(modalData)"
              >
                Edit
              </button>
              <!-- Tampilkan tombol Batal jika dalam mode edit -->
              <button
                v-if="isEditing"
                type="button"
                class="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
                @click="cancelEdit"
              >
                Batal
              </button>
              <button
                type="button"
                class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
                @click="deleteEntry(modalData)"
              >
                Hapus
              </button>
            </div>
            <!-- Tombol Simpan hanya muncul saat mode edit -->
            <div v-if="isEditing" class="text-center mt-4">
              <button
                type="submit"
                class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded transition-colors duration-200"
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
  import axios from 'axios'
  import Swal from 'sweetalert2'
  import { Icon } from '@iconify/vue'
  
  export default {
    name: 'AdminPage',
    components: { Icon },
    data() {
      return {
        form: {
          type: 'direksi',
          jabatan: '',
          nama: ''
        },
        entries: [],
        showModal: false,
        modalData: {},
        isEditing: false,
        currentPage: 1,
        itemsPerPage: 6
      }
    },
    computed: {
      paginatedEntries() {
        const start = (this.currentPage - 1) * this.itemsPerPage
        return this.entries.slice(start, start + this.itemsPerPage)
      },
      totalPages() {
        return Math.ceil(this.entries.length / this.itemsPerPage)
      }
    },
    created() {
      this.fetchEntries()
    },
    methods: {
      async handleSubmit() {
        try {
          const token = localStorage.getItem('access_token')
          let endpoint = this.form.type === 'direksi' ? '/api/direksi/' : '/api/bpa/'
          await axios.post(
            endpoint,
            {
              jabatan: this.form.jabatan,
              nama: this.form.nama
            },
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          )
          Swal.fire('Berhasil!', 'Data berhasil ditambahkan.', 'success')
          this.form.jabatan = ''
          this.form.nama = ''
          this.fetchEntries()
        } catch (error) {
          console.error(error)
          Swal.fire('Error!', 'Terjadi kesalahan saat menambahkan data.', 'error')
        }
      },
      async fetchEntries() {
        try {
          const token = localStorage.getItem('access_token')
          const [direksiRes, bpaRes] = await Promise.all([
            axios.get('/api/direksi/', { headers: { Authorization: `Bearer ${token}` } }),
            axios.get('/api/bpa/', { headers: { Authorization: `Bearer ${token}` } })
          ])
          this.entries = [
            ...direksiRes.data.map(item => ({ ...item, type: 'direksi' })),
            ...bpaRes.data.map(item => ({ ...item, type: 'bpa' }))
          ]
        } catch (error) {
          console.error(error)
          Swal.fire('Error!', 'Gagal mengambil data.', 'error')
        }
      },
      openModal(item) {
        // Simpan juga tipe asli untuk referensi
        this.modalData = { ...item, originalType: item.type }
        this.showModal = true
        this.isEditing = false
      },
      closeModal() {
        this.showModal = false
        this.isEditing = false
        this.modalData = {}
      },
      async confirmEdit(data) {
        const result = await Swal.fire({
          title: 'Edit Data',
          text: 'Apakah anda ingin mengedit data ini?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Ya, edit',
          cancelButtonText: 'Batal'
        })
        if (result.isConfirmed) {
          this.isEditing = true
        }
      },
      async handleModalSubmit() {
        try {
          const token = localStorage.getItem('access_token')
          if (this.modalData.type === this.modalData.originalType) {
            let endpoint = this.modalData.type === 'direksi'
              ? `/api/direksi/${this.modalData.id}/`
              : `/api/bpa/${this.modalData.id}/`
            await axios.put(
              endpoint,
              {
                jabatan: this.modalData.jabatan,
                nama: this.modalData.nama
              },
              { headers: { Authorization: `Bearer ${token}` } }
            )
          } else {
            // Jika tipe berubah: buat record baru di endpoint baru dan hapus yang lama
            let createEndpoint = this.modalData.type === 'direksi'
              ? '/api/direksi/'
              : '/api/bpa/'
            await axios.post(
              createEndpoint,
              {
                jabatan: this.modalData.jabatan,
                nama: this.modalData.nama
              },
              { headers: { Authorization: `Bearer ${token}` } }
            )
            let deleteEndpoint = this.modalData.originalType === 'direksi'
              ? `/api/direksi/${this.modalData.id}/`
              : `/api/bpa/${this.modalData.id}/`
            await axios.delete(deleteEndpoint, { headers: { Authorization: `Bearer ${token}` } })
          }
          Swal.fire('Berhasil!', 'Data berhasil diperbarui.', 'success')
          this.closeModal()
          this.fetchEntries()
        } catch (error) {
          console.error(error)
          Swal.fire('Error!', 'Terjadi kesalahan saat memperbarui data.', 'error')
        }
      },
      async deleteEntry(data) {
        const result = await Swal.fire({
          title: 'Hapus Data',
          text: 'Apakah anda yakin ingin menghapus data ini?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ya, hapus',
          cancelButtonText: 'Batal'
        })
        if (result.isConfirmed) {
          try {
            const token = localStorage.getItem('access_token')
            let endpoint = data.type === 'direksi'
              ? `/api/direksi/${data.id}/`
              : `/api/bpa/${data.id}/`
            await axios.delete(endpoint, { headers: { Authorization: `Bearer ${token}` } })
            Swal.fire('Berhasil!', 'Data berhasil dihapus.', 'success')
            this.closeModal()
            this.fetchEntries()
          } catch (error) {
            console.error(error)
            Swal.fire('Error!', 'Gagal menghapus data.', 'error')
          }
        }
      },
      cancelEdit() {
        this.isEditing = false
        const original = this.entries.find(
          item => item.id === this.modalData.id && item.type === this.modalData.originalType
        )
        if (original) {
          this.modalData = { ...original, originalType: original.type }
        }
      },
      goToPage(page) {
        this.currentPage = page
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--
        }
      }
    }
  }
  </script>
  