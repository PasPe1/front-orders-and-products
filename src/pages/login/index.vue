<template>
  <div class="wrapper">
    <form class="form">
      <h2>{{ $t('login.login') }}</h2>
      <CustomInput type="email" v-model="email" :placeholder="$t('login.email')" />
      <CustomInput type="password" v-model="password" :placeholder="$t('login.password')" />
      <div class="form_submit-buttons">
        <Spinner v-if="loading" />
        <CustomButton v-else :text="$t('login.login')" :onClick="handleLogin" :disabled="loading" />
        <p>
          {{ $t('login.dhAccount') }} <RedirectLink to="register" :text="$t('login.register')" />
        </p>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'
import { mapState } from 'vuex'

export default {
  name: 'Login',
  components: {
    CustomInput: defineAsyncComponent(() => import('@/components/UI/CustomInput/CustomInput.vue')),
    CustomButton: defineAsyncComponent(
      () => import('@/components/UI/CustomButton/CustomButton.vue')
    ),
    Spinner: defineAsyncComponent(() => import('@/components/UI/Spinner/Spinner.vue')),
    RedirectLink: defineAsyncComponent(
      () => import('@/components/UI/RedirectLink/RedirectLink.vue')
    )
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
    handleLogin() {
      this.$store.dispatch('auth/login', { email: this.email, password: this.password })
    }
  }
}
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
