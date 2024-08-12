<template>
  <div class="navbar">
    <div class="navbar_avatar">
      <img
        class="navbar_avatar_image"
        src="../../assets/icons/avatar.jpg"
      >
    </div>
    <ul
      id="navbar"
      class="navbar_list"
    >
      <li
        v-for="(content, index) in navBarItems"
        :key="index"
        class="nav_item"
        :class="{ active: content.link === activeRoute }"
      >
        <RouterLink
          v-if="content.link"
          class="nav_item-link"
          :event="'click'"
          :to="content.link"
        >
          <p class="title">
            {{ content.title.toUpperCase() }}
          </p>
        </RouterLink>
      </li>
      <CustomButton
        :text="$t('logout')"
        :on-click="logout"
        :disabled="loading"
        :loading="loading"
      />
      <LanguageSwitcher />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'NavigationMenu',
  components: {
    CustomButton: defineAsyncComponent(
      () => import('@/components/UI/CustomButton/CustomButton.vue')),
    LanguageSwitcher: defineAsyncComponent(
      () => import('@/components/LanguageSwitcher/LanguageSwitcher.vue')),
  },
  setup() {
    const { t } = useI18n()
    const store = useStore()
    const route = useRoute()

    const routesList = computed(() => [
      {
        link: '/',
        title: t('route.orders'),
      },
      {
        link: '/products',
        title: t('route.products'),
      },
      {
        link: '/chart',
        title: t('route.chart'),
      },
      {
        link: '/map',
        title: t('route.map'),
      },
    ])

    const activeRoute = computed(() => route.path)
    const loading = computed(() => store.state.auth.loading)
    const user = computed(() => store.state.auth.user)

    const logout = () => {
      store.dispatch('auth/logout', user.value.id)
    }

    return {
      activeRoute,
      loading,
      logout,
      navBarItems: routesList,
    }
  },
})
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: start;
  flex-direction: column;
  position: relative;
  box-shadow: 15px 0px 15px rgba(0, 0, 0, 0.137);
}

.navbar_avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  margin: 50px 0px 50px 0px;
}

.navbar_avatar_image {
  width: 100%;
  height: 100%;
  position: relative;
  object-fit: cover;
  object-position: center;
}

.navbar_list {
  list-style-type: none;
  padding: 10px;
  width: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  margin: 0px;
}

.nav_item {
  margin-bottom: 20px;
  transition: all 1s;
  border-bottom: 3px solid #ffffff;
}

.nav_item.active {
  border-bottom: 3px solid var(--green-dark-color);
}

.nav_item-link {
  text-decoration: none;
  color: black;
  font-weight: 600;
  line-height: 16px;
}

.title {
  font-size: 14px;
}
</style>
