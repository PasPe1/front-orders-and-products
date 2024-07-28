import type { AuthState } from '../../types'
import authActions from './actions'
import authMutations from './mutations'

// const user = JSON.parse(localStorage.getItem('user') || '{}')

const initialState: AuthState =
  // ? { status: { loggedIn: true }, user }
  { status: { loggedIn: false }, user: null, loading: false }

export const authModule = {
  namespaced: true,
  state: initialState,
  actions: authActions,
  mutations: authMutations
}
