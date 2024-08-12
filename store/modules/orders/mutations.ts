import type { Order, OrdersState } from '@/store/types'

const ordersMutations = {
  ordersSuccess(state: OrdersState, orders: Order[]) {
    state.loading = false
    state.orders = orders
  },
  ordersFailure(state: OrdersState) {
    state.loading = false
  },
  success(state: OrdersState) {
    state.loading = false
  },
  deleteOrderSuccess(state: OrdersState) {
    state.loading = false
  },
  createOrderSuccess(state: OrdersState, order: Order) {
    state.loading = false
    state.orders = [...state.orders, order]
  },
  loadingOrder(state: OrdersState) {
    state.loading = true
  },
}

export default ordersMutations
