import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { createI18n } from 'vue-i18n'
import { createApp } from 'vue'
import Cookies from 'js-cookie'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher.vue'
import CustomButton from '@/components/UI/CustomButton/CustomButton.vue'

const messages = {
  ua: { local: { ua: 'Ukrainian', en: 'English' } },
  en: { local: { ua: 'Ukrainian', en: 'English' } },
}

describe('LanguageSwitcher', () => {
  const createTestApp = (locale: string) => {
    const i18n = createI18n({
      locale,
      messages,
    })
    const app = createApp(LanguageSwitcher)
    app.use(i18n)
    return { app, i18n }
  }

  it('renders correct button based on locale', async () => {
    const { i18n } = createTestApp('ua')

    const wrapper = mount(LanguageSwitcher, {
      global: {
        plugins: [i18n],
      },
    })

    await flushPromises()

    const buttons = wrapper.findAllComponents(CustomButton)
    expect(buttons.length).toBe(1)
    expect(buttons[0].text()).toBe('English')

    i18n.global.locale = 'en'
    await flushPromises()

    const updatedButtons = wrapper.findAllComponents(CustomButton)
    expect(updatedButtons.length).toBe(1)
    expect(updatedButtons[0].text()).toBe('Ukrainian')
  })

  it('changes locale on button click', async () => {
    const { i18n } = createTestApp('ua')

    const wrapper = mount(LanguageSwitcher, {
      global: {
        plugins: [i18n],
      },
    })

    await flushPromises()

    const button = wrapper.findComponent(CustomButton)
    await button.trigger('click')

    expect(i18n.global.locale).toBe('en')
    expect(Cookies.get('locale')).toBe('en')
  })
})
