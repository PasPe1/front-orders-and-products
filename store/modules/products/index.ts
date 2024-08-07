import type { ProductsState } from '../../types'
import productsActions from './actions'
import productsMutations from './mutations'

const initialState: ProductsState = { products: [], loading: false }

export const productsModule = {
  namespaced: true,
  state: initialState,
  actions: productsActions,
  mutations: productsMutations,
}
