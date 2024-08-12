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

  it('validates form inputs correctly', async () => {
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

    wrapper.vm.order.title = ''
    wrapper.vm.order.date = ''
    wrapper.vm.order.description = ''
    await wrapper.vm.$nextTick()

    const isValid = wrapper.vm.validate()

    expect(isValid).toBe(false)
    expect(wrapper.vm.errors.title).toBe('Title is required!')
    expect(wrapper.vm.errors.date).toBe('Date is required!')
    expect(wrapper.vm.errors.description).toBe('Description is required!')
  })
})
