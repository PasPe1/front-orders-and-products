import { shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AddOrderModal from '@/components/UI/Modal/AddOrderModal.vue'

describe('AddOrderModal.vue', () => {
  it('emits close-modal event when closeModal method is called', async () => {
    const wrapper = shallowMount(AddOrderModal, {
      props: {
        visibility: true,
        variant: 'primary',
        loading: false,
      },
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    })

    wrapper.vm.closeModal()

    expect(wrapper.emitted('close-modal')).toBeTruthy()
  })

  it('emits create-order event with correct order data when createOrder method is called', async () => {
    const wrapper = shallowMount(AddOrderModal, {
      props: {
        visibility: true,
        variant: 'primary',
        loading: false,
      },
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    })

    wrapper.setData({
      order: {
        title: 'Test Order',
        date: '2024-08-07',
        description: 'This is a test order description.',
      },
    })

    await wrapper.vm.createOrder()

    expect(wrapper.emitted('create-order')).toBeTruthy()
    expect(wrapper.emitted('create-order')[0][0]).toEqual({
      title: 'Test Order',
      date: '2024-08-07',
      description: 'This is a test order description.',
    })

    expect(wrapper.vm.order).toEqual({
      title: '',
      date: '',
      description: '',
    })
  })
})
