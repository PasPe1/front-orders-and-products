import axiosInstance from '@/services/api'

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
  }
}

export default productsActions
