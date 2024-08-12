<template>
  <div class="form-group">
    <label v-if="placeholder && isLabel">{{ placeholder }}</label>
    <textarea
      v-if="type === 'textarea'"
      v-model="model"
      class="form-control"
      :placeholder="placeholder"
      :required="required"
    />
    <input
      v-if="type === 'date'"
      v-model="model"
      class="form-control"
      type="date"
      :placeholder="placeholder"
      :required="required"
    >
    <input
      v-if="type !== 'date' && type !== 'textarea'"
      v-model="model"
      class="form-control"
      :type="type"
      :placeholder="placeholder"
      :required="required"
    >
  </div>
</template>

<script setup>
// eslint-disable-next-line vue/require-prop-types
const model = defineModel()

defineProps({
  placeholder: String,
  type: {
    type: String,
    default: 'text',
  },
  isLabel: {
    type: Boolean,
    default: true,
  },
  required: Boolean,
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
