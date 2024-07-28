import userActions from "./actions";
import userGetters from "./getters";
import userMutations from "./mutations";

export const userModule = {
    state () {
        return {
          count: 0
        }
      },
      mutations: userMutations,
      getters: userGetters,
      actions: userActions,
}