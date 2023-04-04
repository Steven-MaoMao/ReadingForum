import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import VueCookies from "vue-cookies"

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
  }, {
    name: 'user',
    path: '/user',
    component: () => import('../views/user.vue'),
    beforeEnter: (to, from) => {
      if (to.query.userId == JSON.parse(sessionStorage.getItem('id'))) {
        return { name: 'home' }
      }
    },
  }, {
    name: 'book',
    path: '/book',
    component: () => import('../views/book.vue')
  }]
})

router.beforeEach(async (to, from) => {
  if (to.name !== 'login' && to.name !== 'register') {
    if (JSON.parse(sessionStorage.getItem('token')) === null) {
      if (VueCookies.get('token') === null) {
        return { name: 'login' }
      } else {
        sessionStorage.setItem('token', JSON.stringify(VueCookies.get('token')))
      }
    }
    if (JSON.parse(sessionStorage.getItem('username')) === null) {
      const { data: res } = await axios.get('/user/userInfo')
      if (res.code === 1) {
        sessionStorage.setItem('id', JSON.stringify(res.data.userInfo.id))
        sessionStorage.setItem('username', JSON.stringify(res.data.userInfo.username))
        sessionStorage.setItem('avatar', JSON.stringify(res.data.userInfo.avatar))
        sessionStorage.setItem('nickname', JSON.stringify(res.data.userInfo.nickname))
        sessionStorage.setItem('gender', JSON.stringify(res.data.userInfo.gender))
        sessionStorage.setItem('birthday', JSON.stringify(res.data.userInfo.birthday))
        sessionStorage.setItem('phone', JSON.stringify(res.data.userInfo.phone))
        sessionStorage.setItem('email', JSON.stringify(res.data.userInfo.email))
        sessionStorage.setItem('location', JSON.stringify(res.data.userInfo.location))
        sessionStorage.setItem('bio', JSON.stringify(res.data.userInfo.bio))
      } else {
        console.log(res.message)
      }
    }
  }
})

export default router
