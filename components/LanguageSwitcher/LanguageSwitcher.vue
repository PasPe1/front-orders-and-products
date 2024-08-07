<template>
  <div class="switcher">
    <CustomButton
      v-if="choosenLocal === 'ua'"
      :text="$t('local.en')"
      @click="changeLanguage('en')"
    />
    <CustomButton
      v-else
      :text="$t('local.ua')"
      @click="changeLanguage('ua')"
    />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import Cookies from 'js-cookie'

export default defineComponent({
  name: 'LanguageSwitcher',
  components: {
    CustomButton: defineAsyncComponent(
      () => import('@/components/UI/CustomButton/CustomButton.vue'),
    ),
  },
  computed: {
    choosenLocal() {
      return this.$i18n.locale
    },
  },
  methods: {
    changeLanguage(locale: string) {
      Cookies.set('locale', locale)
      this.$i18n.locale = locale
    },
  },
})
</script>

<style scoped>
.switcher {
  position: absolute;
  bottom: 20px;
}
</style>
