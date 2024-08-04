import axiosInstance from '@/services/api'
import type { Product } from '@/store/types'

const productsActions = {
  async getProducts({ commit }: any) {
    try {
      commit('loading')
      const response = await axiosInstance.get('products')

      commit('productsSuccess', response.data)
    } catch (e) {
      console.log('error', e)
      commit('productsFailure')
    }
  },
  async deleteProduct({ commit }: any, id: number) {
    try {
      commit('loading')
      await axiosInstance.delete(`products/${id}`)
      commit('success')
    } catch (e) {
      console.log('error', e)
      commit('productsFailure')
    }
  },
  async getProductsByOrderId({ commit }: any, id: number) {
    console.log('id', id)
    try {
      commit('loading')
      const response = await axiosInstance.get(`products/getByOrder/${id}`)
      commit('productsSuccess', response.data)
    } catch (e) {
      console.log('error', e)
      commit('productsFailure')
    }
  },
  async createProduct({ commit }: any, product: Product) {
    console.log('order', product)
    try {
      commit('loading')
      const response = await axiosInstance.post(`products`, product)
      commit('createProductSuccess', response.data)
    } catch (e) {
      console.log('error', e)
      commit('ordersFailure')
    }
  }
}

export default productsActions
