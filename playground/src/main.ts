import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from '../../src'

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {
      button: {
        add: 'Add new',
      },
    },
    vi: {
      button: {
        add: 'Thêm mới',
      },
    },
  },
  missing: (locale, key) => {
    console.error(`Missing translation for key: ${key}`)
    return key
  },
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')
