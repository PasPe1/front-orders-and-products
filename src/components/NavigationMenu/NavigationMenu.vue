<template>
  <div class="navbar">
    <div  class="navbar_avatar">
      <img class="navbar_avatar_image" src="/avatar.jpg" />
    </div>
    <ul class="navbar_list" id="navbar">
      <li
        v-for="(content, index) in navBarItems"
        :key="index"
        class="nav_item"
        :class="{ active: content.link === activeRoute }"
      >
        <RouterLink v-if="content.link" class="nav_item-link" :event="'click'" :to="content.link">
          <p class="title">{{ content.title.toUpperCase() }}</p>
        </RouterLink>
      </li>
      <Spinner v-if="loading" />
      <CustomButton v-else text="Logout" :onClick="logout" :disabled="loading" />
    </ul>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import CustomButton from '../UI/CustomButton/CustomButton.vue'
import Spinner from '../UI/Spinner/Spinner.vue'

interface items {
  title: string
  link: string
}

export default {
  name: 'NavigationMenu',
  components: {
    Spinner,
    CustomButton
  },
  props: {
    navBarItems: {
      type: Array<items>,
      required: true
    }
  },
  computed: {
    ...mapState('auth', ['user', 'loading']),
    activeRoute() {
      return this.$route.path
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout', this.user.id)
    }
  }
}
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
  border-bottom: 3px solid #0eec20;
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
