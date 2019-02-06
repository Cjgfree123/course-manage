import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('../views/Login.vue')
const Home = () => import('../views/Home.vue')
const PaperDetail = () => import('../views/PaperDetail.vue')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/paper/:testId',
      name: 'PaperDetail',
      component: PaperDetail,
    },
  ]
})
