import type { Product, ProductsState } from '@/store/types'

const productsMutations = {
  productsSuccess(state: ProductsState, products: Product[]) {
    state.loading = false
    state.products = products
  },
  productsFailure(state: ProductsState) {
    state.loading = false
  },
  success(state: ProductsState) {
    state.loading = false
  },
  createProductSuccess(state: ProductsState, product: Product) {
    state.loading = false
    state.products = [...state.products, product]
  },
  cleareProducts(state: ProductsState) {
    state.loading = false
    state.products = []
  },
  loadingProduct(state: ProductsState) {
    state.loading = true
  },
}

export default productsMutations
