import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import { AppLayoutsEnum } from '@/components/layouts/layouts.types'
import { loadLayoutMiddleware } from './middleware/loadLayout.middleware'
import { store } from '@/store/store'
import type { RootState } from '@/store/types'

const baseUrl = import.meta.env.BASE_URL
const history = import.meta.env.SSR ? createMemoryHistory(baseUrl) : createWebHistory(baseUrl)

const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      alias: '/products',
      name: 'Main',
      component: () => import('../pages/Products/index.vue'),
      meta: {
        layout: AppLayoutsEnum.main,
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../pages/login/index.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../pages/register/index.vue')
    },
    {
      path: '/orders',
      name: 'Orders',
      component: () => import('../pages/Orders/index.vue'),
      meta: {
        layout: AppLayoutsEnum.main,
        requiresAuth: true
      }
    },
    {
      path: '/products',
      name: 'Products',
      component: () => import('../pages/Products/index.vue'),
      meta: {
        layout: AppLayoutsEnum.main,
        requiresAuth: true
      }
    },
    {
      path: '/users',
      name: 'Users',
      component: () => import('../pages/Products/index.vue'),
      meta: {
        layout: AppLayoutsEnum.main,
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../pages/Products/index.vue'),
      meta: {
        layout: AppLayoutsEnum.main,
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(loadLayoutMiddleware)

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !(store.state as RootState).auth.status.loggedIn) {
    next('login')
  } else {
    next()
  }
})

export default router
