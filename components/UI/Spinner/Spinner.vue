<template>
  <div
    v-show="loading"
    class="loader"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <div
      class="loader-after"
      :style="[spinnerStyle]"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'Spinner',
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    size: {
      type: Number,
      default: 20,
    },
    color: {
      type: String,
      default: 'var(--primary-green-color)',
    },
    duration: {
      type: String,
      default: '1.2s',
    },
  },
  data() {
    return {
      spinnerStyle: {
        borderWidth: `${this.size * 0.4}px`,
        background: this.color,
        animationDuration: this.duration,
      },
    }
  },
}
</script>

<style scoped>
.loader {
    display: inline-block;
    position: relative;
}
.loader-after {
    content: ' ';
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 10%;
    box-sizing: border-box;
    border: 32px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation-name: loader;
    animation-iteration-count: infinite;
}
@keyframes loader {
    0% {
        transform: rotate(0);
        animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
        transform: rotate(900deg);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
        transform: rotate(1800deg);
    }
}
</style>
