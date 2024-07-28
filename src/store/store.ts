import { createStore } from 'vuex'
import { authModule } from './modules/auth'
import { userModule } from './modules/user'
import VuexPersister from 'vuex-persister'
import type { RootState } from './types'

const vuexPersister = new VuexPersister<RootState>({
  storage: localStorage
})

export const store = createStore({
  modules: {
    auth: authModule,
    user: userModule
  },
  plugins: [vuexPersister.persist]
})
