import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { createI18n } from 'vue-i18n'
import { createApp } from 'vue'
import LanguageSwitcher from '../../src/components/LanguageSwitcher/LanguageSwitcher.vue'
import CustomButton from '../../src/components/UI/CustomButton/CustomButton.vue'

// Define the messages for i18n
const messages = {
  ua: { local: { ua: 'Ukrainian', en: 'English' } },
  en: { local: { ua: 'Ukrainian', en: 'English' } }
}

describe('LanguageSwitcher', () => {
  // Helper function to create a Vue app with i18n
  const createTestApp = (locale: string) => {
    const i18n = createI18n({
      locale,
      messages
    })
    const app = createApp(LanguageSwitcher)
    app.use(i18n)
    return { app, i18n }
  }

  it('renders correct button based on locale', async () => {
    const { i18n } = createTestApp('ua')

    // Mount the component
    const wrapper = mount(LanguageSwitcher, {
      global: {
        plugins: [i18n]
      }
    })

    // Wait for async components to be resolved
    await flushPromises()

    // Verify initial button text
    const buttons = wrapper.findAllComponents(CustomButton)
    expect(buttons.length).toBe(1) // Expect one button to be present
    expect(buttons[0].text()).toBe('English') // Text for 'en' locale

    // Change the locale to 'en'
    i18n.global.locale = 'en'
    await flushPromises()

    // Verify the button text has updated
    const updatedButtons = wrapper.findAllComponents(CustomButton)
    expect(updatedButtons.length).toBe(1) // Expect one button to be present
    expect(updatedButtons[0].text()).toBe('Ukrainian') // Text for 'ua' locale
  })

  it('changes locale on button click', async () => {
    const { i18n } = createTestApp('ua')

    // Mount the component
    const wrapper = mount(LanguageSwitcher, {
      global: {
        plugins: [i18n]
      }
    })

    // Wait for async components to be resolved
    await flushPromises()

    // Find the button and click it
    const button = wrapper.findComponent(CustomButton)
    await button.trigger('click')

    // Verify locale change
    expect(i18n.global.locale).toBe('en')
    expect(localStorage.getItem('locale')).toBe('en')
  })
})
