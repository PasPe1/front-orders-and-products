import type { OrdersState } from '../../types'
import ordersActions from './actions'
import ordersMutations from './mutations'

const initialState: OrdersState = { orders: [], loading: false }

export const ordersModule = {
  namespaced: true,
  state: initialState,
  actions: ordersActions,
  mutations: ordersMutations,
}
