<template>
  <div class="container">
    {{ 'Main page' }}
    <Spinner :loading="true" />
  </div>
</template>

<script lang="ts">
import Spinner from '@/components/UI/Spinner/Spinner.vue';

export default {
  name: 'home',
  components: {
    Spinner
  }
}
</script>

<style scoped>
</style>
