<template>
    <div class="dashboard-layout">
      <Sidebar /> <!-- Sidebar khusus dashboard -->
      <main class="dashboard-content">
        <router-view />
      </main>
    </div>
  </template>
  
  <script>
  import Sidebar from "@/components/AppSidebar.vue";
  
  export default {
    name: "DashboardLayout",
    components: {
      Sidebar,
    },
  };
  </script>
  
  <style scoped>
  .dashboard-layout {
    display: flex;
  }
  .dashboard-content {
    flex: 1;
    padding: 20px;
  }
  </style>
  