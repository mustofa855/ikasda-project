<template>
    <div class="min-h-screen ml-64 bg-gray-100">
      <!-- Header -->
      <header class="bg-blue-800 text-white py-4 shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold">Pengajuan Audit</h1>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Formulir Pengajuan Audit -->
          <section class="bg-white shadow rounded-lg p-6 mb-8">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Formulir Pengajuan Audit</h2>
            <form @submit.prevent="submitForm">
              <!-- Nama Aktivitas -->
              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2" for="namaAktivitas">Nama Aktivitas</label>
                <input
                  type="text"
                  id="namaAktivitas"
                  v-model="form.namaAktivitas"
                  class="w-full px-4 py-2 border rounded-lg"
                  placeholder="Masukkan nama aktivitas"
                  required
                />
              </div>
  
              <!-- Tanggal Audit -->
              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2" for="tanggalAudit">Tanggal Audit</label>
                <input
                  type="date"
                  id="tanggalAudit"
                  v-model="form.tanggalAudit"
                  class="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
  
              <!-- Lokasi Audit -->
              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2" for="lokasiAudit">Lokasi Audit</label>
                <input
                  type="text"
                  id="lokasiAudit"
                  v-model="form.lokasiAudit"
                  class="w-full px-4 py-2 border rounded-lg"
                  placeholder="Masukkan lokasi audit"
                  required
                />
              </div>
  
              <!-- Deskripsi Audit -->
              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2" for="deskripsiAudit">Deskripsi Audit</label>
                <textarea
                  id="deskripsiAudit"
                  v-model="form.deskripsiAudit"
                  class="w-full px-4 py-2 border rounded-lg"
                  rows="4"
                  placeholder="Jelaskan tujuan dan detail audit"
                ></textarea>
              </div>
  
              <!-- Dokumen Pendukung -->
              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2" for="dokumenPendukung">Dokumen Pendukung</label>
                <input
                  type="file"
                  id="dokumenPendukung"
                  @change="handleFileUpload"
                  class="w-full"
                />
              </div>
  
              <!-- Tombol Submit -->
              <button
                type="submit"
                class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Ajukan Audit
              </button>
            </form>
          </section>
  
          <!-- Daftar Pengajuan Audit -->
          <section>
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Daftar Pengajuan Audit</h2>
            <table class="min-w-full bg-white shadow rounded-lg">
              <thead class="bg-gray-200">
                <tr>
                  <th class="px-4 py-2 text-left text-gray-700">Nama Aktivitas</th>
                  <th class="px-4 py-2 text-left text-gray-700">Tanggal</th>
                  <th class="px-4 py-2 text-left text-gray-700">Lokasi</th>
                  <th class="px-4 py-2 text-left text-gray-700">Status</th>
                  <th class="px-4 py-2 text-left text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="audit in daftarAudit" :key="audit.id">
                  <td class="border px-4 py-2">{{ audit.namaAktivitas }}</td>
                  <td class="border px-4 py-2">{{ audit.tanggalAudit }}</td>
                  <td class="border px-4 py-2">{{ audit.lokasiAudit }}</td>
                  <td class="border px-4 py-2">
                    <span
                      :class="{
                        'text-green-600': audit.status === 'Disetujui',
                        'text-yellow-600': audit.status === 'Proses',
                        'text-red-600': audit.status === 'Ditolak'
                      }"
                    >
                      {{ audit.status }}
                    </span>
                  </td>
                  <td class="border px-4 py-2">
                    <button
                      class="text-blue-600 hover:underline mr-2"
                      @click="editAudit(audit.id)"
                    >
                      Edit
                    </button>
                    <button
                      class="text-red-600 hover:underline"
                      @click="deleteAudit(audit.id)"
                    >
                      Batalkan
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          namaAktivitas: "",
          tanggalAudit: "",
          lokasiAudit: "",
          deskripsiAudit: "",
          dokumenPendukung: null,
        },
        daftarAudit: [
          {
            id: 1,
            namaAktivitas: "Rapat Tahunan BPA",
            tanggalAudit: "2024-12-20",
            lokasiAudit: "Jakarta",
            status: "Proses",
          },
          {
            id: 2,
            namaAktivitas: "Evaluasi Semester",
            tanggalAudit: "2024-12-22",
            lokasiAudit: "Bandung",
            status: "Disetujui",
          },
        ],
      };
    },
    methods: {
      submitForm() {
        const newAudit = { ...this.form, id: Date.now(), status: "Proses" };
        this.daftarAudit.push(newAudit);
        this.resetForm();
        alert("Pengajuan audit berhasil!");
      },
      handleFileUpload(event) {
        this.form.dokumenPendukung = event.target.files[0];
      },
      resetForm() {
        this.form = {
          namaAktivitas: "",
          tanggalAudit: "",
          lokasiAudit: "",
          deskripsiAudit: "",
          dokumenPendukung: null,
        };
      },
      editAudit(id) {
        alert(`Edit pengajuan audit dengan ID: ${id}`);
      },
      deleteAudit(id) {
        this.daftarAudit = this.daftarAudit.filter((audit) => audit.id !== id);
        alert("Pengajuan audit berhasil dibatalkan.");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Tambahkan style tambahan jika diperlukan */
  </style>
  