<template>
  <div class="ml-64 p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Manajemen Alumni</h1>

    <!-- Action Bar: Search, Export, dan Pengelompokan -->
    <div class="flex flex-wrap justify-between items-center mb-4">
      <div class="flex items-center space-x-2">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari alumni..."
          class="border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          @click="exportToExcel"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition flex items-center"
        >
          <!-- Icon Export -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
          </svg>
          <span class="ml-2">Save</span>
        </button>
      </div>
      <div class="flex items-center space-x-2">
        <select v-model="groupingCriteria" class="border border-gray-300 rounded px-3 py-2">
          <option disabled value="">-- Pilih Pengelompokan --</option>
          <option value="graduation_year">Angkatan</option>
          <option value="education">Pendidikan</option>
        </select>
        <button
          @click="fetchGrouping"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          :disabled="!groupingCriteria"
        >
          Terapkan
        </button>
      </div>
    </div>

    <!-- Tampilan Daftar Alumni (jika tidak sedang melihat hasil grouping) -->
    <div v-if="!groupingView">
      <div v-if="paginatedUsers && paginatedUsers.length">
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
              <th class="py-2 px-4 border-b text-left">Status Verifikasi</th>
              <th class="py-2 px-4 border-b text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-gray-50">
              <td class="py-2 px-4 border-b">{{ user.username }}</td>
              <td class="py-2 px-4 border-b">
                {{ user.first_name }} {{ user.last_name }}
              </td>
              <td class="py-2 px-4 border-b">{{ user.email }}</td>
              <td class="py-2 px-4 border-b">{{ user.phone }}</td>
              <td class="py-2 px-4 border-b">
                {{ user.profile ? user.profile.graduation_year : '-' }}
              </td>
              <td class="py-2 px-4 border-b">
                {{ user.profile ? user.profile.education : '-' }}
              </td>
              <td class="py-2 px-4 border-b">{{ user.role }}</td>
              <td class="py-2 px-4 border-b text-center">
                <span v-if="user.verified" class="inline-flex items-center gap-x-1 text-green-600 font-semibold whitespace-nowrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 1024 1024">
                    <path fill="currentColor" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01m204.336-636.352L415.935 626.944l-135.28-135.28c-12.496-12.496-32.752-12.496-45.264 0c-12.496 12.496-12.496 32.752 0 45.248l158.384 158.4c12.496 12.48 32.752 12.48 45.264 0c1.44-1.44 2.673-3.009 3.793-4.64l318.784-320.753c12.48-12.496 12.48-32.752 0-45.263c-12.512-12.496-32.768-12.496-45.28 0"/>
                  </svg>
                </span>
                <span v-else class="inline-flex items-center gap-x-1 text-red-600 font-semibold whitespace-nowrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2.5" d="m7 7l10 10M7 17L17 7" />
                  </svg>
                </span>
              </td>

              <td class="py-2 px-4 border-b flex space-x-2">
                <!-- Tombol Edit -->
                <button @click="confirmEdit(user)"
                  class="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L9 21H3v-6L16.732 3.732z" />
                  </svg>
                </button>
                <!-- Tombol Reset Password -->
                <button @click="openResetPasswordModal(user.id)"
                  class="bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700 transition">
                  Reset Password
                </button>
                <!-- Tombol Hapus -->
                <button @click="deleteUser(user.id)"
                  class="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a3 3 0 016 0v3" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-center text-gray-500">
        Tidak ada data alumni.
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-center mt-4 space-x-2">
        <button :disabled="currentPage === 1" @click="goToPreviousPage"
          class="px-3 py-1 bg-gray-300 text-gray-800 rounded disabled:opacity-50 hover:bg-gray-400 transition">
          &lt;
        </button>
        <div class="flex space-x-1">
          <button v-for="page in totalPages" :key="page" @click="currentPage = page"
            :class="currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'"
            class="px-3 py-1 rounded transition">
            {{ page }}
          </button>
        </div>
        <button :disabled="currentPage === totalPages" @click="goToNextPage"
          class="px-3 py-1 bg-gray-300 text-gray-800 rounded disabled:opacity-50 hover:bg-gray-400 transition">
          &gt;
        </button>
      </div>
    </div>

    <!-- Tampilan Hasil Pengelompokan Alumni -->
    <div v-if="groupingView">
      <button @click="toggleGroupingView"
        class="mb-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
        Kembali ke Daftar Alumni
      </button>
      <div v-for="group in groupingData" :key="groupKey(group)" class="mb-6 border p-4 rounded">
        <h2 class="text-xl font-bold mb-2">
          {{ groupTitle(group) }} (Total: {{ group.total }})
        </h2>
        <table class="min-w-full bg-white border border-gray-200">
          <thead>
            <tr class="bg-gray-100">
              <th class="py-2 px-4 border-b text-left">Username</th>
              <th class="py-2 px-4 border-b text-left">Nama Lengkap</th>
              <th class="py-2 px-4 border-b text-left">Email</th>
              <th class="py-2 px-4 border-b text-left">Nomor Telepon</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="alumni in group.alumni" :key="alumni.user.id" class="hover:bg-gray-50">
              <td class="py-2 px-4 border-b">{{ alumni.user.username }}</td>
              <td class="py-2 px-4 border-b">{{ alumni.user.first_name }} {{ alumni.user.last_name }}</td>
              <td class="py-2 px-4 border-b">{{ alumni.user.email }}</td>
              <td class="py-2 px-4 border-b">{{ alumni.user.phone }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Edit Alumni -->
    <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 max-h-[90vh] overflow-y-auto">
        <h2 class="text-2xl font-bold mb-4">Edit Data Alumni</h2>
        <form @submit.prevent="updateUser">
          <div class="mb-4">
            <label class="block text-gray-700">Username</label>
            <input v-model="editForm.username" type="text" class="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Nama Depan</label>
            <input v-model="editForm.first_name" type="text" class="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Nama Belakang</label>
            <input v-model="editForm.last_name" type="text" class="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Email</label>
            <input v-model="editForm.email" type="email" class="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Nomor Telepon</label>
            <input v-model="editForm.phone" type="text" class="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Angkatan</label>
            <input v-model="editForm.graduation_year" type="number" class="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Pendidikan</label>
            <input v-model="editForm.education" type="text" class="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <!-- Field Role -->
          <div class="mb-4">
            <label class="block text-gray-700">Role</label>
            <select v-model="editForm.role" class="w-full border border-gray-300 rounded px-3 py-2">
              <option value="alumni">Alumni</option>
              <option value="admin">Admin</option>
              <option value="direksi">Direksi</option>
              <option value="bpa">BPA</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button type="button" @click="closeEditModal"
              class="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition">
              Batal
            </button>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Reset Password -->
    <div v-if="showResetPasswordModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <h2 class="text-2xl font-bold mb-4">Reset Password Alumni</h2>
        <form @submit.prevent="resetPassword">
          <div class="mb-4">
            <label class="block text-gray-700">Password Baru</label>
            <input
              v-model="resetPasswordForm.newPassword"
              type="password"
              class="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Masukkan password baru"
              required
            />
          </div>
          <div class="flex justify-end">
            <button type="button" @click="closeResetPasswordModal"
              class="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition">
              Batal
            </button>
            <button type="submit" class="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition">
              Reset Password
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
import * as XLSX from "xlsx";

export default {
  name: "AlumniManagement",
  data() {
    return {
      userList: [],
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 7,
      showEditModal: false,
      currentEditUser: null,
      editForm: {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        graduation_year: "",
        education: "",
        role: ""
      },
      // Data untuk Reset Password
      showResetPasswordModal: false,
      resetPasswordForm: {
        newPassword: "",
        userId: null
      },
      // Data untuk pengelompokan alumni
      groupingCriteria: "",
      groupingData: [],
      groupingView: false
    };
  },
  computed: {
    filteredUsers() {
      if (!this.searchQuery) {
        return this.userList;
      }
      const query = this.searchQuery.toLowerCase();
      return this.userList.filter(user =>
        (user.username && user.username.toLowerCase().includes(query)) ||
        (user.first_name && user.first_name.toLowerCase().includes(query)) ||
        (user.last_name && user.last_name.toLowerCase().includes(query)) ||
        (user.email && user.email.toLowerCase().includes(query)) ||
        (user.phone && user.phone.toLowerCase().includes(query))
      );
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredUsers.slice(start, start + this.itemsPerPage);
    }
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      const token = localStorage.getItem("access_token");
      axios
        .get("http://127.0.0.1:8000/api/users/", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          this.userList = response.data.results || response.data;
          this.currentPage = 1;
        })
        .catch(error => {
          console.error("Error fetching users:", error);
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
          axios
            .delete(`http://127.0.0.1:8000/api/users/${userId}/`, {
              headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
            })
            .then(() => {
              Swal.fire("Berhasil", "Data alumni telah dihapus.", "success");
              this.fetchUsers();
            })
            .catch(error => {
              Swal.fire("Gagal", "Terjadi kesalahan saat menghapus alumni.", "error");
              console.error("Error deleting alumni:", error);
            });
        }
      });
    },
    confirmEdit(user) {
      Swal.fire({
        title: "Edit Data Alumni",
        text: "Apakah Anda akan mengedit data ini?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya, edit!",
        cancelButtonText: "Batal"
      }).then(result => {
        if (result.isConfirmed) {
          this.currentEditUser = user;
          this.editForm.username = user.username || "";
          this.editForm.first_name = user.first_name || "";
          this.editForm.last_name = user.last_name || "";
          this.editForm.email = user.email || "";
          this.editForm.phone = user.phone || "";
          this.editForm.graduation_year = user.profile ? user.profile.graduation_year : "";
          this.editForm.education = user.profile ? user.profile.education : "";
          this.editForm.role = user.role || "";
          this.showEditModal = true;
        }
      });
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    updateUser() {
      const token = localStorage.getItem("access_token");
      const updatedData = {
        username: this.editForm.username,
        first_name: this.editForm.first_name,
        last_name: this.editForm.last_name,
        email: this.editForm.email,
        phone: this.editForm.phone,
        role: this.editForm.role,
        profile: {
          graduation_year: this.editForm.graduation_year,
          education: this.editForm.education
        }
      };
      axios
        .patch(`http://127.0.0.1:8000/api/users/${this.currentEditUser.id}/`, updatedData, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
          Swal.fire("Berhasil", "Data alumni telah diperbarui.", "success");
          this.showEditModal = false;
          this.fetchUsers();
        })
        .catch(error => {
          Swal.fire("Gagal", "Terjadi kesalahan saat memperbarui data.", "error");
          console.error("Error updating alumni:", error);
        });
    },
    openResetPasswordModal(userId) {
      this.resetPasswordForm.userId = userId;
      this.resetPasswordForm.newPassword = "";
      this.showResetPasswordModal = true;
    },
    closeResetPasswordModal() {
      this.showResetPasswordModal = false;
    },
    resetPassword() {
      const token = localStorage.getItem("access_token");
      axios
        .post(
          `http://127.0.0.1:8000/api/users/${this.resetPasswordForm.userId}/reset-password/`,
          { new_password: this.resetPasswordForm.newPassword },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          Swal.fire("Berhasil", "Password berhasil direset.", "success");
          this.closeResetPasswordModal();
        })
        .catch(error => {
          Swal.fire("Gagal", "Terjadi kesalahan saat mereset password.", "error");
          console.error("Error resetting password:", error);
        });
    },
    // Pagination controls
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    exportToExcel() {
      const exportData = this.userList.map(user => ({
        Username: user.username,
        "Nama Lengkap": `${user.first_name} ${user.last_name}`,
        Email: user.email,
        "Nomor Telepon": user.phone,
        Angkatan: user.profile ? user.profile.graduation_year : "-",
        Pendidikan: user.profile ? user.profile.education : "-",
        Role: user.role
      }));
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Alumni");
      XLSX.writeFile(wb, "alumni.xlsx");
    },
    fetchGrouping() {
      const token = localStorage.getItem("access_token");
      axios
        .get(`http://127.0.0.1:8000/api/alumni-group/?group_by=${this.groupingCriteria}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          this.groupingData = response.data;
          this.groupingView = true;
        })
        .catch(error => {
          console.error("Error fetching grouping data:", error);
          Swal.fire("Gagal", "Terjadi kesalahan saat mengambil data pengelompokan.", "error");
        });
    },
    toggleGroupingView() {
      this.groupingView = !this.groupingView;
      if (!this.groupingView) {
        // Jika kembali ke tampilan daftar alumni, refresh data
        this.fetchUsers();
      }
    },
    groupTitle(group) {
      if (this.groupingCriteria === "graduation_year") {
        return `Angkatan ${group.graduation_year}`;
      } else if (this.groupingCriteria === "education") {
        return `Pendidikan ${group.education}`;
      }
      return "";
    },
    groupKey(group) {
      if (this.groupingCriteria === "graduation_year") {
        return group.graduation_year;
      } else if (this.groupingCriteria === "education") {
        return group.education;
      }
      return "";
    }
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #e5e7eb;
  padding: 0.75rem;
}

th {
  background-color: #f3f4f6;
  font-weight: 600;
}
</style>
