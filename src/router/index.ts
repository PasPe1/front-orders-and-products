import { createRouter, createWebHistory } from 'vue-router'
import { AppLayoutsEnum } from '@/components/layouts/layouts.types';
import { loadLayoutMiddleware } from './middleware/loadLayout.middleware';
import { store } from '@/store/store';
import type { RootState } from '@/store/types';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/main',
      name: 'Main',
      component: () => import('../pages/main/index.vue'),
      meta: {
        layout: AppLayoutsEnum.main,
        requiresAuth: true
      }
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: () => import('../pages/signIn/index.vue')
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: () => import('../pages/signUp/index.vue')
    },
    {
      path: '/groups',
      name: 'SignUp',
      component: () => import('../pages/signUp/index.vue')
    },
    {
      path: '/products',
      name: 'SignUp',
      component: () => import('../pages/signUp/index.vue')
    },
    {
      path: '/users',
      name: 'SignUp',
      component: () => import('../pages/signUp/index.vue')
    },
    {
      path: '/settings',
      name: 'SignUp',
      component: () => import('../pages/signUp/index.vue')
    }
  ]
})

router.beforeEach(loadLayoutMiddleware);

router.beforeEach((to, from, next) => {
  console.log('store.getters.auth', (store.state as RootState).auth.status.loggedIn)
  if (to.meta.requiresAuth && !(store.state as RootState).auth.status.loggedIn) {
    next("sign-in");
  } else {
    next();
  }
});

export default router
