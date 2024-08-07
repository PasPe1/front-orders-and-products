import Cookies from 'js-cookie'

export default defineNuxtRouteMiddleware(() => {
  if (!import.meta.env.SSR) {
    const accessToken = Cookies.get('accessToken')

    if (!accessToken) {
      return navigateTo('/login')
    }
  }
})
