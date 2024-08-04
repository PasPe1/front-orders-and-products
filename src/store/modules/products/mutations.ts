import type { Product, ProductsState } from '@/store/types'

const productsMutations = {
  productsSuccess(state: ProductsState, products: Product[]) {
    state.loading = false
    state.products = products
  },
  productsailure(state: ProductsState) {
    state.loading = false
    state.products = []
  },
  loading(state: ProductsState) {
    state.loading = true
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
  }
}

export default productsMutations
