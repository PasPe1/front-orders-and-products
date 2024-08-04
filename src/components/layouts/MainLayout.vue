<template>
  <TopMenu />
  <div class="wrapper">
    <NavigationMenu :nav-bar-items="routesList" />
    <div class="content">
      <Transition>
        <slot />
      </Transition>
    </div>
  </div>
</template>

<script lang="ts">
import { getTranslatedRoutes } from '@/router/routes'
import NavigationMenu from '../NavigationMenu/NavigationMenu.vue'
import TopMenu from '../TopMenu/TopMenu.vue'
import { computed } from 'vue'

export default {
  components: {
    NavigationMenu,
    TopMenu
  },
  name: 'MainLayout',
  setup() {
    const routesList = computed(() => getTranslatedRoutes())
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-from {
  transition-delay: 0.5s;
}
</style>
