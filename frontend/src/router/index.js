import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Message from '../views/Message.vue'
import NewMessage from '../views/NewMessage.vue'

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
    path: '/Message',
    name: 'Message',
    component: Message
  },

  {
    path: '/NewMessage',
    name: 'NewMessage',
    component: NewMessage
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
