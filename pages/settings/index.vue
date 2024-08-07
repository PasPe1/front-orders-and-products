<template>
  <div class="wrapper">
    Settings
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'main-layout',
  middleware: 'auth-middleware',
})
</script>

<style scoped>
.wrapper {
  display: flex;
  width: 100%;
  padding: 40px;
  justify-content: center;
  align-items: center;
}

.form {
  background-color: var(--green-marine-color);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  align-items: center;
  width: fit-content;
  min-width: 300px;
}

.form_submit-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
