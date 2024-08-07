<template>
  <div class="wrapper">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'Default',
}
</script>

<style scoped>
.wrapper {
  display: flex;
}
</style>
