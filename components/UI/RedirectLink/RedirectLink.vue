<template>
  <RouterLink
    class="link"
    :to="to"
  >
    {{ text }}<slot />
  </RouterLink>
</template>

<script lang="ts">
export default {
  name: 'RedirectLink',
  props: {
    to: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
  },
}
</script>

<style scoped>
.link {
  text-decoration: none;
  margin: 5px;
  margin-left: 0px;
}
</style>
