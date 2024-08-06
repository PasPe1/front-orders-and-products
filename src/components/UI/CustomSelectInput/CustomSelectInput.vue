<template>
  <div class="form-group">
    <label class="form-group_label" v-if="placeholder && isLabel">{{ placeholder }}:</label>
    <select class="form-select" aria-label="Default select example">
      <option selected>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </div>
</template>

<script setup>
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
  display: flex;
  align-items: center;
  margin-left: 30px;
  gap: 10px;
}

.form-group_label {
  opacity: 0.6;
  font-size: 12px;
}

.form-select {
  min-width: 250px;
}

.form-control {
  margin: 10px;
  line-height: 24px;
  margin-left: 0px;
}
</style>
