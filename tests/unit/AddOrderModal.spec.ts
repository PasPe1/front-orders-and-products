import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AddOrderModal from '@/components/UI/Modal/AddOrderModal.vue'

describe('AddOrderModal', () => {
  const $t = vi.fn(key => key)

  it('renders correctly when visibility is true', () => {
    const wrapper = mount(AddOrderModal, {
      props: {
        visibility: true,
        variant: 'primary',
        loading: false,
      },
      global: {
        mocks: {
          $t,
        },
      },
    })
    expect(wrapper.find('.modal').exists()).toBe(true)
  })

  it('emits close-modal event and resets order when closeModal is called', async () => {
    const wrapper = mount(AddOrderModal, {
      props: {
        visibility: true,
        variant: 'primary',
        loading: false,
      },
      global: {
        mocks: {
          $t,
        },
      },
    })

    const closeModalSpy = vi.spyOn(wrapper.vm, 'closeModal')
    wrapper.vm.closeModal()

    expect(closeModalSpy).toHaveBeenCalled()
    expect(wrapper.emitted('close-modal')).toBeTruthy()
    expect(wrapper.vm.order).toEqual({ title: '', date: '', description: '' })
  })
})
