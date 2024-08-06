import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import OrderItem from '../../src/components/OrderItem/OrderItem.vue'
import YesNoModal from '../../src/components/UI/Modal/YesNoModal.vue'
import { createStore } from 'vuex'
import { createRouter, createMemoryHistory } from 'vue-router'

// Mock translation function
const mockT = (key: string) => key // simple mock, returns the key as the translated text

describe('OrderItem Component', () => {
  // Mock Vuex store
  const store = createStore({
    modules: {
      orders: {
        namespaced: true,
        state: {
          loading: false
        },
        actions: {
          'orders/deleteOrder': vi.fn(),
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

  it('renders order information correctly', async () => {
    const order = {
      id: 1,
      title: 'Order 1',
      date: '2024-08-01',
      products: [
        {
          price: [
            { symbol: 'USD', value: 100 },
            { symbol: 'UAH', value: 2700 }
          ]
        },
        {
          price: [
            { symbol: 'USD', value: 200 },
            { symbol: 'UAH', value: 5400 }
          ]
        }
      ]
    }

    const wrapper = mount(OrderItem, {
      global: {
        plugins: [store, router],
        components: { YesNoModal },
        mocks: {
          $t: mockT // Mock $t
        }
      },
      props: {
        order,
        active: null,
        showProduct: false
      }
    })

    // Verify order title
    expect(wrapper.find('.order_item_name').text()).toBe(order.title)

    // Verify products number
    expect(wrapper.find('.order_item_products-number_count_number').text()).toBe(
      String(order.products.length)
    )

    // Verify formatted date
    expect(wrapper.find('.order_item_products_created-date_monthly').text()).toBe('01 / 08')
    // expect(wrapper.find('.order_item_products_created-date').text()).toBe('01 / Aug / 2024')

    // Verify price
    expect(wrapper.find('.order_item_price_usd').text()).toBe('300 $')
    expect(wrapper.find('.order_item_price_uah').text()).toContain('8100')
  })

  it('opens and closes modals', async () => {
    const order = { id: 1, title: 'Order 1', date: '2024-08-01', products: [] }
    const wrapper = mount(OrderItem, {
      global: {
        plugins: [store, router],
        components: { YesNoModal },
        mocks: {
          $t: mockT // Mock $t
        }
      },
      props: {
        order,
        active: null,
        showProduct: false
      }
    })

    // Open modal
    await wrapper.find('.order_item_delete').trigger('click')
    expect(wrapper.vm.showModal).toBe(true)

    // Close modal
    await wrapper.vm.closeModal()
    expect(wrapper.vm.showModal).toBe(false)
  })

  // it('emits set-active event when clicked', async () => {
  //   const order = { id: 1, title: 'Order 1', date: '2024-08-01', products: [] }
  //   const wrapper = mount(OrderItem, {
  //     global: {
  //       plugins: [store, router],
  //       components: { YesNoModal },
  //       mocks: {
  //         $t: mockT // Mock $t
  //       }
  //     },
  //     props: {
  //       order,
  //       active: null,
  //       showProduct: false
  //     }
  //   })

  //   // Listen for the set-active event
  //   await wrapper.trigger('click')
  //   expect(wrapper.emitted('set-active')).toBeTruthy()
  //   expect(wrapper.emitted('set-active')![0]).toEqual([order])
  // })

  it('correctly calculates total prices', async () => {
    const order = {
      id: 1,
      title: 'Order 1',
      date: '2024-08-01',
      products: [
        {
          price: [
            { symbol: 'USD', value: 150 },
            { symbol: 'UAH', value: 4050 }
          ]
        },
        {
          price: [
            { symbol: 'USD', value: 250 },
            { symbol: 'UAH', value: 6750 }
          ]
        }
      ]
    }

    const wrapper = mount(OrderItem, {
      global: {
        plugins: [store, router],
        components: { YesNoModal },
        mocks: {
          $t: mockT // Mock $t
        }
      },
      props: {
        order,
        active: null,
        showProduct: false
      }
    })

    // Wait for the component to mount and calculate totals
    await wrapper.vm.$nextTick()

    // Verify calculated total prices
    expect(wrapper.vm.totalUSD).toBe(400)
    expect(wrapper.vm.totalUAH).toBe(10800)
  })
})
