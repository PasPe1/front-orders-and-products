<template>
  <div class="container">
    <form class="form">
      <h2>Sign Up</h2>
      <input v-model="user.email" placeholder="email" />
      <input v-model="user.password" placeholder="password" />
      <input v-model="user.firstName" placeholder="firstName" />
      <input v-model="user.lastName" placeholder="lastName" />
      <input v-model="user.photo" placeholder="photo" />
      <div>
        <button class="button">SignUp</button>
        <RouterLink to="sign-in">SignIn</RouterLink>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  name: 'sign-up',
  data() {
    return {
      user: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        photo: ''
      }
    }
  },
  methods: {
    handleLogin(this) {
      this.$store.dispatch('auth/register', this.user)
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  /* height: 100vh; */
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
