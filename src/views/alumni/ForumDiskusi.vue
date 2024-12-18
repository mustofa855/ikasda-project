<template>
    <div class="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <!-- Header Forum Diskusi -->
      <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Forum Diskusi Alumni
      </h1>
  
      <!-- Form Membuat Postingan -->
      <div class="mb-8">
        <h2 class="text-lg font-semibold mb-4">Buat Postingan Baru</h2>
        <form @submit.prevent="createPost">
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700"
              >Judul Diskusi</label
            >
            <input
              v-model="newPost.title"
              id="title"
              type="text"
              class="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Masukkan judul diskusi"
              required
            />
          </div>
  
          <div class="mb-4">
            <label for="content" class="block text-sm font-medium text-gray-700"
              >Isi Diskusi</label
            >
            <textarea
              v-model="newPost.content"
              id="content"
              rows="4"
              class="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tuliskan isi diskusi Anda"
              required
            ></textarea>
          </div>
  
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Kirim Postingan
          </button>
        </form>
      </div>
  
      <!-- Daftar Diskusi -->
      <div>
        <h2 class="text-lg font-semibold mb-4">Daftar Diskusi</h2>
        <div
          v-for="(post, index) in posts"
          :key="index"
          class="mb-6 p-4 border rounded-lg shadow-md"
        >
          <h3 class="text-xl font-semibold mb-2">{{ post.title }}</h3>
          <p class="text-gray-700 mb-4">{{ post.content }}</p>
  
          <!-- Form Membalas Diskusi -->
          <div>
            <h4 class="text-md font-semibold mb-2">Balasan</h4>
            <ul class="mb-4">
              <li
                v-for="(reply, rIndex) in post.replies"
                :key="rIndex"
                class="pl-4 border-l-2 border-blue-300 mb-2 text-gray-600"
              >
                {{ reply }}
              </li>
            </ul>
  
            <div class="flex items-center gap-2">
              <input
                v-model="replyContent[index]"
                type="text"
                placeholder="Tulis balasan Anda"
                class="block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                @click="addReply(index)"
                class="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Balas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ForumDiskusi",
    data() {
      return {
        // Postingan Baru
        newPost: {
          title: "",
          content: "",
        },
        // Daftar Postingan Diskusi
        posts: [
          {
            title: "Pengalaman Kuliah di Luar Negeri",
            content: "Ayo diskusikan pengalaman kuliah di luar negeri dan tipsnya!",
            replies: ["Sangat bermanfaat! Terima kasih!", "Saya tertarik ikut diskusi ini."],
          },
          {
            title: "Persiapan Reuni Akbar 2024",
            content: "Bagaimana pendapat teman-teman tentang acara reuni mendatang?",
            replies: ["Acara yang dinanti-nanti!", "Semoga bisa hadir tahun ini."],
          },
        ],
        // Balasan Diskusi
        replyContent: [],
      };
    },
    methods: {
      // Menambahkan Postingan Baru
      createPost() {
        if (this.newPost.title.trim() && this.newPost.content.trim()) {
          this.posts.push({
            title: this.newPost.title,
            content: this.newPost.content,
            replies: [],
          });
          this.newPost.title = "";
          this.newPost.content = "";
          alert("Postingan berhasil dibuat!");
        }
      },
      // Menambahkan Balasan ke Postingan
      addReply(postIndex) {
        if (this.replyContent[postIndex]?.trim()) {
          this.posts[postIndex].replies.push(this.replyContent[postIndex]);
          this.$set(this.replyContent, postIndex, ""); // Mengosongkan input balasan
          alert("Balasan berhasil ditambahkan!");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Optional tambahan style */
  </style>
  