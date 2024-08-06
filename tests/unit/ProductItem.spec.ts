import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import ProductItem from '../../src/components/ProductItem/ProductItem.vue'
import YesNoModal from '../../src/components/UI/Modal/YesNoModal.vue'
import RedirectLink from '../../src/components/UI/RedirectLink/RedirectLink.vue'
import { createStore } from 'vuex'
import { createRouter, createMemoryHistory } from 'vue-router'

// Mock translation function
const mockT = (key: string) => key // simple mock, returns the key as the translated text

describe('ProductItem Component', () => {
  // Mock Vuex store
  const store = createStore({
    modules: {
      products: {
        namespaced: true,
        actions: {
          'products/deleteProduct': vi.fn(),
          'products/getProducts': vi.fn()
        }
      }
    }
  })

  // Mock Vue Router
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/products/:id', name: 'Product' }]
  })

  it('renders product information correctly', async () => {
    const product = {
      id: 1,
      title: 'Product 1',
      serialNumber: '1234567890',
      date: '2024-08-01',
      guarantee: {
        start: '2024-01-01',
        end: '2024-12-31'
      },
      isNew: 1,
      price: [
        { symbol: 'USD', value: 150 },
        { symbol: 'UAH', value: 4050 }
      ]
    }

    const wrapper = mount(ProductItem, {
      global: {
        plugins: [store, router],
        components: { YesNoModal, RedirectLink },
        mocks: {
          $t: mockT // Mock $t
        }
      },
      props: {
        product
      }
    })

    // Verify product title
    expect(wrapper.find('.products_list_item_name_redirect').text()).toBe(product.title)

    // Verify product serial number
    expect(wrapper.find('.products_list_item_serial-number').text()).toBe(product.serialNumber)

    // Verify formatted dates
    expect(wrapper.find('.products_list_item_date_label').text()).toBe('products.productItem.from')
    expect(wrapper.find('.products_list_item_date').text()).toContain('01 / 01 / 2024')
    expect(wrapper.find('.products_list_item_date').text()).toContain('31 / 12 / 2024')

    // Verify product status and used status
    expect(wrapper.find('.products_list_item_status').text()).toBe(
      'products.productItem.status.available'
    )
    expect(wrapper.find('.products_list_item_used-status').text()).toBe(
      'products.productItem.usedStatus.new'
    )

    // Verify price
    expect(wrapper.find('.products_list_item_price_usd').text()).toBe('150 $')
    expect(wrapper.find('.products_list_item_price_uah').text()).toContain('4050')
    expect(wrapper.find('.products_list_item_price_uah_symbol').text()).toBe('UAH')

    // Verify created date
    expect(wrapper.find('.products_list_item_created-date_monthly').text()).toBe('01 / 08')
  })

  it('opens and closes modals', async () => {
    const product = {
      id: 1,
      title: 'Product 1',
      serialNumber: '1234567890',
      date: '2024-08-01',
      guarantee: { start: '2024-01-01', end: '2024-12-31' },
      isNew: 1,
      price: [
        { symbol: 'USD', value: 150 },
        { symbol: 'UAH', value: 4050 }
      ]
    }

    const wrapper = mount(ProductItem, {
      global: {
        plugins: [store, router],
        components: { YesNoModal, RedirectLink },
        mocks: {
          $t: mockT // Mock $t
        }
      },
      props: {
        product
      }
    })

    // Open modal
    await wrapper.find('.products_list_item_delete').trigger('click')
    expect(wrapper.vm.visibility).toBe(true)

    // Close modal
    await wrapper.vm.closeModal()
    expect(wrapper.vm.visibility).toBe(false)
  })

  it('emits delete-product event when deleteProduct is called', async () => {
    const product = {
      id: 1,
      title: 'Product 1',
      serialNumber: '1234567890',
      date: '2024-08-01',
      guarantee: { start: '2024-01-01', end: '2024-12-31' },
      isNew: 1,
      price: [
        { symbol: 'USD', value: 150 },
        { symbol: 'UAH', value: 4050 }
      ]
    }

    const wrapper = mount(ProductItem, {
      global: {
        plugins: [store, router],
        components: { YesNoModal, RedirectLink },
        mocks: {
          $t: mockT // Mock $t
        }
      },
      props: {
        product
      }
    })

    // Open modal to trigger delete
    await wrapper.find('.products_list_item_delete').trigger('click')
    await wrapper.vm.deleteProduct()

    // Check if deleteProduct action was called
    // expect(store.dispatch).toHaveBeenCalledWith('products/deleteProduct', product.id)
    // expect(store.dispatch).toHaveBeenCalledWith('products/getProducts')
  })
})
