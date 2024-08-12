import { Loader } from '@googlemaps/js-api-loader'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const apiKey = process.env.MAP_API_KEY || 'AIzaSyANJU8dWrPO_fOBXYe2nPKgoNV55hKRhuc'

  if (!apiKey) {
    console.error('Google Maps API key is not defined.')
    return
  }

  const loader = new Loader({
    apiKey,
    version: 'weekly',
  })

  nuxtApp.provide('googleMapsLoader', loader)
})
