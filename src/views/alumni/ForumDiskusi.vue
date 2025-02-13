<template>
  <div class="mx-16 my-8 p-6 bg-white shadow-lg rounded-lg">
    <!-- Header -->
    <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">
      Forum Diskusi Alumni
    </h1>

    <!-- Form Buat Postingan Baru -->
    <div class="mb-10 border-b pb-6">
      <h2 class="text-2xl font-semibold mb-4">Buat Postingan Baru</h2>
      <form @submit.prevent="createPost">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700">
            Judul Diskusi
          </label>
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
          <label for="content" class="block text-sm font-medium text-gray-700">
            Isi Diskusi
          </label>
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
      <h2 class="text-2xl font-semibold mb-6">Daftar Diskusi</h2>
      <div v-if="loading" class="text-center text-gray-600">Loading...</div>
      <div v-else>
        <!-- Tampilkan diskusi per halaman -->
        <div
          v-for="post in paginatedPosts"
          :key="post.id"
          class="mb-8 p-6 border rounded-lg shadow-md bg-gray-50"
        >
          <div class="mb-2">
            <h3 class="text-xl font-bold text-gray-800">{{ post.title }}</h3>
            <!-- Tampilan nama dengan foto profil di sampingnya -->
            <div class="flex items-center gap-2">
              <img
                v-if="post.profile_photo"
                :src="post.profile_photo"
                alt="Foto Profil"
                class="w-8 h-8 rounded-full object-cover"
              />
              <span class="text-sm font-medium">{{ post.full_name }}</span>
              <span class="text-sm text-gray-500">• {{ formatDate(post.created_at) }}</span>
            </div>
          </div>
          <p class="text-gray-700 mb-4">{{ post.content }}</p>

          <!-- Bagian Balasan -->
          <div class="mt-4 border-t pt-4">
            <h4 class="text-lg font-semibold mb-3">Balasan</h4>
            <ul class="mb-4 space-y-2">
              <!-- Menampilkan balasan (hanya sejumlah yang sudah diatur) -->
              <li
                v-for="reply in post.replies.slice(0, getVisibleReplies(post.id))"
                :key="reply.id"
                class="pl-4 border-l-4 border-blue-300 text-gray-600"
              >
                <p class="text-sm font-medium">
                  {{ reply.full_name }} • {{ formatDate(reply.created_at) }}
                </p>
                <p class="text-gray-700">{{ reply.content }}</p>
              </li>
            </ul>
            <!-- Tombol More Replies jika ada balasan tersisa -->
            <div
              v-if="post.replies.length > getVisibleReplies(post.id)"
              class="mb-4"
            >
              <button
                @click="showMoreReplies(post.id)"
                class="text-blue-500 hover:underline"
              >
                More replies
              </button>
            </div>
            <div class="flex items-center gap-2">
              <input
                v-model="replyContent[post.id]"
                type="text"
                placeholder="Tulis balasan Anda"
                class="flex-1 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
              />
              <button
                @click="addReply(post.id)"
                class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Balas
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div class="flex justify-center items-center space-x-2 mt-8">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="{
              'bg-blue-500 text-white': currentPage === page,
              'bg-gray-200 text-black': currentPage !== page
            }"
            class="cursor-pointer px-3 py-1 rounded"
          >
            {{ page }}
          </span>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ForumDiskusi",
  data() {
    return {
      newPost: {
        title: "",
        content: "",
      },
      posts: [],
      replyContent: {}, // key: post.id, value: reply text
      visibleReplies: {}, // key: post.id, value: jumlah balasan yang tampil
      loading: false,
      // Properti pagination
      currentPage: 1,
      postsPerPage: 5,
    };
  },
  computed: {
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.postsPerPage;
      const end = this.currentPage * this.postsPerPage;
      return this.posts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.posts.length / this.postsPerPage);
    },
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    getVisibleReplies(postId) {
      return this.visibleReplies[postId] !== undefined
        ? this.visibleReplies[postId]
        : 3;
    },
    showMoreReplies(postId) {
      const current = this.getVisibleReplies(postId);
      this.visibleReplies[postId] = current + 3;
    },
    formatDate(dateStr) {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now - date;
      const diffSeconds = Math.floor(diffMs / 1000);
      if (diffSeconds < 60) {
        return "baru saja diupload";
      }
      const diffMinutes = Math.floor(diffSeconds / 60);
      if (diffMinutes < 60) {
        return `${diffMinutes} menit yang lalu`;
      }
      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours < 24) {
        return `${diffHours} jam yang lalu`;
      }
      const day = date.getDate();
      const year = date.getFullYear();
      const monthIndex = date.getMonth();
      const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];
      const monthName = months[monthIndex];
      return `${day} ${monthName} ${year}`;
    },
    fetchPosts() {
      this.loading = true;
      axios
        .get("http://127.0.0.1:8000/api/discussions/")
        .then((response) => {
          this.posts = response.data;
          // Inisialisasi visibleReplies untuk tiap postingan
          this.posts.forEach((post) => {
            if (this.visibleReplies[post.id] === undefined) {
              this.visibleReplies[post.id] = 3;
            }
          });
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching discussions:", error);
          this.loading = false;
        });
    },
    createPost() {
      if (!this.newPost.title.trim() || !this.newPost.content.trim()) {
        alert("Judul dan isi diskusi tidak boleh kosong!");
        return;
      }
      axios
        .post("http://127.0.0.1:8000/api/discussions/", this.newPost, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          this.newPost.title = "";
          this.newPost.content = "";
          alert("Postingan berhasil dibuat!");
          this.fetchPosts();
        })
        .catch((error) => {
          console.error("Error creating post:", error);
          alert("Gagal membuat postingan! Pastikan Anda sudah login.");
        });
    },
    addReply(postId) {
      const content = this.replyContent[postId];
      if (!content || !content.trim()) {
        alert("Balasan tidak boleh kosong!");
        return;
      }
      const payload = { post: postId, content };
      axios
        .post("http://127.0.0.1:8000/api/discussion-replies/", payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          this.replyContent[postId] = "";
          alert("Balasan berhasil ditambahkan!");
          this.fetchPosts();
        })
        .catch((error) => {
          console.error("Error adding reply:", error);
          alert("Gagal menambahkan balasan! Pastikan Anda sudah login.");
        });
    },
    goToPage(page) {
      this.currentPage = page;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>

<style scoped>
/* Anda dapat menambahkan style tambahan sesuai keinginan */
</style>
