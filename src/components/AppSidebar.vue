<template>
  <aside class="w-64 bg-gray-800 h-screen text-white fixed flex flex-col justify-between border-r border-gray-700">
    <div>
      <!-- Profile Section -->
      <div class="relative text-center py-6 border-b border-gray-600">
        <img
          :src="userProfileImage"
          alt="Profile"
          class="w-16 h-16 rounded-full mx-auto cursor-pointer border-2 border-white"
          @click="toggleProfileOptions"
        />
        <p class="mt-2 font-bold">{{ username }}</p>
        <transition name="fade">
          <div
            v-if="showProfileOptions"
            class="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white text-black rounded shadow-lg z-10"
          >
            <ul>
              <li>
                <a href="#" @click.prevent="openEditModal" class="block px-4 py-2 hover:bg-gray-200">
                  Edit Profile
                </a>
              </li>
              <li>
                <a href="#" @click.prevent="handleLogout" class="block px-4 py-2 hover:bg-gray-200">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </transition>
      </div>
      <!-- Navigation Menu -->
      <ul class="mt-6 space-y-1">
        <li>
          <router-link
            to="/direksi"
            :class="['block px-4 py-2 hover:bg-gray-700 transition rounded', isActive('/direksi')]"
          >
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link
            to="/direksi/alumni-management"
            :class="['block px-4 py-2 hover:bg-gray-700 transition rounded', isActive('/direksi/alumni-management')]"
          >
            Manajemen Alumni
          </router-link>
        </li>
        <li>
          <router-link
            to="/direksi/user-verification"
            :class="['block px-4 py-2 hover:bg-gray-700 transition rounded', isActive('/direksi/user-verification')]"
          >
            Verifikasi Alumni
          </router-link>
        </li>
        <li>
          <router-link
            to="/direksi/gallery-management"
            :class="['block px-4 py-2 hover:bg-gray-700 transition rounded', isActive('/direksi/gallery-management')]"
          >
            Manajemen Galeri
          </router-link>
        </li>
        <li>
          <router-link
            to="/direksi/event-management"
            :class="['block px-4 py-2 hover:bg-gray-700 transition rounded', isActive('/direksi/event-management')]"
          >
            Manajemen Event
          </router-link>
        </li>
        <li>
          <router-link
            to="/direksi/content-management"
            :class="['block px-4 py-2 hover:bg-gray-700 transition rounded', isActive('/direksi/content-management')]"
          >
            Manajemen Konten
          </router-link>
        </li>
        <li>
          <router-link
            to="/direksi/financial-reports"
            :class="['block px-4 py-2 hover:bg-gray-700 transition rounded', isActive('/direksi/financial-reports')]"
          >
            Laporan Keuangan
          </router-link>
        </li>
        <li>
          <router-link
            to="/direksi/strategic-decision"
            :class="['block px-4 py-2 hover:bg-gray-700 transition rounded', isActive('/direksi/strategic-decision')]"
          >
            Keputusan Strategis
          </router-link>
        </li>
        <li>
          <router-link
            to="/direksi/strategic-reports"
            :class="['block px-4 py-2 hover:bg-gray-700 transition rounded', isActive('/direksi/strategic-reports')]"
          >
            Laporan Strategis
          </router-link>
        </li>
        <li>
          <router-link
            to="/direksi/ikasda-jabatan"
            :class="['block px-4 py-2 hover:bg-gray-700 transition rounded', isActive('/direksi/strategic-reports')]"
          >
            Pengubahan Jabatan
          </router-link>
        </li>
      </ul>
    </div>
    <!-- (Bagian bawah logout sudah dipindahkan ke dropdown profil) -->
  </aside>

  <!-- Modal Edit Profil -->
  <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-lg relative">
      <button
        class="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        @click="closeEditModal"
      >
        &times;
      </button>
      <h2 class="text-xl font-bold mb-4">Edit Profil</h2>
      <form @submit.prevent="confirmEdit">
        <!-- Foto Profil -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Foto Profil</label>
          <div class="flex items-center">
            <img
              :src="previewImage || userProfileImage"
              alt="Profile Preview"
              class="w-16 h-16 rounded-full mr-4"
            />
            <input
              type="file"
              @change="handleFileChange"
              accept="image/*"
              class="border p-1"
            />
          </div>
        </div>
        <!-- Nama Lengkap -->
        <div class="mb-4">
          <label class="block text-gray-700">Nama Lengkap</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full border p-2 rounded"
            required
          />
        </div>
        <!-- Angkatan -->
        <div class="mb-4">
          <label class="block text-gray-700">Angkatan</label>
          <input
            v-model="form.angkatan"
            type="number"
            class="w-full border p-2 rounded"
            required
          />
        </div>
        <!-- Pekerjaan -->
        <div class="mb-4">
          <label class="block text-gray-700">Pekerjaan</label>
          <input
            v-model="form.pekerjaan"
            type="text"
            class="w-full border p-2 rounded"
            required
          />
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            @click="closeEditModal"
            class="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Batal
          </button>
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
            Simpan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

