import type { Store } from "vuex";

  declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      $store: Store<RootState>
    }
  }

  export interface RootState {
    user: UserState;
    auth: AuthState
  }

  export interface UserState {
    count: number
  }

  export interface AuthState {
    status: { loggedIn: boolean }, 
    user: { id: number, access_token: string, refresh_token: string } | null,
    loading: boolean
  }