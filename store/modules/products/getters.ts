import type { Product, ProductsState } from '@/store/types'

const productsGetters = {
  products(state: ProductsState): Product[] {
    return state.products
  },
}

export default productsGetters
