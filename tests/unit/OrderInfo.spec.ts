import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import OrderInfo from '../../src/components/OrderInfo/OrderInfo.vue'
import AddProductModal from '../../src/components/UI/Modal/AddProductModal.vue'
import RedirectLink from '../../src/components/UI/RedirectLink/RedirectLink.vue'
import YesNoModal from '../../src/components/UI/Modal/YesNoModal.vue'
import { createStore } from 'vuex'
import { createRouter, createMemoryHistory } from 'vue-router'

// Mock translation function
const mockT = (key: string) => key // simple mock, returns the key as the translated text

describe('OrderInfo Component', () => {
  // Mock Vuex store
  const store = createStore({
    modules: {
      products: {
        namespaced: true,
        state: {
          loading: false,
          products: []
        },
        actions: {
          'products/getProductsByOrderId': vi.fn(),
          'products/deleteProduct': vi.fn(),
          'products/createProduct': vi.fn(),
          'products/getProducts': vi.fn(),
          'orders/getOrders': vi.fn()
        }
      }
    }
  })

  // Mock Vue Router
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/products/:id', name: 'Product' }]
  })

  it('renders order information and products from props', async () => {
    const order = { id: 1, title: 'Order 1' }
    const products = [
      { id: 1, title: 'Product 1', serialNumber: '12345', isNew: 1 },
      { id: 2, title: 'Product 2', serialNumber: '67890', isNew: 0 }
    ]

    const wrapper = mount(OrderInfo, {
      global: {
        plugins: [store, router],
        components: { AddProductModal, RedirectLink, YesNoModal },
        mocks: {
          $t: mockT // Mock $t
        }
      },
      props: {
        order
      },
      data() {
        return { products }
      }
    })

    // Verify order title
    expect(wrapper.find('.order-info_head h5').text()).toBe(order.title)

    // Verify product list
    const productItems = wrapper.findAll('.order-info_product-list_item')
    expect(productItems.length).toBe(products.length)

    products.forEach((product, index) => {
      const productItem = productItems[index]
      expect(productItem.text()).toContain(product.title)
      expect(productItem.text()).toContain(product.serialNumber)
      const status = productItem.find('.order-info_product-list_item_status')
      expect(status.text()).toBe(
        product.isNew ? 'orders.orderInfo.status.available' : 'orders.orderInfo.status.repair'
      )
    })
  })

  // it('opens and closes modals', async () => {
  //   const order = { id: 1, title: 'Order 1' }
  //   const wrapper = mount(OrderInfo, {
  //     global: {
  //       plugins: [store, router],
  //       components: { AddProductModal, RedirectLink, YesNoModal },
  //       mocks: {
  //         $t: mockT // Mock $t
  //       }
  //     },
  //     props: {
  //       order
  //     }
  //   })

  //   // Open Add Product Modal
  //   await wrapper.find('.order-info_add-product').trigger('click')
  //   expect(wrapper.vm.showModal).toBe(true)

  //   // Close Add Product Modal
  //   await wrapper.vm.closeModal()
  //   expect(wrapper.vm.showModal).toBe(false)

  //   // Open Delete Modal
  //   await wrapper.find('.orders_list_item_delete').trigger('click')
  //   expect(wrapper.vm.showDeleteModal).toBe(true)

  //   // Close Delete Modal
  //   await wrapper.vm.closeDeleteModal()
  //   expect(wrapper.vm.showDeleteModal).toBe(false)
  // })

  it('emits reset-order event when close button is clicked', async () => {
    const order = { id: 1, title: 'Order 1' }
    const wrapper = mount(OrderInfo, {
      global: {
        plugins: [store, router],
        components: { AddProductModal, RedirectLink, YesNoModal },
        mocks: {
          $t: mockT // Mock $t
        }
      },
      props: {
        order
      }
    })

    // Listen for the reset-order event
    await wrapper.find('.order-info_close').trigger('click')
    expect(wrapper.emitted('reset-order')).toBeTruthy()
  })
})
