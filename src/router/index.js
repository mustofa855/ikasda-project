import { createRouter, createWebHistory } from 'vue-router';

// Import semua views
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import NewsView from '@/views/NewsView.vue';
import NewsDetailView from '@/views/NewsDetailView.vue';
import EventView from '@/views/EventView.vue';
import GalleryView from '@/views/GalleryView.vue';
import DetailGalleryView from '@/views/DetailGalleryView.vue';
import LoginView from '@/views/LoginView.vue';

import DashboardAlumni from '@/views/alumni/DashboardAlumni.vue';
import ProfileAlumni from '@/views/alumni/ProfileAlumni.vue';
import EventAlumni from '@/views/alumni/EventAlumni.vue';
import NewsAlumni from '@/views/alumni/AlumniNews.vue';
import EventDetailView from '@/views/alumni/EventDetailView.vue';
import DonasiView from '@/views/alumni/DonasiView.vue';
import ForumDiskusi from '@/views/alumni/ForumDiskusi.vue';

import DashboardDireksi from '@/views/direksi/DashboardDireksi.vue';
import EventRegistration from '@/views/direksi/EventRegistration.vue';
import AlumniManagement from '@/views/direksi/AlumniManagement.vue';
import UserVerification from '@/views/direksi/UserVerification.vue';
import EventManagement from '@/views/direksi/EventManagement.vue';
import KesanPesan from '@/views/alumni/KesanPesan.vue';
import ContentManagement from '@/views/direksi/ContentManagement.vue';
import FinancialReports from '@/views/direksi/FinancialReports.vue';
import DireksiStatistic from '@/views/direksi/DireksiStatistic.vue';
import BPADecision from '@/views/direksi/BPADecision.vue';
import StrategicDecision from '@/views/direksi/StrategicDecision.vue';
import StrategicReports from '@/views/direksi/StrategicReports.vue';
import GalleryManagement from '@/views/direksi/GalleryManagement.vue';

import DashboardBpa from '@/views/bpa/DashboardBpa.vue';
import ActivityAudit from '@/views/bpa/ActivityAudit.vue';
import AuditReports from '@/views/bpa/AuditReports.vue';
import PengawasanEvent from '@/views/bpa/PengawasanEvent.vue';
import EventBpa from '@/views/bpa/EventBpa.vue';
import RegistrationView from '@/views/RegistrationView.vue';
import AlumniView from '@/views/alumni/AlumniView.vue';

// Definisikan routes
const routes = [
  // Halaman umum
  { path: '/', component: HomeView, meta: { layout: 'umum' } },
  { path: '/about', component: AboutView, meta: { layout: 'umum' } },
  { path: '/news', component: NewsView, meta: { layout: 'umum' } },
  { path: '/news/:id', name: 'news-detail', component: NewsDetailView, meta: { layout: 'umum' } },
  { path: '/events', component: EventView, meta: { layout: 'umum' } },
  { path: '/gallery', component: GalleryView, meta: { layout: 'umum' } },
  { path: '/gallery/:id', component: DetailGalleryView, meta: { layout: 'umum' } },
  { path: '/login', component: LoginView, meta: { layout: 'umum' } },
  { path: '/register', component: RegistrationView, meta: { layout: 'umum' } },

  // Halaman alumni
  { 
    path: '/alumni', 
    component: DashboardAlumni, 
    meta: { requiresAuth: true, role: 'alumni', layout: 'alumni' }
  },
  { 
    path: '/alumni/profile-alumni', 
    component: ProfileAlumni, 
    meta: { requiresAuth: true, role: 'alumni', layout: 'alumni' }
  },
  { 
    path: '/alumni/news', 
    component: NewsAlumni, 
    meta: { requiresAuth: true, role: 'alumni', layout: 'alumni' }
  },
  { 
    path: '/alumni/event-alumni', 
    component: EventAlumni, 
    meta: { requiresAuth: true, role: 'alumni', layout: 'alumni' }
  },
  { 
    path: '/alumni/kesan-pesan', 
    component: KesanPesan, 
    meta: { requiresAuth: true, role: 'alumni', layout: 'alumni' }
  },
  { 
    path: '/alumni/donasi', 
    component: DonasiView, 
    meta: { requiresAuth: true, role: 'alumni', layout: 'alumni' }
  },
  { 
    path: '/alumni/forum-diskusi', 
    component: ForumDiskusi, 
    meta: { requiresAuth: true, role: 'alumni', layout: 'alumni' }
  },
  { 
    path: '/alumni/daftar-alumni', 
    component: AlumniView, 
    meta: { requiresAuth: true, role: 'alumni', layout: 'alumni' }
  },


  // Halaman direksi
  { path: '/direksi', component: DashboardDireksi, meta: { layout: 'direksi' } },
  { path: '/direksi/event-registration', component: EventRegistration, meta: { layout: 'direksi' } },
  { path: '/direksi/statistic', component: DireksiStatistic, meta: { layout: 'direksi' } },
  { path: '/direksi/alumni-management', component: AlumniManagement, meta: { layout: 'direksi' } },
  { path: '/direksi/user-verification', component: UserVerification, meta: { layout: 'direksi' } },
  { path: '/direksi/gallery-management', component: GalleryManagement, meta: { layout: 'direksi' } },
  { path: '/direksi/event-management', component: EventManagement, meta: { layout: 'direksi' } },
  { path: '/direksi/content-management', component: ContentManagement, meta: { layout: 'direksi' } },
  { path: '/direksi/financial-reports', component: FinancialReports, meta: { layout: 'direksi' } },
  { path: '/direksi/keputusan-bpa', component: BPADecision, meta: { layout: 'direksi' } },
  { path: '/direksi/strategic-decision', component: StrategicDecision, meta: { layout: 'direksi' } },
  { path: '/direksi/strategic-reports', component: StrategicReports, meta: { layout: 'direksi' } },

  // Halaman bpa
  { path: '/bpa', component: DashboardBpa, meta: { layout: 'bpa' } },
  { path: '/bpa/activity-audit', component: ActivityAudit, meta: { layout: 'bpa' } },
  { path: '/bpa/audit-reports', component: AuditReports, meta: { layout: 'bpa' } },
  { path: '/bpa/pengawasan-event', component: PengawasanEvent, meta: { layout: 'bpa' } },
  { path: '/bpa/event-bpa', component: EventBpa, meta: { layout: 'bpa' } },
];

// Buat router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Jika route yang dituju memiliki meta requiresAuth, cek token
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('access_token');
    if (!token) {
      // Jika tidak ada token, arahkan ke halaman login
      next({ path: '/login' });
    } else {
      // Jika perlu, Anda juga dapat melakukan pengecekan role di sini
      // Misalnya, decode token dan pastikan role sesuai dengan to.meta.role.
      // Namun untuk solusi dasar, cukup cek token.
      next();
    }
  } else {
    // Jika route tidak memerlukan autentikasi, lanjutkan navigasi
    next();
  }
});

export default router;
