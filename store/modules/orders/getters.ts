import type { Order, OrdersState } from '@/store/types'

const ordersGetters = {
  orders(state: OrdersState): Order[] {
    return state.orders
  },
}

export default ordersGetters
