import { mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import CustomButton from '../../src/components/UI/CustomButton/CustomButton.vue'

it.only('render button', async () => {
  const onClickSpy = vi.fn()
  const props = { text: 'Hello', onClick: onClickSpy, disabled: false }

  const wrapper = mount(CustomButton, {
    props: {
      text: 'Hello',
      onClick: onClickSpy,
      disabled: false
    }
  })

  expect(wrapper.props().text).toBe(props.text)
  expect(wrapper.props().disabled).toBe(props.disabled)

  const button = wrapper.find('button')

  // Trigger a click event on the button
  await button.trigger('click')

  // Assert that the onClick function was called
  expect(onClickSpy).toHaveBeenCalled()
})
