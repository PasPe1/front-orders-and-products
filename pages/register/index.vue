<template>
  <div class="wrapper">
    <form class="form">
      <h2>{{ $t('register.registration') }}</h2>
      <CustomInput
        v-model="user.email"
        type="email"
        :placeholder="$t('register.email')"
      />
      <CustomInput
        v-model="user.password"
        type="password"
        :placeholder="$t('register.password')"
      />
      <CustomInput
        v-model="user.firstName"
        type="name"
        :placeholder="$t('register.firstName')"
      />
      <CustomInput
        v-model="user.lastName"
        type="name"
        :placeholder="$t('register.lastName')"
      />
      <div class="form_submit">
        <div class="form_submit-button">
          <Spinner v-if="loading" />
          <CustomButton
            v-else
            :text="$t('register.registration')"
            :on-click="handleRegister"
            :disabled="loading"
          />
        </div>
        <p>
          {{ $t('register.dhAccount') }} <RedirectLink
            to="login"
            text="Login"
          />
        </p>
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
      () => import('@/components/UI/CustomButton/CustomButton.vue'),
    ),
    RedirectLink: defineAsyncComponent(
      () => import('@/components/UI/RedirectLink/RedirectLink.vue'),
    ),
    Spinner: defineAsyncComponent(() => import('@/components/UI/Spinner/Spinner.vue')),
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        photo: '',
      },
    }
  },
  computed: {
    ...mapState('auth', ['loading']),
  },
  methods: {
    handleRegister() {
      this.$store.dispatch('auth/register', this.user)
    },
  },
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

.form_submit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.form_submit-button {
  display: flex;
  align-items: center;
  min-height: 40px;
}
</style>
