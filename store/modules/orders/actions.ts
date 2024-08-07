import type { ICommit, Order } from '@/store/types'
import axiosInstance from '~/src/services/api'

const ordersActions = {
  async getOrders({ commit }: ICommit) {
    try {
      commit('loading')
      const response = await axiosInstance.get('orders')

      commit('ordersSuccess', response.data)
    }
    catch (e) {
      console.log('error', e)
      commit('ordersFailure')
    }
  },
  async deleteOrder({ commit }: ICommit, id: number) {
    console.log('id', id)
    try {
      commit('loading')
      await axiosInstance.delete(`orders/${id}`)
      commit('success')
    }
    catch (e) {
      console.log('error', e)
      commit('ordersFailure')
    }
  },
  async createOrder({ commit }: ICommit, order: Order) {
    console.log('order', order)
    try {
      commit('loading')
      const response = await axiosInstance.post(`orders`, order)
      commit('createOrderSuccess', response.data)
      return response
    }
    catch (e) {
      console.log('error', e)
      commit('ordersFailure')
    }
  },
}

export default ordersActions
