import { createApp } from './main'
import router from './router'
import { store } from './store/store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import i18n from '@/locales/i18n'

const { app } = createApp()

app.use(i18n)
app.use(router)
app.use(store)
app.use(i18n)

app.mount('#app')
