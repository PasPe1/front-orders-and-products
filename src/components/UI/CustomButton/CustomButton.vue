<template>
  <button type="submit" class="btn btn-primary" :disabled="disabled" @click.prevent="onClick">
    {{ text }}
  </button>
</template>

<script lang="ts">
import type { PropType } from 'vue'

export default {
  name: 'CustomButton',
  props: {
    text: {
      type: String,
      required: true
    },
    onClick: {
      type: Function as PropType<(event: MouseEvent) => void>,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false
    }
  }
}
</script>
