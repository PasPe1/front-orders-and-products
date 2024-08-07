import { mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import CustomButton from '@/components/UI/CustomButton/CustomButton.vue'

it.only('render button', async () => {
  const onClickSpy = vi.fn()
  const props = { text: 'Hello', onClick: onClickSpy, disabled: false }

  const wrapper = mount(CustomButton, {
    props: {
      text: 'Hello',
      onClick: onClickSpy,
      disabled: false,
    },
  })

  expect(wrapper.props().text).toBe(props.text)
  expect(wrapper.props().disabled).toBe(props.disabled)

  const button = wrapper.find('button')

  await button.trigger('click')

  expect(onClickSpy).toHaveBeenCalled()
})
