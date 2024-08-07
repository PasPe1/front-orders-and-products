import type { ICommit, Product } from '@/store/types'
import axiosInstance from '~/src/services/api'

const productsActions = {
  async getProducts({ commit }: ICommit) {
    try {
      commit('loading')
      const response = await axiosInstance.get('products')

      commit('productsSuccess', response.data)
    }
    catch (e) {
      console.log('error', e)
      commit('productsFailure')
    }
  },
  async deleteProduct({ commit }: ICommit, id: number) {
    try {
      commit('loading')
      await axiosInstance.delete(`products/${id}`)
      commit('success')
    }
    catch (e) {
      console.log('error', e)
      commit('productsFailure')
    }
  },
  async getProductsByOrderId({ commit }: ICommit, id: number) {
    try {
      commit('loading')
      const response = await axiosInstance.get(`products/getByOrder/${id}`)
      commit('productsSuccess', response.data)
    }
    catch (e) {
      console.log('error', e)
      commit('productsFailure')
    }
  },
  async createProduct({ commit }: ICommit, product: Product) {
    try {
      commit('loading')
      const response = await axiosInstance.post(`products`, product)
      commit('createProductSuccess', response.data)
    }
    catch (e) {
      console.log('error', e)
      commit('ordersFailure')
    }
  },
}

export default productsActions
