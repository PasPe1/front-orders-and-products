<template>
  <div class="form-group">
    <label v-if="placeholder && isLabel">{{ placeholder }}</label>
    <textarea
      v-if="type === 'textarea'"
      class="form-control"
      :type="type"
      v-model="model"
      :placeholder="placeholder"
    />
    <input
      v-if="type === 'date'"
      class="form-control"
      type="date"
      v-model="model"
      :placeholder="placeholder"
    />
    <input
      v-if="type !== 'date' && type !== 'textarea'"
      class="form-control"
      :type="type"
      v-model="model"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const model = defineModel()

defineProps({
  placeholder: String,
  type: {
    type: String,
    default: 'text'
  },
  isLabel: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.form-group {
  width: 100%;
}

.form-control {
  margin: 10px;
  line-height: 24px;
  margin-left: 0px;
}
</style>
