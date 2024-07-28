<template>
    <TopMenu />
    <div class="container">
      <NavigationMenu :nav-bar-items="routesList" />
      <div class="content">
        <slot/>
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
.container {
  display: flex;
}

.content {
    background-color: #F0F3F5;
    min-width: calc(100vw - 160px);
    padding: 40px;
    height: calc(100vh - 80px);
  }
</style>
