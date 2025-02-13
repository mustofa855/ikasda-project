<template>
    <div class="ml-64 p-6">
      <h1 class="text-3xl font-bold mb-6 text-center">Pendaftaran Event Alumni</h1>
      <div v-if="registrations.length" class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
          <thead>
            <tr class="bg-gray-100">
              <th class="py-2 px-4 border-b text-left">Event</th>
              <th class="py-2 px-4 border-b text-left">Alumni</th>
              <th class="py-2 px-4 border-b text-left">Nomor Telepon</th>
              <th class="py-2 px-4 border-b text-left">Tanggal Pendaftaran</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="reg in registrations"
              :key="reg.id"
              class="hover:bg-gray-50"
            >
              <td class="py-2 px-4 border-b">{{ reg.event_title }}</td>
              <td class="py-2 px-4 border-b">{{ reg.user_username }}</td>
              <td class="py-2 px-4 border-b">{{ reg.user_phone }}</td>
              <td class="py-2 px-4 border-b">{{ formatDate(reg.registration_date) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-center text-gray-500">
        Tidak ada pendaftaran event.
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "DireksiEventRegistrations",
    data() {
      return {
        registrations: []
      };
    },
    mounted() {
      this.fetchRegistrations();
    },
    methods: {
      fetchRegistrations() {
        const token = localStorage.getItem("access_token");
        axios
          .get("http://127.0.0.1:8000/api/event-registrations/", {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
          .then(response => {
            // Mapping data agar field yang kita butuhkan bisa diakses dengan mudah.
            this.registrations = response.data.map(reg => ({
              id: reg.id,
              event_title: reg.event.title,
              user_username: reg.user.username,
              user_phone: reg.user.phone,
              registration_date: reg.registration_date
            }));
          })
          .catch(error => {
            console.error("Error fetching event registrations:", error);
          });
      },
      formatDate(dateStr) {
        const options = {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        };
        return new Date(dateStr).toLocaleDateString(undefined, options);
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
    border: 1px solid #e5e7eb; /* Tailwind gray-200 */
    padding: 0.75rem;
  }
  th {
    background-color: #f3f4f6; /* Tailwind gray-100 */
    font-weight: 600;
  }
  </style>
  