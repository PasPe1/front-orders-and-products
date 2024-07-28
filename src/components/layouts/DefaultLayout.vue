<template>
  <div class="container">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  /* min-height: 100%;
  min-width: 100%; */
}

.content {
    display: flex;
    /* min-height: 100%;
    min-width: 100%; */
}
</style>
