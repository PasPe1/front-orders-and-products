import { toast } from 'vue3-toastify'
import type { ICommit, Order } from '@/store/types'
import axiosInstance from '~/src/services/api'

const ordersActions = {
  async getOrders({ commit }: ICommit) {
    try {
      commit('loadingOrder')
      const response = await axiosInstance.get('orders')

      commit('ordersSuccess', response.data)
    }
    catch (error) {
      commit('ordersFailure')
      toast.error('Get orders error!')
      throw error
    }
  },
  async deleteOrder({ commit }: ICommit, id: number) {
    try {
      commit('loadingOrder')
      await axiosInstance.delete(`orders/${id}`)
      commit('deleteOrderSuccess')
      toast.success('Order was deleted!')
    }
    catch (error) {
      commit('ordersFailure')
      toast.error('Delete order error!')
      throw error
    }
  },
  async createOrder({ commit }: ICommit, order: Order) {
    try {
      commit('loadingOrder')
      const response = await axiosInstance.post(`orders`, order)
      console.log('createOrderSuccess')
      commit('createOrderSuccess', response.data)
      toast.success('Order created!')
      return response
    }
    catch (error) {
      commit('ordersFailure')
      toast.error('Create order error!')
      throw error
    }
  },
}

export default ordersActions
