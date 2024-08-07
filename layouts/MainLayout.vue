<template>
  <div>
    <TopMenu />
    <div class="wrapper">
      <NavigationMenu />
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NavigationMenu from '~/components/NavigationMenu/NavigationMenu.vue'
import TopMenu from '~/components/TopMenu/TopMenu.vue'

export default {
  name: 'MainLayout',
  components: {
    NavigationMenu,
    TopMenu,
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
}

.content {
  background-color: #f0f3f5;
  min-width: calc(100vw - 160px);
  padding: 40px;
  height: calc(100vh - 80px);
}
</style>
