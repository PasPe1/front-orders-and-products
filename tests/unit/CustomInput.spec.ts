import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CustomInput from '@/components/UI/CustomInput/CustomInput.vue'

describe('FormInput', () => {
  it('renders a textarea when type is "textarea"', () => {
    const wrapper = mount(CustomInput, {
      props: {
        type: 'textarea',
        placeholder: 'Enter text',
        isLabel: true,
      },
    })

    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Enter text')

    const textarea = wrapper.find('textarea')
    expect(textarea.exists()).toBe(true)
    expect(textarea.element.placeholder).toBe('Enter text')
  })

  it('renders an input of type "date"', () => {
    const wrapper = mount(CustomInput, {
      props: {
        type: 'date',
        placeholder: 'Select date',
        isLabel: false,
      },
    })

    const label = wrapper.find('label')
    expect(label.exists()).toBe(false)

    const input = wrapper.find('input[type="date"]')
    expect(input.exists()).toBe(true)
    expect(input.element.placeholder).toBe('Select date')
  })

  it('renders an input with the correct type when type is "text"', () => {
    const wrapper = mount(CustomInput, {
      props: {
        type: 'text',
        placeholder: 'Enter text',
        isLabel: true,
      },
    })

    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Enter text')

    const input = wrapper.find('input[type="text"]')
    expect(input.exists()).toBe(true)
    expect(input.element.placeholder).toBe('Enter text')
  })

  it('does not render label when isLabel is false', () => {
    const wrapper = mount(CustomInput, {
      props: {
        placeholder: 'Enter text',
        type: 'text',
        isLabel: false,
      },
    })

    const label = wrapper.find('label')
    expect(label.exists()).toBe(false)

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
  })
})
