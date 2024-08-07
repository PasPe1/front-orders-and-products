import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AddProductModal from '@/components/UI/Modal/AddProductModal.vue'
import CustomInput from '@/components/UI/CustomInput/CustomInput.vue'

describe('AddProductModal', () => {
  const factory = (props = {}) => {
    return mount(AddProductModal, {
      global: {
        stubs: {
          CustomInput,
        },
        mocks: {
          $t: (msg: string) => msg,
        },
      },
      props: {
        visibility: true,
        variant: 'primary',
        loading: false,
        ...props,
      },
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
})
