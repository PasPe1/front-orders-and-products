<template>
  <div class="wrapper">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
}

.content {
  display: flex;
}
</style>
