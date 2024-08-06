<template>
  <div class="wrapper">
    <form class="form">
      <h2>{{ $t('register.registration') }}</h2>
      <CustomInput type="email" v-model="user.email" :placeholder="$t('register.email')" />
      <CustomInput type="password" v-model="user.password" :placeholder="$t('register.password')" />
      <CustomInput type="name" v-model="user.firstName" :placeholder="$t('register.firstName')" />
      <CustomInput type="name" v-model="user.lastName" :placeholder="$t('register.lastName')" />
      <div class="form_buttons">
        <Spinner v-if="loading" />
        <CustomButton
          v-else
          :text="$t('register.registration')"
          :onClick="handleRegister"
          :disabled="loading"
        />
        <p>{{ $t('register.dhAccount') }} <RedirectLink to="login" text="Login" /></p>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'
import { mapState } from 'vuex'

export default {
  name: 'Register',
  components: {
    CustomInput: defineAsyncComponent(() => import('@/components/UI/CustomInput/CustomInput.vue')),
    CustomButton: defineAsyncComponent(
      () => import('@/components/UI/CustomButton/CustomButton.vue')
    ),
    RedirectLink: defineAsyncComponent(
      () => import('@/components/UI/RedirectLink/RedirectLink.vue')
    ),
    Spinner: defineAsyncComponent(() => import('@/components/UI/Spinner/Spinner.vue'))
  },
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
  computed: {
    ...mapState('auth', ['loading'])
  },
  methods: {
    handleRegister() {
      this.$store.dispatch('auth/register', this.user)
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

.form_buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
