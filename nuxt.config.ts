// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  plugins: ['~/plugins/i18n.ts'],
  css: ['~/assets/main.css', 'bootstrap/dist/css/bootstrap.min.css'],
  ssr: true,
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },
  modules: ['@nuxt/test-utils/module', '@nuxt/eslint'],
})
