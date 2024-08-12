import { toast } from 'vue3-toastify'
import type { ICommit, Product } from '@/store/types'
import axiosInstance from '~/src/services/api'

const productsActions = {
  async getProducts({ commit }: ICommit) {
    try {
      commit('loadingProduct')
      const response = await axiosInstance.get('products')

      commit('productsSuccess', response.data)
    }
    catch (error) {
      commit('productsFailure')
      toast.error('Get products error!')
      throw error
    }
  },
  async deleteProduct({ commit }: ICommit, id: number) {
    try {
      commit('loadingProduct')
      await axiosInstance.delete(`products/${id}`)
      commit('success')
      toast.success('Product was deleted!')
    }
    catch (error) {
      commit('productsFailure')
      toast.error('Delete product error!')
      throw error
    }
  },
  async getProductsByOrderId({ commit }: ICommit, id: number) {
    try {
      commit('loadingProduct')
      const response = await axiosInstance.get(`products/getByOrder/${id}`)
      commit('productsSuccess', response.data)
    }
    catch (error) {
      commit('productsFailure')
      toast.error('Get products error!')
      throw error
    }
  },
  async createProduct({ commit }: ICommit, product: Product) {
    try {
      commit('loadingProduct')
      const response = await axiosInstance.post(`products`, product)
      commit('createProductSuccess', response.data)
      toast.success('Product was created!')
    }
    catch (error) {
      commit('productsFailure')
      toast.error('Create product error!')
      throw error
    }
  },
}

export default productsActions
