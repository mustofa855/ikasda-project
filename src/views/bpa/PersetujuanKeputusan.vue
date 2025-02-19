<template>
    <div class="ml-64 p-6">
      <h1 class="text-3xl font-bold mb-6">Persetujuan Keputusan</h1>
      
      <!-- Tabel Daftar Keputusan -->
      <div class="bg-white p-6 rounded shadow">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-200">
            <tr>
              <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">No</th>
              <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Judul</th>
              <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Tipe</th>
              <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Deskripsi</th>
              <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Dibuat Oleh</th>
              <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Tanggal Dibuat</th>
              <th class="py-3 px-6 text-center text-sm font-medium text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(decision, index) in pendingDecisions" :key="decision.id" class="hover:bg-gray-50">
              <td class="py-3 px-6 text-sm text-gray-800">{{ index + 1 }}</td>
              <td class="py-3 px-6 text-sm text-gray-800">{{ decision.title }}</td>
              <td class="py-3 px-6 text-sm text-gray-800 capitalize">{{ decision.decision_type }}</td>
              <td class="py-3 px-6 text-sm text-gray-800">{{ decision.description }}</td>
              <td class="py-3 px-6 text-sm text-gray-800">
                {{ decision.created_by ? decision.created_by.username : '-' }}
              </td>
              <td class="py-3 px-6 text-sm text-gray-800">{{ formatDate(decision.created_at) }}</td>
              <td class="py-3 px-6 text-center">
                <button
                  class="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                  @click="openModal(decision)"
                  aria-label="Lihat Detail"
                >
                  <Icon icon="mdi:eye" class="h-5 w-5" />
                </button>
              </td>
            </tr>
            <tr v-if="pendingDecisions.length === 0">
              <td class="py-3 px-6 text-center text-sm text-gray-700" colspan="7">
                Tidak ada keputusan pending
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Modal Detail Keputusan -->
      <div
        v-if="modalVisible"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div class="bg-white rounded-lg shadow-xl w-11/12 md:w-1/2 p-8 relative space-y-6 max-h-screen overflow-y-auto">
          <!-- Tombol Tutup Modal -->
          <button @click="closeModal" class="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
    
          <h2 class="text-2xl font-bold">Detail Keputusan</h2>
    
          <!-- Tampilan Detail dengan Format Vertikal -->
          <div class="space-y-4">
            <div>
              <p class="text-sm font-semibold text-gray-700">No</p>
              <p class="text-base text-gray-800">{{ selectedDecisionIndex + 1 }}</p>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-700">Judul</p>
              <p class="text-base text-gray-800">{{ selectedDecision.title }}</p>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-700">Tipe</p>
              <p class="text-base text-gray-800 capitalize">{{ selectedDecision.decision_type }}</p>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-700">Deskripsi</p>
              <textarea
                readonly
                class="w-full p-2 border border-gray-300 rounded resize-none text-gray-800"
                rows="4"
              >{{ selectedDecision.description }}</textarea>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-700">Dibuat Oleh</p>
              <div class="inline-flex items-center">
                <p class="text-base text-gray-800">
                  {{ selectedDecision.created_by ? selectedDecision.created_by.username : '-' }}
                </p>
                <Icon
                  v-if="selectedDecision.created_by && selectedDecision.created_by.verified"
                  icon="mdi:check-decagram"
                  class="ml-1 text-blue-500"
                  width="16"
                  height="16"
                />
              </div>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-700">Tanggal Dibuat</p>
              <p class="text-base text-gray-800">{{ formatDate(selectedDecision.created_at) }}</p>
            </div>
          </div>
    
          <!-- Form Alasan (Wajib diisi) -->
          <div>
            <p class="text-sm font-semibold text-gray-700 mb-1">
              Alasan <span class="text-red-600">*</span>
            </p>
            <textarea
              v-model="modalReason"
              class="w-full p-3 border border-gray-300 rounded resize-none"
              rows="3"
              placeholder="Masukkan alasan persetujuan/penolakan"
              required
            ></textarea>
          </div>
    
          <!-- Tombol Aksi di Modal -->
          <div class="flex justify-end space-x-4">
            <button
              @click="confirmApproveModal(selectedDecision)"
              class="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              <Icon icon="mdi:check-circle" class="h-5 w-5 inline-block mr-1" />
              Setujui
            </button>
            <button
              @click="confirmRejectModal(selectedDecision)"
              class="flex items-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              <Icon icon="mdi:close-circle" class="h-5 w-5 inline-block mr-1" />
              Tolak
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
    
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  import { Icon } from "@iconify/vue";
    
  export default {
    name: "PersetujuanKeputusan",
    components: { Icon },
    data() {
      return {
        decisions: [],
        selectedDecision: null,
        modalVisible: false,
        modalReason: "",
        selectedDecisionIndex: null,
      };
    },
    computed: {
      pendingDecisions() {
        return this.decisions.filter(
          (decision) => decision.status.toLowerCase() === "pending"
        );
      },
    },
    mounted() {
      this.fetchDecisions();
    },
    methods: {
      fetchDecisions() {
        const token = localStorage.getItem("access_token");
        axios
          .get("http://127.0.0.1:8000/api/strategic-decisions/", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            this.decisions = response.data;
          })
          .catch((error) => {
            console.error("Error fetching decisions:", error);
          });
      },
      openModal(decision) {
        this.selectedDecision = decision;
        // Cari indeks dari decision pada array pendingDecisions
        this.selectedDecisionIndex = this.pendingDecisions.findIndex(
          (d) => d.id === decision.id
        );
        this.modalReason = "";
        this.modalVisible = true;
      },
      closeModal() {
        this.modalVisible = false;
        this.selectedDecision = null;
        this.modalReason = "";
        this.selectedDecisionIndex = null;
      },
      confirmApproveModal(decision) {
        if (!this.modalReason.trim()) {
          Swal.fire("Error", "Field Alasan wajib diisi", "error");
          return;
        }
        Swal.fire({
          title: "Konfirmasi",
          text: "Apakah Anda yakin ingin menyetujui keputusan ini?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya, setujui",
          cancelButtonText: "Batal"
        }).then((result) => {
          if (result.isConfirmed) {
            this.approveDecision(decision, this.modalReason);
            this.closeModal();
          }
        });
      },
      confirmRejectModal(decision) {
        if (!this.modalReason.trim()) {
          Swal.fire("Error", "Field Alasan wajib diisi", "error");
          return;
        }
        Swal.fire({
          title: "Konfirmasi",
          text: "Apakah Anda yakin ingin menolak keputusan ini?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya, tolak",
          cancelButtonText: "Batal"
        }).then((result) => {
          if (result.isConfirmed) {
            this.rejectDecision(decision, this.modalReason);
            this.closeModal();
          }
        });
      },
      approveDecision(decision, reason) {
        const token = localStorage.getItem("access_token");
        axios
          .post(
            `http://127.0.0.1:8000/api/strategic-decisions/${decision.id}/approve/`,
            { approval_reason: reason },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((response) => {
            Swal.fire("Disetujui!", response.data.detail, "success");
            this.fetchDecisions();
          })
          .catch((error) => {
            Swal.fire("Error", "Gagal menyetujui keputusan", "error");
            console.error("Error approving decision:", error);
          });
      },
      rejectDecision(decision, reason) {
        const token = localStorage.getItem("access_token");
        axios
          .post(
            `http://127.0.0.1:8000/api/strategic-decisions/${decision.id}/reject/`,
            { approval_reason: reason },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((response) => {
            Swal.fire("Ditolak", response.data.detail, "success");
            this.fetchDecisions();
          })
          .catch((error) => {
            Swal.fire("Error", "Gagal menolak keputusan", "error");
            console.error("Error rejecting decision:", error);
          });
      },
      formatDate(dateStr) {
        const options = { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        };
        return new Date(dateStr).toLocaleDateString(undefined, options);
      },
    },
  };
  </script>
    
  <style scoped>
  /* Tambahan styling jika diperlukan */
  </style>
  