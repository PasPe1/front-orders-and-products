<template>
  <input class="form-control" :type="type" v-model="model" :placeholder="placeholder" />
</template>

<script setup>
const model = defineModel()
const { placeholder, type } = defineProps(['placeholder', 'type'])
</script>

<style scoped>
.input {
  margin: 10px;
  line-height: 24px;
}
</style>
