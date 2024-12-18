import { createRouter, createWebHistory } from 'vue-router';

// Import semua views
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import BlogView from '@/views/BlogView.vue';
import EventView from '@/views/EventView.vue';
import GalleryView from '@/views/GalleryView.vue';
import LoginView from '@/views/LoginView.vue';

import DashboardAlumni from '@/views/alumni/DashboardAlumni.vue';
import ProfileAlumni from '@/views/alumni/ProfileAlumni.vue';
import EventAlumni from '@/views/alumni/EventAlumni.vue';
import DonasiView from '@/views/alumni/DonasiView.vue';
import ForumDiskusi from '@/views/alumni/ForumDiskusi.vue';

import DashboardDireksi from '@/views/direksi/DashboardDireksi.vue';
import AlumniManagement from '@/views/direksi/AlumniManagement.vue';
import EventManagement from '@/views/direksi/EventManagement.vue';
import KesanPesan from '@/views/alumni/KesanPesan.vue';
import ContentManagement from '@/views/direksi/ContentManagement.vue';
import FinancialReports from '@/views/direksi/FinancialReports.vue';
import DireksiStatistic from '@/views/direksi/DireksiStatistic.vue';

// Definisikan routes
const routes = [
  // Halaman umum
  { path: '/', component: HomeView, meta: { layout: 'umum' } },
  { path: '/about', component: AboutView, meta: { layout: 'umum' } },
  { path: '/blog', component: BlogView, meta: { layout: 'umum' } },
  { path: '/events', component: EventView, meta: { layout: 'umum' } },
  { path: '/gallery', component: GalleryView, meta: { layout: 'umum' } },
  { path: '/login', component: LoginView, meta: { layout: 'umum' } },

  // Halaman alumni
  { path: '/alumni', component: DashboardAlumni, meta: { layout: 'alumni' } },
  { path: '/alumni/profile-alumni', component: ProfileAlumni, meta: { layout: 'alumni' } },
  { path: '/alumni/event-alumni', component: EventAlumni, meta: { layout: 'alumni' } },
  { path: '/alumni/kesan-pesan', component: KesanPesan, meta: { layout: 'alumni' } },
  { path: '/alumni/donasi', component: DonasiView, meta: { layout: 'alumni' } },
  { path: '/alumni/forum-diskusi', component: ForumDiskusi, meta: { layout: 'alumni' } },

  // Halaman direksi
  { path: '/direksi', component: DashboardDireksi, meta: { layout: 'direksi' } },
  { path: '/direksi/statistic', component: DireksiStatistic, meta: { layout: 'direksi' } },
  { path: '/direksi/alumni-management', component: AlumniManagement, meta: { layout: 'direksi' } },
  { path: '/direksi/event-management', component: EventManagement, meta: { layout: 'direksi' } },
  { path: '/direksi/content-management', component: ContentManagement, meta: { layout: 'direksi' } },
  { path: '/direksi/financial-reports', component: FinancialReports, meta: { layout: 'direksi' } },
];

// Buat router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
