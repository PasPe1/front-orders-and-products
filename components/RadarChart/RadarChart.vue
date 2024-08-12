<template>
  <div class="wrapper">
    <Radar
      :data="data"
      :options="options"
    />
  </div>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'vue-chartjs'
import * as chartConfig from '~/config/chartConfig.js'

definePageMeta({
  layout: 'main-layout',
  middleware: 'auth-middleware',
})

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
)

export default {
  name: 'App',
  components: {
    Radar,
  },
  data() {
    return { ...chartConfig, options: { maintainAspectRatio: false } }
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
</style>
