import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { createStore } from 'vuex'
import { createRouter, createMemoryHistory } from 'vue-router'
import OrderInfo from '@/components/OrderInfo/OrderInfo.vue'
import AddProductModal from '@/components/UI/Modal/AddProductModal.vue'
import RedirectLink from '@/components/UI/RedirectLink/RedirectLink.vue'
import YesNoModal from '@/components/UI/Modal/YesNoModal.vue'

const mockT = (key: string) => key

describe('OrderInfo Component', () => {
  const store = createStore({
    modules: {
      products: {
        namespaced: true,
        state: {
          loading: false,
          products: [],
        },
        actions: {
          'products/getProductsByOrderId': vi.fn(),
          'products/deleteProduct': vi.fn(),
          'products/createProduct': vi.fn(),
          'products/getProducts': vi.fn(),
          'orders/getOrders': vi.fn(),
        },
      },
    },
  })

  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/products/:id', name: 'Product' }],
  })

  it('renders order information and products from props', async () => {
    const order = { id: 1, title: 'Order 1' }
    const products = [
      { id: 1, title: 'Product 1', serialNumber: '12345', isNew: 1 },
      { id: 2, title: 'Product 2', serialNumber: '67890', isNew: 0 },
    ]

    const wrapper = mount(OrderInfo, {
      global: {
        plugins: [store, router],
        components: { AddProductModal, RedirectLink, YesNoModal },
        mocks: {
          $t: mockT,
        },
      },
      props: {
        order,
      },
      data() {
        return { products }
      },
    })

    expect(wrapper.find('.order-info_head h5').text()).toBe(order.title)

    const productItems = wrapper.findAll('.order-info_product-list_item')
    expect(productItems.length).toBe(products.length)

    products.forEach((product, index) => {
      const productItem = productItems[index]
      expect(productItem.text()).toContain(product.title)
      expect(productItem.text()).toContain(product.serialNumber)
      const status = productItem.find('.order-info_product-list_item_status')
      expect(status.text()).toBe(
        product.isNew ? 'orders.orderInfo.status.available' : 'orders.orderInfo.status.repair',
      )
    })
  })

  it('emits reset-order event when close button is clicked', async () => {
    const order = { id: 1, title: 'Order 1' }
    const wrapper = mount(OrderInfo, {
      global: {
        plugins: [store, router],
        components: { AddProductModal, RedirectLink, YesNoModal },
        mocks: {
          $t: mockT,
        },
      },
      props: {
        order,
      },
    })

    await wrapper.find('.order-info_close').trigger('click')
    expect(wrapper.emitted('reset-order')).toBeTruthy()
  })
})
