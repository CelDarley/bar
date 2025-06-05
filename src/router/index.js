import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Menu from '../components/Menu.vue'
import Cart from '../components/Cart.vue'
import Kitchen from '../components/Kitchen.vue'
import CustomerCalls from '../components/CustomerCalls.vue'
import Settings from '../components/Settings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/kitchen',
      name: 'Kitchen',
      component: Kitchen
    },
    {
      path: '/calls',
      name: 'CustomerCalls',
      component: CustomerCalls
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/settings/menu',
      name: 'MenuSettings',
      component: () => import('../components/settings/MenuSettings.vue')
    },
    {
      path: '/settings/flows',
      name: 'FlowSettings',
      component: () => import('../components/settings/FlowSettings.vue')
    }
  ]
})

export default router 