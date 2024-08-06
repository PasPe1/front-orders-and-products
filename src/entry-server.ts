import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'
import { store } from './store/store'
import router from './router'

export async function render() {
  const { app } = createApp()

  app.use(router)
  app.use(store)

  const ctx = {}
  const html = await renderToString(app, ctx)

  return { html }
}
