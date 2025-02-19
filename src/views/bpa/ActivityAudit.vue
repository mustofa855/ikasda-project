<template>
  <div class="ml-64 p-6">
    <h1 class="text-3xl font-bold mb-6">Audit Aktivitas</h1>
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

onMounted(() => {
  fetchAuditLogs();
});
</script>
