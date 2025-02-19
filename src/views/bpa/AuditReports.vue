<template>
  <div class="ml-64 p-6">
    <h1 class="text-3xl font-bold mb-6">Laporan Audit</h1>
    <div class="mb-4">
      <button @click="exportReport" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
        Export ke Excel
      </button>
    </div>
    <div class="bg-white p-6 rounded shadow">
      <table class="min-w-full divide-y divide-gray-300">
        <thead class="bg-gray-200">
          <tr>
            <th class="py-3 px-4 text-left text-sm font-medium text-gray-700">No</th>
            <th class="py-3 px-4 text-left text-sm font-medium text-gray-700">User</th>
            <th class="py-3 px-4 text-left text-sm font-medium text-gray-700">Action</th>
            <th class="py-3 px-4 text-left text-sm font-medium text-gray-700">Details</th>
            <th class="py-3 px-4 text-left text-sm font-medium text-gray-700">Timestamp</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-300">
          <tr v-for="(log, index) in auditLogs" :key="log.id" class="hover:bg-gray-50">
            <td class="py-3 px-4 text-sm text-gray-800">{{ index + 1 }}</td>
            <td class="py-3 px-4 text-sm text-gray-800">{{ log.user ? log.user.username : '-' }}</td>
            <td class="py-3 px-4 text-sm text-gray-800">{{ log.action }}</td>
            <td class="py-3 px-4 text-sm text-gray-800">{{ log.details }}</td>
            <td class="py-3 px-4 text-sm text-gray-800">{{ formatDate(log.timestamp) }}</td>
          </tr>
          <tr v-if="auditLogs.length === 0">
            <td class="py-3 px-4 text-center text-sm text-gray-700" colspan="5">
              Tidak ada log audit.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import * as XLSX from 'xlsx';

const auditLogs = ref([]);

const formatDate = (dateStr) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const fetchAuditLogs = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get("http://127.0.0.1:8000/api/audit-logs/", {
      headers: { Authorization: `Bearer ${token}` }
    });
    auditLogs.value = response.data;
  } catch (error) {
    console.error("Error fetching audit logs:", error);
  }
};

const exportReport = () => {
  const exportData = auditLogs.value.map((log, index) => ({
    "No": index + 1,
    "User": log.user ? log.user.username : '-',
    "Action": log.action,
    "Details": log.details,
    "Timestamp": log.timestamp,
  }));
  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Audit Report");
  XLSX.writeFile(wb, "Audit_Report.xlsx");
};

onMounted(() => {
  fetchAuditLogs();
});
</script>
