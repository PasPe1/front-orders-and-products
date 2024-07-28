<script lang="ts">
import { RouterView } from 'vue-router';
import AppLayout from './components/layouts/AppLayout.vue';

export default {
  components: {
    RouterView,
    AppLayout
    }
}
</script>

<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>
