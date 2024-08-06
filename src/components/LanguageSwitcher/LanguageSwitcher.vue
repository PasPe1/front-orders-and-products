<template>
  <div class="switcher">
    <CustomButton
      v-if="choosenLocal === 'ua'"
      @click="changeLanguage('en')"
      :text="$t('local.en')"
    />
    <CustomButton v-else @click="changeLanguage('ua')" :text="$t('local.ua')" />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'

export default defineComponent({
  name: 'LanguageSwitcher',
  components: {
    CustomButton: defineAsyncComponent(
      () => import('@/components/UI/CustomButton/CustomButton.vue')
    )
  },
  methods: {
    changeLanguage(locale: string) {
      localStorage.setItem('locale', locale)
      this.$i18n.locale = locale
    }
  },
  computed: {
    choosenLocal() {
      return this.$i18n.locale
    }
  }
})
</script>

<style scoped>
.switcher {
  position: absolute;
  bottom: 20px;
}
</style>
