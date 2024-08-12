<template>
  <button
    type="submit"
    class="btn btn-primary"
    :disabled="disabled"
    @click.prevent="onClick"
  >
    <span
      v-if="loading"
      class="btn-loader"
    >
      <Spinner />
    </span>
    <span
      v-else-if="text"
      class="text-light"
    >
      <!-- <slot /> -->
      {{ text }}
    </span>
    <span
      v-else
      class="text-light"
    >
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
import type { PropType } from 'vue'

export default {
  name: 'CustomButton',
  components: {
    Spinner: defineAsyncComponent(() => import('@/components/UI/Spinner/Spinner.vue')),
  },
  props: {
    text: {
      type: String,
      required: false,
    },
    onClick: {
      type: Function as PropType<(event: MouseEvent) => void>,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
    },
  },
}
</script>

<style scoped>
.btn-loader {
  display: flex;
  min-width: 60px;
  justify-content: center;
}
</style>
