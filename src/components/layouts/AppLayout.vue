<script lang="ts">
export default {
  name: 'AppLayout',
  computed: {
    currentComponent() {
      return this.$route.meta.layoutComponent || 'DefaultLayout'
    }
  }
}
</script>

<template>
  <component :is="currentComponent">
    <slot />
  </component>
</template>

<style scoped></style>