// Sidebar data
const showProfileOptions = ref(false);
const showEditModal = ref(false);
const userProfileImage = ref('https://dummyimage.com/150x150/cccccc/000000.png&text=Profile'); // Placeholder atau URL asli
const username = ref('Direksi'); // Dapat disesuaikan dengan data user (misalnya dari store/auth)

// Fungsi bantu untuk navigasi aktif
const isActive = (path) => route.path === path ? 'bg-gray-700 font-bold' : '';

// Toggle dropdown profil
const toggleProfileOptions = () => {
  showProfileOptions.value = !showProfileOptions.value;
};

// Buka modal edit profil
const openEditModal = () => {
  showEditModal.value = true;
  showProfileOptions.value = false; // Tutup dropdown
};

// Logout
const handleLogout = () => {
  Swal.fire({
    title: 'Logout',
    text: 'Apakah Anda yakin ingin log out?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, log out',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      Swal.fire({
        title: 'Berhasil',
        text: 'Anda telah log out.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        router.push('/login');
      });
    }
  });
};

// Data untuk modal edit profil sesuai dengan serializer backend
const form = reactive({
  name: "",
  angkatan: "",
  pekerjaan: "",
  photo: null // Untuk file upload
});
const previewImage = ref("");

// Tutup modal edit profil
const closeEditModal = () => {
  showEditModal.value = false;
};

// Tangani perubahan file input
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.photo = file;
    previewImage.value = URL.createObjectURL(file);
  }
};

// Ambil data profil dari API
const loadProfile = () => {
  const token = localStorage.getItem('access_token');
  axios
    .get('http://127.0.0.1:8000/api/my-profile/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      const data = response.data;
      // Sesuaikan dengan struktur data yang dikembalikan oleh AlumniProfileUpdateSerializer:
      // { name, angkatan, pekerjaan, fotoProfil }
      form.name = data.name || "";
      form.angkatan = data.angkatan || "";
      form.pekerjaan = data.pekerjaan || "";
      if (data.fotoProfil) {
        userProfileImage.value = data.fotoProfil;
      }
      // Update username di sidebar (misal menggunakan nama)
      username.value = data.name || username.value;
    })
    .catch((error) => {
      console.error('Error loading profile:', error);
      Swal.fire('Error', 'Gagal memuat profil', 'error');
    });
};

onMounted(() => {
  loadProfile();
});

// Jika modal terbuka, load ulang data profil
watch(
  () => showEditModal.value,
  (newVal) => {
    if (newVal) {
      loadProfile();
    }
  }
);

// Konfirmasi dan submit edit profil
const confirmEdit = () => {
  Swal.fire({
    title: 'Konfirmasi Edit Profil',
    text: 'Apakah Anda yakin ingin mengubah data profil?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, simpan',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      submitEdit();
    }
  });
};

const submitEdit = () => {
  const token = localStorage.getItem('access_token');
  const formData = new FormData();
  // Sesuaikan nama field dengan yang diharapkan backend
  formData.append('name', form.name);
  formData.append('angkatan', form.angkatan);
  formData.append('pekerjaan', form.pekerjaan);
  if (form.photo) {
    formData.append('fotoProfil', form.photo);
  }

  axios
    .patch('http://127.0.0.1:8000/api/my-profile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      Swal.fire('Berhasil', 'Profil telah diperbarui', 'success');
      // Perbarui tampilan sidebar jika respons mengandung data baru
      if (response.data.name) {
        username.value = response.data.name;
      }
      if (response.data.fotoProfil) {
        userProfileImage.value = response.data.fotoProfil;
      }
      closeEditModal();
    })
    .catch((error) => {
      console.error('Error updating profile:', error);
      Swal.fire('Error', 'Gagal memperbarui profil', 'error');
    });
};
</script>

<style scoped>
/* Transisi untuk dropdown */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
