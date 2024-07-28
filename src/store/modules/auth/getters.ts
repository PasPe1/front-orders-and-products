import type { AuthState } from "@/store/types"

const authGetters = {
    auth(state: AuthState) {
        return state.user
    },
    loading(state: AuthState) {
        return state.loading
    }
}

export default authGetters
