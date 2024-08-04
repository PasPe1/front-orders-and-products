import { createI18n, type I18n } from 'vue-i18n'

import en from './en.json'
import ua from './ua.json'

const storedLocale = localStorage.getItem('locale') || 'en'

const i18n: I18n = createI18n({
  legacy: false,
  locale: storedLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    ua
  }
})

export default i18n
