import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Demo from '@/pages/Demo'
import CheckCard from '@/pages/CheckCard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/checkcard/:tid',
      name: 'CheckCard',
      component: CheckCard
    },
    {
      path: '/demo',
      name: 'Demo',
      component: Demo
    }
  ]
})
