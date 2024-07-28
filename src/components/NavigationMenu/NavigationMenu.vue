<template>
    <div class="container">
      <div>
        <image class="avatar" src="../../assets/icons/userAvatar.svg"/>
      </div>
      <ul
        class='navbar'
        id="navbar"
      >
        <li
          v-for='(content, index) in navBarItems'
          :key='index'
          class='nav-item'
          :class="{ active: content.link === activeRoute}"
        >
          <RouterLink
            v-if='content.link'
            class='nav-item-link'
            :event="'click'"
            :to='content.link'
          >
            <p class="title">{{ content.title.toUpperCase() }}</p>
          </RouterLink>
        </li>
        <button @click.prevent="logout">Logout</button>
      </ul>
    </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';

interface items { title: string, link: string }

export default {
  name: "NavigationMenu",
  props: {
    navBarItems: {
      type: Array<items>,
      required: true
    },
  },
  computed: {
    ...mapState('auth', ['user']),
    activeRoute() {
      console.log(this.$route.path)
      return this.$route.path
    }
  },
  methods: {
    logout(this) {
      console.log('this.user', this.user)
      this.$store.dispatch('auth/logout', this.user.id)
    }
  }
//   data() {
//     return {
//         navBarItems:}
//   }
}
</script>

<style scoped>
/* .container {
  width: 160px;
} */
.avatar {
  width: 20px;
  height: 20px;
 }

.navbar {
    list-style-type: none;
    padding: 10px;
    width: 160px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    box-shadow: 15px 0px 15px rgba(0, 0, 0, 0.137);
    position: relative;
    /* left: 0; */
    /* height: 100%; */
    margin: 0px;
}

.nav-item {
  margin-bottom: 20px;
}

.nav-item.active {
  border-bottom: 3px solid #0eec20;
}

.nav-item-link {
    text-decoration: none;
    color: black;
    font-weight: 600;
    line-height: 16px;
}

.title {
  font-size: 14px;
}
</style>