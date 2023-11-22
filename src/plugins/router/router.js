import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/plugins/screens/home/home.vue')
  },

  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('@/plugins/screens/notifications_page/notifications_page.vue')
  },
  {
    path: '/notifications/detail/:id',
    name: 'Notifications-Detail',
    component: () => import('@/plugins/screens/notifications_page/notifications_detail.vue') 
  },
  {
    path: '/notifications/create',
    name: 'Notifications-Create',
    component: () => import('@/plugins/screens/notifications_page/notifications_create.vue') 
  },

  {
    path: '/about',
    name: 'About',
    component: () => import('@/plugins/screens/about_page/about_page.vue')
  },

  {
    path: '/feedback',
    name: 'Feedback',
    component: () => import('@/plugins/screens/feedback_page/feedback_page.vue')
  },
  {
    path: '/feedback/create',
    name: 'Feedback-Create',
    component: () => import('@/plugins/screens/feedback_page/feedback_create.vue')
  },

  {
    path: '/photos',
    name: 'Photos',
    component: () => import('@/plugins/screens/photos_page/photos_page.vue')
  },

  {
    path: '/schedule',
    name: 'Schedule',
    component: () => import('@/plugins/screens/schedule/schedule.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
  
export default router