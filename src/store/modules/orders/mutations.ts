import type { Order, OrdersState } from '@/store/types'

const ordersMutations = {
  ordersSuccess(state: OrdersState, orders: Order[]) {
    state.loading = false
    state.orders = orders
  },
  ordersailure(state: OrdersState) {
    state.loading = false
    state.orders = []
  },
  loading(state: OrdersState) {
    state.loading = true
  },
  success(state: OrdersState) {
    state.loading = false
  }
}

export default ordersMutations
