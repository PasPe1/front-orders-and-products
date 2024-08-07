import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import YesNoModal from '@/components/UI/Modal/YesNoModal.vue'

describe('YesNoModal', () => {
  it('does not render modal when visibility is false', () => {
    const wrapper = mount(YesNoModal, {
      props: {
        visibility: false,
        item: { id: '1', title: 'Test Product' },
        loading: false,
      },
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    })

    expect(wrapper.find('.modal').exists()).toBeFalsy()
  })
})
