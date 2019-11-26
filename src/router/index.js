import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import BoardList from '@/components/BoardList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/boardlist',
    name: 'boardlist',
    component: BoardList
  }
]

const router = new VueRouter({
  routes
})

export default router
