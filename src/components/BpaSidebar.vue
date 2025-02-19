<template>
  <aside class="w-64 bg-blue-800 h-screen text-white fixed flex flex-col justify-between border-r border-blue-700">
    <div>
      <!-- Profile Section -->
      <div class="relative text-center py-6 border-b border-blue-700">
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
                <a
                  href="#"
                  @click.prevent="openEditModal"
                  class="block px-4 py-2 hover:bg-gray-200"
                >
                  Edit Profil
                </a>
              </li>
              <li>
                <a
                  href="#"
                  @click.prevent="handleLogout"
                  class="block px-4 py-2 hover:bg-gray-200"
                >
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
            to="/bpa"
            :class="['block px-4 py-2 hover:bg-blue-700 transition rounded', isActive('/bpa')]"
          >
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link
            to="/bpa/activity-audit"
            :class="['block px-4 py-2 hover:bg-blue-700 transition rounded', isActive('/bpa/activity-audit')]"
          >
            Audit Aktivitas
          </router-link>
        </li>
        <li>
          <router-link
            to="/bpa/audit-reports"
            :class="['block px-4 py-2 hover:bg-blue-700 transition rounded', isActive('/bpa/audit-reports')]"
          >
            Laporan Audit
          </router-link>
        </li>
        <li>
          <router-link
            to="/bpa/pengawasan-event"
            :class="['block px-4 py-2 hover:bg-blue-700 transition rounded', isActive('/bpa/pengawasan-event')]"
          >
            Pengawasan Event
          </router-link>
        </li>
        <li>
          <router-link
            to="/bpa/persetujuan-keputusan"
            :class="['block px-4 py-2 hover:bg-blue-700 transition rounded', isActive('/bpa/persetujuan-keputusan')]"
          >
            Persetujuan Keputusan
          </router-link>
        </li>
      </ul>
    </div>
  </aside>

  <!-- Modal Edit Profil -->
  <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-lg relative">
      <button @click="closeEditModal" class="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
        &times;
      </button>
      <h2 class="text-xl font-bold mb-4">Edit Profil</h2>
      <form @submit.prevent="submitEditProfile">
        <!-- Foto Profil -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Foto Profil</label>
          <div class="flex items-center">
            <img
              :src="previewImage || userProfileImage"
              alt="Profile Preview"
              class="w-16 h-16 rounded-full mr-4"
            />
            <input type="file" @change="handleFileChange" accept="image/*" class="border p-1" />
          </div>
        </div>
        <!-- Nama Lengkap -->
        <div class="mb-4">
          <label class="block text-gray-700">Nama Lengkap <span class="text-red-600">*</span></label>
          <input v-model="editProfile.name" type="text" class="w-full border p-2 rounded" required />
        </div>
        <!-- Angkatan -->
        <div class="mb-4">
          <label class="block text-gray-700">Angkatan <span class="text-red-600">*</span></label>
          <input v-model="editProfile.angkatan" type="number" class="w-full border p-2 rounded" required />
        </div>
        <!-- Pekerjaan -->
        <div class="mb-4">
          <label class="block text-gray-700">Pekerjaan <span class="text-red-600">*</span></label>
          <input v-model="editProfile.pekerjaan" type="text" class="w-full border p-2 rounded" required />
        </div>
        <div class="flex justify-end space-x-2">
          <button type="button" @click="closeEditModal" class="bg-gray-500 text-white px-4 py-2 rounded">
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
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

// Data profil yang diambil dari API
const userProfileImage = ref('https://dummyimage.com/150x150/cccccc/000000.png&text=Profile');
const username = ref('User'); // Default, akan diupdate dari API

// Data untuk dropdown dan modal edit profil
const showProfileOptions = ref(false);
const showEditModal = ref(false);
const previewImage = ref('');
const editProfile = ref({
  name: '',
  angkatan: '',
  pekerjaan: '',
  photo: null, // untuk file upload
});

// Fungsi untuk menentukan menu aktif
const isActive = (path) => (route.path === path ? 'bg-blue-700 font-bold' : '');

// Toggle dropdown profil
const toggleProfileOptions = () => {
  showProfileOptions.value = !showProfileOptions.value;
};

// Fungsi logout
const handleLogout = () => {
  Swal.fire({
    title: 'Apakah anda yakin ingin log out?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, log out',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      router.push('/login');
    }
  });
};

// Fungsi untuk mengambil data profil dari API
const loadProfile = async () => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.get('http://127.0.0.1:8000/api/my-profile/', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = response.data;
    // Sesuaikan dengan struktur respons API
    username.value = data.name || data.username || 'User';
    editProfile.value.name = data.name || data.username || '';
    editProfile.value.angkatan = data.angkatan || '';
    editProfile.value.pekerjaan = data.pekerjaan || '';
    if (data.fotoProfil) {
      userProfileImage.value = data.fotoProfil;
    }
  } catch (error) {
    console.error('Error loading profile:', error);
    Swal.fire('Error', 'Gagal memuat profil', 'error');
  }
};

onMounted(() => {
  loadProfile();
});

// Buka modal edit profil
const openEditModal = () => {
  showEditModal.value = true;
  showProfileOptions.value = false;
  loadProfile();
};

// Tutup modal edit profil
const closeEditModal = () => {
  showEditModal.value = false;
};

// Tangani perubahan file input
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    editProfile.value.photo = file;
    previewImage.value = URL.createObjectURL(file);
  }
};

// Submit data edit profil ke backend
const submitEditProfile = async () => {
  Swal.fire({
    title: 'Konfirmasi Edit Profil',
    text: 'Apakah Anda yakin ingin mengubah data profil?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, simpan',
    cancelButtonText: 'Batal'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('access_token');
        const formData = new FormData();
        formData.append('name', editProfile.value.name);
        formData.append('angkatan', editProfile.value.angkatan);
        formData.append('pekerjaan', editProfile.value.pekerjaan);
        if (editProfile.value.photo) {
          formData.append('fotoProfil', editProfile.value.photo);
        }
        const response = await axios.patch('http://127.0.0.1:8000/api/my-profile/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        });
        Swal.fire('Berhasil', 'Profil telah diperbarui', 'success');
        if (response.data.name) {
          username.value = response.data.name;
        }
        if (response.data.fotoProfil) {
          userProfileImage.value = response.data.fotoProfil;
        }
        closeEditModal();
      } catch (error) {
        console.error('Error updating profile:', error);
        Swal.fire('Error', 'Gagal memperbarui profil', 'error');
      }
    }
  });
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
a {
  text-decoration: none;
}
</style>
