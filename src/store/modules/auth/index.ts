import type { AuthState } from '../../types'
import authActions from './actions'
import authMutations from './mutations'


const initialState: AuthState =
  { status: { loggedIn: false }, user: null, loading: false }

export const authModule = {
  namespaced: true,
  state: initialState,
  actions: authActions,
  mutations: authMutations
}
