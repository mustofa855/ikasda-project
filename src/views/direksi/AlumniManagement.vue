<template>
  <div class="ml-64 p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Manajemen Alumni</h1>
    <div v-if="userList && userList.length">
      <table class="min-w-full bg-white border border-gray-200">
        <thead>
          <tr class="bg-gray-100">
            <th class="py-2 px-4 border-b text-left">Username</th>
            <th class="py-2 px-4 border-b text-left">Nama Lengkap</th>
            <th class="py-2 px-4 border-b text-left">Email</th>
            <th class="py-2 px-4 border-b text-left">Nomor Telepon</th>
            <th class="py-2 px-4 border-b text-left">Angkatan</th>
            <th class="py-2 px-4 border-b text-left">Pendidikan</th>
            <th class="py-2 px-4 border-b text-left">Role</th>
            <th class="py-2 px-4 border-b text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userList" :key="user.id" class="hover:bg-gray-50">
            <td class="py-2 px-4 border-b">{{ user.username }}</td>
            <td class="py-2 px-4 border-b">
              {{ user.first_name }} {{ user.last_name }}
            </td>
            <td class="py-2 px-4 border-b">{{ user.email }}</td>
            <td class="py-2 px-4 border-b">{{ user.phone }}</td>
            <td class="py-2 px-4 border-b">{{ user.profile ? user.profile.graduation_year : '-' }}</td>
            <td class="py-2 px-4 border-b">{{ user.profile ? user.profile.education : '-' }}</td>
            <td class="py-2 px-4 border-b">{{ user.role }}</td>
            <td class="py-2 px-4 border-b">
              <button 
                @click="verifyUser(user.id)" 
                class="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition"
              >
                Verifikasi
              </button>
              <button 
                @click="deleteUser(user.id)" 
                class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition ml-2"
              >
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center text-gray-500">
      Tidak ada data alumni.
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "AlumniManagement",
  data() {
    return {
      userList: []
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      const token = localStorage.getItem("access_token");
      axios.get("http://127.0.0.1:8000/api/users/", {
        headers: { "Authorization": `Bearer ${token}` }
      })
      .then(response => {
        console.log("Response data:", response.data);
        // Jika API menggunakan paginasi, data mungkin berada di response.data.results
        if (response.data.results) {
          this.userList = response.data.results;
        } else {
          this.userList = response.data;
        }
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
    },
    verifyUser(userId) {
      Swal.fire({
        title: "Verifikasi Alumni",
        text: "Apakah Anda yakin ingin memverifikasi alumni ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, verifikasi!",
        cancelButtonText: "Batal"
      }).then(result => {
        if (result.isConfirmed) {
          axios.patch(`http://127.0.0.1:8000/api/users/${userId}/`, { verified: true }, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
          })
          .then(response => {
            Swal.fire("Berhasil", "Alumni telah diverifikasi.", "success");
            this.fetchUsers();
          })
          .catch(error => {
            Swal.fire("Gagal", "Terjadi kesalahan saat verifikasi.", "error");
            console.error("Error verifying alumni:", error);
          });
        }
      });
    },
    deleteUser(userId) {
      Swal.fire({
        title: "Hapus Alumni",
        text: "Apakah Anda yakin ingin menghapus data alumni ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal"
      }).then(result => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/users/${userId}/`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
          })
          .then(response => {
            Swal.fire("Berhasil", "Data alumni telah dihapus.", "success");
            this.fetchUsers();
          })
          .catch(error => {
            Swal.fire("Gagal", "Terjadi kesalahan saat menghapus alumni.", "error");
            console.error("Error deleting alumni:", error);
          });
        }
      });
    }
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  border: 1px solid #e5e7eb;
  padding: 0.75rem;
}
th {
  background-color: #f3f4f6;
  font-weight: 600;
}
</style>
