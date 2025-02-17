<template>
    <div class="container mx-auto p-6">
      <h1 class="text-2xl font-bold mb-4">Verifikasi Pengguna</h1>
      <div v-if="loading" class="text-center">Loading...</div>
      <div v-else>
        <table class="min-w-full bg-white">
          <thead>
            <tr class="bg-gray-200">
              <th class="py-2 px-4 border">Username</th>
              <th class="py-2 px-4 border">Email</th>
              <th class="py-2 px-4 border">Tanggal Registrasi</th>
              <th class="py-2 px-4 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="text-center border-t">
              <td class="py-2 px-4">{{ user.username }}</td>
              <td class="py-2 px-4">{{ user.email }}</td>
              <td class="py-2 px-4">{{ formatDate(user.date_joined) }}</td>
              <td class="py-2 px-4">
                <button @click="verifyUser(user)" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Verifikasi
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="users.length === 0" class="text-center mt-4">
          Tidak ada pengguna yang menunggu verifikasi.
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    name: 'VerifyUsers',
    data() {
      return {
        users: [],
        loading: false,
      }
    },
    methods: {
      fetchPendingUsers() {
        this.loading = true;
        axios.get('http://127.0.0.1:8000/api/pending-users/')
          .then(response => {
            this.users = response.data;
          })
          .catch(error => {
            console.error('Error fetching pending users:', error);
            Swal.fire('Error', 'Gagal mengambil data pengguna', 'error');
          })
          .finally(() => {
            this.loading = false;
          });
      },
      formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString();
      },
      verifyUser(user) {
        Swal.fire({
          title: 'Verifikasi Pengguna',
          text: `Apakah Anda yakin ingin memverifikasi ${user.username}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ya, verifikasi',
          cancelButtonText: 'Batal'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.post(`http://127.0.0.1:8000/api/verify-user/${user.id}/`)
              .then(response => {
                Swal.fire('Berhasil', response.data.detail || 'Pengguna berhasil diverifikasi', 'success');
                this.fetchPendingUsers();
              })
              .catch(error => {
                Swal.fire('Error', 'Gagal memverifikasi pengguna', 'error');
                console.error('Error verifying user:', error);
              });
          }
        });
      }
    },
    mounted() {
      this.fetchPendingUsers();
    }
  }
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
  }
  </style>
  