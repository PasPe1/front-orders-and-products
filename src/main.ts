import './assets/main.css'

// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// import { store } from './store/store'

// const app = createApp(App)

// app.use(store)
// app.use(router)
// app.use(VueAxios, axios)

// app.mount('#app')


import { createSSRApp } from 'vue'
import App from './App.vue'

export function createApp() {

  const app = createSSRApp(App)
  return { app }
}