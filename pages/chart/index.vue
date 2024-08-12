<template>
  <div>
    <Bar
      :data="data"
      :options="options"
    />
  </div>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import * as chartConfig from '~/config/chartConfig.js'

definePageMeta({
  layout: 'main-layout',
  middleware: 'auth-middleware',
})

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  name: 'App',
  components: {
    Bar,
  },
  data() {
    return chartConfig
  },
}
</script>
