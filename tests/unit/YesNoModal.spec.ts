import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import YesNoModal from '../../src/components/UI/Modal/YesNoModal.vue'

describe('YesNoModal', () => {
  const factory = (props = {}, slots = {}) => {
    return mount(YesNoModal, {
      global: {
        stubs: {
          // Assuming that you might have some global stubs or components
        },
        mocks: {
          $t: (msg: string) => msg // Mocking the translation function
        }
      },
      props: {
        visibility: true,
        item: {}, // Mocking the required item prop
        ...props
      },
      slots
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

  // it('emits close-modal event when close button is clicked', async () => {
  //   const wrapper = factory()
  //   const closeModalSpy = vi.fn()
  //   wrapper.vm.$emit = closeModalSpy

  //   await wrapper.find('.modal-close').trigger('click')
  //   await flushPromises()

  //   expect(closeModalSpy).toHaveBeenCalledWith('close-modal')
  // })

  // it('emits delete-product event with item when delete button is clicked', async () => {
  //   const item = { id: 1, name: 'Test Item' }
  //   const wrapper = factory({ item })
  //   const deleteProductSpy = vi.fn()
  //   wrapper.vm.$emit = deleteProductSpy

  //   await wrapper.find('.btn-light').trigger('click')
  //   await flushPromises()

  //   expect(deleteProductSpy).toHaveBeenCalledWith('delete-product', item)
  // })

  it('renders slot content inside modal body', () => {
    const slotContent = '<div class="slot-content">Slot Content</div>'
    const wrapper = factory({}, { default: slotContent })

    expect(wrapper.find('.slot-content').exists()).toBe(true)
    expect(wrapper.find('.slot-content').text()).toBe('Slot Content')
  })
})
