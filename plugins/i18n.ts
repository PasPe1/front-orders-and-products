// plugins/i18n.ts
import { createI18n } from 'vue-i18n'
import Cookies from 'js-cookie'
import { defineNuxtPlugin } from '#app'
import en from '~/locale/en.json'
import ua from '~/locale/ua.json'

export default defineNuxtPlugin((nuxtApp) => {
  const storedLocale = Cookies.get('locale') || 'en'

  const i18n = createI18n({
    legacy: false,
    locale: storedLocale,
    fallbackLocale: 'en',
    messages: {
      en,
      ua,
    },
  })

  nuxtApp.vueApp.use(i18n)
})
