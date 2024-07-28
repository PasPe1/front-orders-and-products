<template>
  <input class="input" v-model="model" :placeholder="placeholder" />
</template>

<script setup>
const model = defineModel()
const { placeholder } = defineProps(['placeholder'])
</script>

<style scoped>
.input {
  margin: 10px;
  background-color: #F0F3F5;
  border-radius: 5px;
  line-height: 24px;
}
</style>
