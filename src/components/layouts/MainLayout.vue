<template>
  <TopMenu />
  <div class="wrapper">
    <NavigationMenu :nav-bar-items="routesList" />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { routesList } from '@/router/routes'
import NavigationMenu from '../NavigationMenu/NavigationMenu.vue'
import TopMenu from '../TopMenu/TopMenu.vue'

export default {
  components: {
    NavigationMenu,
    TopMenu
  },
  name: 'MainLayout',
  data() {
    return {
      routesList
    }
  }
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
