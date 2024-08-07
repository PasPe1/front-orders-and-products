import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

const baseUrl = import.meta.env.BASE_URL
const history = import.meta.env.SSR ? createMemoryHistory(baseUrl) : createWebHistory(baseUrl)

const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      alias: '/products',
      name: 'Main',
      component: () => import('../../pages/index.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../../pages/login/index.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../../pages/register/index.vue'),
    },
    {
      path: '/orders',
      name: 'Orders',
      component: () => import('../../pages/orders/index.vue'),
    },
    {
      path: '/products',
      name: 'Products',
      component: () => import('../../pages/products/index.vue'),
    },
    {
      path: '/users',
      name: 'Users',
      component: () => import('../../pages/products/index.vue'),
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../../pages/products/index.vue'),
    },
  ],
})

export default router
