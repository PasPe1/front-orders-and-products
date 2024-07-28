import type { AuthState } from "@/store/types";

const authMutations = {
    loginSuccess(state: AuthState, user: any) {
      state.status.loggedIn = true
      state.loading = false
      state.user = user
    },
    loginFailure(state: AuthState) {
      state.status.loggedIn = false
      state.loading = false
      state.user = null
    },
    logoutSuccess(state: AuthState) {
      state.status.loggedIn = false
      state.loading = false
      state.user = null
    },
    logoutFailure(state: AuthState) {
      state.loading = false
      state.status.loggedIn = true
    },
    registerSuccess(state: AuthState, user: any) {
      state.status.loggedIn = true
      state.loading = false
      state.user = user
    },
    registerFailure(state: AuthState) {
      state.status.loggedIn = false
      state.loading = false
    },
    loading(state: AuthState) {
      state.loading = true
    }
  }

export default authMutations
