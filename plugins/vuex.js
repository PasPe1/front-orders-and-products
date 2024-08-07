import { createStore } from 'vuex'
import VuexPersister from 'vuex-persister'
import Cookies from 'js-cookie'
import { defineNuxtPlugin } from '#app'
import { authModule } from '~/store/modules/auth'
import { userModule } from '~/store/modules/user'
import { productsModule } from '~/store/modules/products'
import { ordersModule } from '~/store/modules/orders'

const vuexPersister = new VuexPersister({
  storage: {
    getItem: key => Cookies.get(key),
    setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),
    removeItem: key => Cookies.remove(key),
  },
})

export default defineNuxtPlugin((nuxtApp) => {
  const store = createStore({
    modules: {
      auth: authModule,
      user: userModule,
      products: productsModule,
      orders: ordersModule,
    },
    plugins: [vuexPersister.persist],
  })

  nuxtApp.vueApp.use(store)
})
