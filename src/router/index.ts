import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/index.vue'),
      meta: {
        title: 'Home',
        description: 'Home page',
        KeepAlive: true
      }
    }
  ]
})

export default router
