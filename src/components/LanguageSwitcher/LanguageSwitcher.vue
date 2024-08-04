<template>
  <div>
    <p>{{ $t('message.hello') }}</p>
    <button @click="changeLanguage('en')">English</button>
    <button @click="changeLanguage('ua')">Українська</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LanguageSwitcher',
  methods: {
    changeLanguage(locale: string) {
      localStorage.setItem('locale', locale)
      this.$i18n.locale = locale
    }
  }
})
</script>
