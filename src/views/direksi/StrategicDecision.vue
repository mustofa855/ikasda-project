<template>
  <div class="ml-64 p-6">
    <h1 class="text-3xl font-bold mb-6">Keputusan Strategis</h1>
    
    <!-- Form Tambah Keputusan Strategis -->
    <div class="mb-6 bg-white p-6 rounded shadow">
      <h2 class="text-2xl font-semibold mb-4">Tambah Keputusan Strategis</h2>
      <form @submit.prevent="submitDecision">
        <div class="mb-4">
          <label class="block text-gray-700">Judul</label>
          <input
            type="text"
            v-model="newDecision.title"
            class="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Deskripsi</label>
          <textarea
            v-model="newDecision.description"
            class="w-full border border-gray-300 p-2 rounded"
            rows="3"
            required
          ></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Tipe Keputusan</label>
          <select
            v-model="newDecision.decision_type"
            class="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="" disabled>Pilih tipe keputusan</option>
            <option value="event">Event Besar</option>
            <option value="policy">Kebijakan</option>
          </select>
        </div>
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Kirim Keputusan
        </button>
      </form>
    </div>
    
    <!-- Daftar Keputusan Strategis -->
    <div class="bg-white p-6 rounded shadow">
      <h2 class="text-2xl font-semibold mb-4">Daftar Keputusan Strategis</h2>
      <table class="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="py-2 px-4 border border-gray-300">ID</th>
            <th class="py-2 px-4 border border-gray-300">Judul</th>
            <th class="py-2 px-4 border border-gray-300">Tipe</th>
            <th class="py-2 px-4 border border-gray-300">Status</th>
            <th class="py-2 px-4 border border-gray-300">Tanggal Dibuat</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="decision in strategicDecisions"
            :key="decision.id"
            class="hover:bg-gray-100"
          >
            <td class="py-2 px-4 border border-gray-300">{{ decision.id }}</td>
            <td class="py-2 px-4 border border-gray-300">{{ decision.title }}</td>
            <td class="py-2 px-4 border border-gray-300">{{ decision.decision_type }}</td>
            <td class="py-2 px-4 border border-gray-300">{{ decision.status }}</td>
            <td class="py-2 px-4 border border-gray-300">{{ formatDate(decision.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "KeputusanStrategis",
  data() {
    return {
      strategicDecisions: [],
      newDecision: {
        title: "",
        description: "",
        decision_type: "",
      },
    };
  },
  mounted() {
    this.fetchStrategicDecisions();
  },
  methods: {
    fetchStrategicDecisions() {
      const token = localStorage.getItem("access_token");
      axios
        .get("http://127.0.0.1:8000/api/strategic-decisions/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.strategicDecisions = response.data;
        })
        .catch((error) => {
          console.error("Error fetching strategic decisions:", error);
        });
    },
    submitDecision() {
      const token = localStorage.getItem("access_token");
      axios
        .post("http://127.0.0.1:8000/api/strategic-decisions/", this.newDecision, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          this.newDecision = { title: "", description: "", decision_type: "" };
          this.fetchStrategicDecisions();
        })
        .catch((error) => {
          console.error("Error submitting decision:", error);
        });
    },
    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
/* Tambahan styling jika diperlukan */
</style>
