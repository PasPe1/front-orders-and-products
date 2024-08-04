import axiosInstance from '@/services/api'
import type { Order } from '@/store/types'

const ordersActions = {
  async getOrders({ commit }: any) {
    try {
      commit('loading')
      const response = await axiosInstance.get('orders')

      commit('ordersSuccess', response.data)
    } catch (e) {
      console.log('error', e)
      commit('ordersFailure')
    }
  },
  async deleteOrder({ commit }: any, id: number) {
    console.log('id', id)
    try {
      commit('loading')
      await axiosInstance.delete(`orders/${id}`)
      commit('success')
    } catch (e) {
      console.log('error', e)
      commit('ordersFailure')
    }
  },
  async createOrder({ commit }: any, order: Order) {
    console.log('order', order)
    try {
      commit('loading')
      const response = await axiosInstance.post(`orders`, order)
      commit('createOrderSuccess', response.data)
      return response
    } catch (e) {
      console.log('error', e)
      commit('ordersFailure')
    }
  }
}

export default ordersActions
