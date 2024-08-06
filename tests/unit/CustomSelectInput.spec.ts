import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CustomSelectInput from '../../src/components/UI/CustomSelectInput/CustomSelectInput.vue'

describe('YourComponent', () => {
  it('renders correctly with placeholder and isLabel props', () => {
    const wrapper = mount(CustomSelectInput, {
      props: {
        placeholder: 'Select an option',
        isLabel: true
      }
    })

    // Check if label is rendered
    const label = wrapper.find('.form-group_label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Select an option:')

    // Check if select element exists
    const select = wrapper.find('select')
    expect(select.exists()).toBe(true)

    // Check the options in the select element
    const options = select.findAll('option')
    expect(options).toHaveLength(4) // Includes the default option
    expect(options[0].text()).toBe('Open this select menu')
    expect(options[1].text()).toBe('One')
    expect(options[2].text()).toBe('Two')
    expect(options[3].text()).toBe('Three')
  })

  it('does not render label when isLabel is false', () => {
    const wrapper = mount(CustomSelectInput, {
      props: {
        placeholder: 'Select an option',
        isLabel: false
      }
    })

    // Check if label is not rendered
    const label = wrapper.find('.form-group_label')
    expect(label.exists()).toBe(false)

    // Check if select element exists
    const select = wrapper.find('select')
    expect(select.exists()).toBe(true)
  })

  it('renders correctly without placeholder', () => {
    const wrapper = mount(CustomSelectInput, {
      props: {
        placeholder: '',
        isLabel: true
      }
    })

    // Check if label is not rendered
    const label = wrapper.find('.form-group_label')
    expect(label.exists()).toBe(false)

    // Check if select element exists
    const select = wrapper.find('select')
    expect(select.exists()).toBe(true)
  })
})
