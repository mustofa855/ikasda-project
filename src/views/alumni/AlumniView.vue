<template>
    <div class="alumni-directory p-4 px-10">
      <h1 class="text-center text-2xl font-bold mb-4">Direktori Alumni</h1>
  
      <!-- Pencarian Alumni -->
      <div class="mb-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari alumni..."
          class="p-2 border rounded w-96"
        />
      </div>
  
      <!-- Tampilkan Alumni dalam Bentuk Card -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div
          v-for="alumni in filteredAlumni"
          :key="alumni.id"
          class="card p-4 border rounded shadow-md hover:shadow-lg"
        >
          <!-- Foto Alumni -->
          <div class="mb-4">
            <img
              :src="alumni.photo"
              alt="Foto Alumni"
              class="w-full h-48 object-cover rounded-t"
            />
          </div>
  
          <!-- Nama dan Angkatan Alumni -->
          <div class="text-center mb-2">
            <h3 class="font-semibold text-lg">{{ alumni.name }}</h3>
            <p class="text-sm text-gray-500">{{ alumni.batch }}</p>
          </div>
  
          <!-- Tombol Lihat Detail -->
          <div class="text-center">
            <button
              @click="openModal(alumni)"
              class="bg-blue-500 text-white p-2 rounded"
            >
              Lihat Detail
            </button>
          </div>
        </div>
      </div>
  
      <!-- Modal untuk Menampilkan Detail Alumni -->
      <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded shadow-lg w-full sm:w-96">
          <h2 class="text-2xl font-semibold mb-4">Detail Alumni</h2>
  
          <div v-if="selectedAlumni">
            <!-- Foto Alumni dalam Modal -->
            <div class="mb-4">
              <img
                :src="selectedAlumni.photo"
                alt="Foto Alumni"
                class="w-full h-48 object-cover rounded"
              />
            </div>
  
            <!-- Data Lengkap Alumni -->
            <div class="mb-4">
              <p><strong>Nama:</strong> {{ selectedAlumni.name }}</p>
              <p><strong>Angkatan:</strong> {{ selectedAlumni.batch }}</p>
              <p><strong>Email:</strong> {{ selectedAlumni.email }}</p>
              <p><strong>Telepon:</strong> {{ selectedAlumni.phone }}</p>
              <p><strong>Pekerjaan:</strong> {{ selectedAlumni.job }}</p>
            </div>
  
            <!-- Tombol Tutup Modal -->
            <div class="text-center">
              <button
                @click="closeModal"
                class="bg-red-500 text-white p-2 rounded"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    middleware: 'authenticated', // Pastikan hanya alumni yang dapat mengakses halaman ini
    data() {
      return {
        alumniList: [
          {
            id: 1,
            name: 'John Doe',
            batch: '2010',
            email: 'john.doe@example.com',
            phone: '081234567890',
            job: 'Software Engineer',
            photo: 'https://via.placeholder.com/150',
          },
          {
            id: 2,
            name: 'Jane Smith',
            batch: '2011',
            email: 'jane.smith@example.com',
            phone: '089876543210',
            job: 'Data Scientist',
            photo: 'https://via.placeholder.com/150',
          },
          // Tambahkan data alumni lainnya di sini
        ],
        searchQuery: '',
        isModalOpen: false,
        selectedAlumni: null,
      };
    },
    computed: {
      filteredAlumni() {
        const query = this.searchQuery.toLowerCase();
        return this.alumniList.filter(
          alumni =>
            alumni.name.toLowerCase().includes(query) ||
            alumni.batch.includes(query)
        );
      }
    },
    methods: {
      openModal(alumni) {
        this.selectedAlumni = alumni;
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
        this.selectedAlumni = null;
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    transition: transform 0.3s ease;
  }
  .card:hover {
    transform: translateY(-5px);
  }
  </style>
  