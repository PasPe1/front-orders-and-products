import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import AddOrderModal from '../../src/components/UI/Modal/AddOrderModal.vue'
import CustomInput from '../../src/components/UI/CustomInput/CustomInput.vue'

describe('AddOrderModal', () => {
  const factory = (props = {}) => {
    return mount(AddOrderModal, {
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
  //   expect(wrapper.vm.order).toEqual({ title: '', date: '', description: '' })
  // })

  // it('emits create-order event with order data on create button click', async () => {
  //   const wrapper = factory()
  //   wrapper.vm.order = { title: 'Test Order', date: '2024-08-01', description: 'Test Description' }
  //   const createOrderSpy = vi.fn()
  //   wrapper.vm.$emit = createOrderSpy

  //   await wrapper.find('button.btn').trigger('click')
  //   await flushPromises()

  //   expect(createOrderSpy).toHaveBeenCalledWith('create-order', wrapper.vm.order)
  //   expect(wrapper.vm.order).toEqual({ title: '', date: '', description: '' })
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
