import { createRouter, createWebHistory } from 'vue-router'
import cookies from "vue-cookies"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    name: 'login',
    path: '/login',
    component: () => import('../views/login.vue')
  }, {
    name: 'register',
    path: '/register',
    component: () => import('../views/register.vue')
  }, {
    name: 'index',
    path: '/',
    component: () => import('../views/index.vue')
  }, {
    name: 'home',
    path: '/home',
    component: () => import('../views/home.vue')
  }]
})

router.beforeEach((to, from) => {
  if ((cookies.get('token') === null || sessionStorage.getItem('username') === null) && to.name !== 'login' && to.name !== 'register') {
    return { name: 'login' }
  }
})

export default router
