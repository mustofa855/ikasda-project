<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h1>
        <form @submit.prevent="handleLogin">
          <!-- Email Input -->
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              
            />
          </div>
  
          <!-- Password Input -->
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              
            />
          </div>
  
          <!-- Login Button -->
          <router-link to="/dashboard-alumni" class="mt-6">
            <button
              type="submit"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </router-link>
        </form>
  
        <!-- Links to Home and Register -->
        <div class="text-center mt-4 space-y-2">
          <router-link to="/" class="text-blue-600 hover:underline">Back to Home</router-link>
          <p class="text-sm text-gray-600">Belum punya akun? 
            <router-link to="/register" class="text-blue-600 hover:underline font-medium">Register</router-link>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoginView",
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
    //   handleLogin() {
    //     // Simulate a login action
    //     if (this.email === "alumni@ikasda.com" && this.password === "password") {
    //       // Redirect to Dashboard
    //       this.$router.push("/dashboard/profile");
    //     } else {
    //       alert("Invalid email or password. Please try again.");
    //     }
    //   },
    },
  };
  </script>
  
  <style scoped>
  /* Tambahkan gaya tambahan jika diperlukan */
  </style>
  