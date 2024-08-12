<template>
  <div class="container">
    <div
      ref="map"
      class="map"
    />
    <RadarChart />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'
import RadarChart from '~/components/RadarChart/RadarChart.vue'

definePageMeta({
  layout: 'main-layout',
  middleware: 'auth-middleware',
})

const map = ref(null)

const initMap = async () => {
  const { $googleMapsLoader } = useNuxtApp()

  if (!$googleMapsLoader) {
    console.error('Google Maps Loader is not available.')
    return
  }

  try {
    await $googleMapsLoader.load()
    const mapOptions = {
      center: { lat: 46.4697, lng: 30.7312 },
      zoom: 12,
    }
    new google.maps.Map(map.value, mapOptions)
  }
  catch (error) {
    console.error('Error loading Google Maps:', error)
  }
}

onMounted(() => {
  initMap()
})
</script>

<style>
.container {
  display: flex;
  gap: 30px;
  height: 100%;
}

.map {
  width: 100%;
}
</style>
