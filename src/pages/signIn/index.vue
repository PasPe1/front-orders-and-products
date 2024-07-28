<template>
  <div class="container">
    <form class="form">
      <h2>Sign In</h2>
      <CustomInput v-model="email" placeholder="email"/>
      <CustomInput v-model="password" placeholder="password"/>
      <div>
         <CustomButton text="SignIn" :onClick="handleLogin" :disabled="loading"/>
        <RouterLink to="sign-up">SignUp</RouterLink>
        <Spinner v-if="loading"/>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue';
import { mapState } from 'vuex';

export default {
  name: 'signIn',
  components: {
    CustomInput: defineAsyncComponent(() => import('@/components/UI/CustomInput/CustomInput.vue')),
    CustomButton: defineAsyncComponent(() => import('@/components/UI/CustomButton/CustomButton.vue')),
    Spinner: defineAsyncComponent(() => import('@/components/UI/Spinner/Spinner.vue')),
  },
  data() {
    return {
      email: '',
      password: '',
      message: ''
    }
  },
  computed: {
    ...mapState('auth', ['loading'])
  },
  methods: {
    handleLogin(this) {
      console.log('this.loading', this.loading)
      this.$store.dispatch('auth/login', { email: this.email, password: this.password }).then(
        () => {
          // this.$router.push('/main')
          console.log('done')
        },
        (error: { response: { data: { message: any } }; message: any; toString: () => any }) => {
          this.message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        }
      )
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  padding: 40px;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
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
