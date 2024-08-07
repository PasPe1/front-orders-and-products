import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CustomSelectInput from '@/components/UI/CustomSelectInput/CustomSelectInput.vue'

describe('YourComponent', () => {
  it('does not render label when isLabel is false', () => {
    const wrapper = mount(CustomSelectInput, {
      props: {
        placeholder: 'Select an option',
        isLabel: false,
      },
    })

    const label = wrapper.find('.form-group_label')
    expect(label.exists()).toBe(false)

    const select = wrapper.find('select')
    expect(select.exists()).toBe(true)
  })

  it('renders correctly without placeholder', () => {
    const wrapper = mount(CustomSelectInput, {
      props: {
        placeholder: '',
        isLabel: true,
      },
    })

    const label = wrapper.find('.form-group_label')
    expect(label.exists()).toBe(false)

    const select = wrapper.find('select')
    expect(select.exists()).toBe(true)
  })
})
