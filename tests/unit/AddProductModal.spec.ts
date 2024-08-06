import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import AddProductModal from '../../src/components/UI/Modal/AddProductModal.vue'
import CustomInput from '../../src/components/UI/CustomInput/CustomInput.vue'

describe('AddProductModal', () => {
  const factory = (props = {}) => {
    return mount(AddProductModal, {
      global: {
        stubs: {
          CustomInput
        },
        mocks: {
          $t: (msg: string) => msg // Mocking translation function
        }
      },
      props: {
        visibility: true,
        variant: 'primary',
        loading: false,
        ...props
      }
    })
  }

  it('renders modal when visibility is true', () => {
    const wrapper = factory({ visibility: true })
    expect(wrapper.find('.modal').exists()).toBe(true)
  })

  it('does not render modal when visibility is false', () => {
    const wrapper = factory({ visibility: false })
    expect(wrapper.find('.modal').exists()).toBe(false)
  })

  // it('emits close-modal event and resets form on close button click', async () => {
  //   const wrapper = factory()
  //   const closeModalSpy = vi.fn()
  //   wrapper.vm.$emit = closeModalSpy

  //   await wrapper.find('.btn-close').trigger('click')
  //   await flushPromises()

  //   expect(closeModalSpy).toHaveBeenCalledWith('close-modal')
  //   expect(wrapper.vm.product).toEqual({
  //     serialNumber: 0,
  //     isNew: 1,
  //     photo: '',
  //     title: '',
  //     type: '',
  //     specification: '',
  //     guarantee: {
  //       start: '',
  //       end: ''
  //     },
  //     price: [
  //       { value: 0, symbol: 'USD', isDefault: 0 },
  //       { value: 0, symbol: 'UAH', isDefault: 1 }
  //     ],
  //     sequence: 1,
  //     date: ''
  //   })
  // })

  // it('emits create-product event with product data on create button click', async () => {
  //   const wrapper = factory()
  //   wrapper.vm.product = {
  //     serialNumber: 1234,
  //     isNew: 0,
  //     photo: 'path/to/photo',
  //     title: 'Test Product',
  //     type: 'Electronics',
  //     specification: 'Specification details',
  //     guarantee: {
  //       start: '2024-01-01',
  //       end: '2025-01-01'
  //     },
  //     price: [
  //       { value: 100, symbol: 'USD', isDefault: 0 },
  //       { value: 3000, symbol: 'UAH', isDefault: 1 }
  //     ],
  //     sequence: 2,
  //     date: '2024-08-06'
  //   }
  //   const createProductSpy = vi.fn()
  //   // wrapper.vm.$emit = createProductSpy

  //   await wrapper.find('button.btn').trigger('click')
  //   await flushPromises()

  //   expect(createProductSpy).toHaveBeenCalledWith('create-product', wrapper.vm.product)
  //   expect(wrapper.vm.product).toEqual({
  //     serialNumber: 0,
  //     isNew: 1,
  //     photo: '',
  //     title: '',
  //     type: '',
  //     specification: '',
  //     guarantee: {
  //       start: '',
  //       end: ''
  //     },
  //     price: [
  //       { value: 0, symbol: 'USD', isDefault: 0 },
  //       { value: 0, symbol: 'UAH', isDefault: 1 }
  //     ],
  //     sequence: 1,
  //     date: ''
  //   })
  // })

  it('disables create button when loading is true', async () => {
    const wrapper = factory({ loading: true })
    const button = wrapper.find('button.btn')
    expect(button.attributes('disabled')).toBe('')
  })

  it('does not disable create button when loading is false', async () => {
    const wrapper = factory({ loading: false })
    const button = wrapper.find('button.btn')
    expect(button.attributes('disabled')).toBeUndefined()
  })
})
