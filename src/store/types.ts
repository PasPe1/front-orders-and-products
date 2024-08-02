import type { Store } from 'vuex'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootState>
  }
}

export interface RootState {
  auth: AuthState;
  user: UserState;
  products: ProductsState;
  orders: OrdersState;
}

export interface UserState {
  count: number
}

export interface AuthState {
  status: { loggedIn: boolean }
  user: { id: number; access_token: string; refresh_token: string } | null
  loading: boolean
}

export interface Product {
  id: number
  serialNumber: number
  isNew: number
  photo: string
  title: string
  type: string
  specification: string
  guarantee: {
    start: string
    end: string
  }
  price: { value: number; symbol: string; isDefault: number }[]
  order: number
  date: string
}

export interface ProductsState {
  products: Product[]
  loading: boolean
}

export interface Order {
  id: number,
  title: string,
  date: string,
  description: string,
  products: Product[]
}

export interface OrdersState {
  orders: Order[]
  loading: boolean
}
