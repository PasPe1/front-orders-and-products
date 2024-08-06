import { createStore } from 'vuex'
import { authModule } from './modules/auth'
import { userModule } from './modules/user'
import { productsModule } from './modules/products'
import VuexPersister from 'vuex-persister'
import type { RootState } from './types'
import { ordersModule } from './modules/orders'

const isClient = typeof window !== 'undefined'

let vuexPersister: any = null
if (isClient) {
  vuexPersister = new VuexPersister<RootState>({
    storage: localStorage
  })
}

export const store = createStore({
  modules: {
    auth: authModule,
    user: userModule,
    products: productsModule,
    orders: ordersModule
  },
  plugins: isClient ? [vuexPersister.persist] : []
})
