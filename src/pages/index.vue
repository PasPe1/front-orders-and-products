<template>
  <div class="wrapper">
    <form class="form">
      <h2>{{ 'Default Page' }}</h2>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  name: 'signUp',
  data() {
    return {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      photo: ''
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  background-color: bisque;
  width: 100%;
  padding: 40px;
  justify-content: center;
  align-items: center;
}

.form {
  background-color: aquamarine;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  align-items: center;
  width: fit-content;
}
</style>
