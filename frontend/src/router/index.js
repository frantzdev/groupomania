import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Messages from '../views/Messages.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/Signup',
    name: 'Signup',
    component: Signup
  },

  {
    path: '/Login',
    name: 'Login',
    component: Login
  },

  {
    path: '/Messages',
    name: 'Messages',
    component: Messages
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
