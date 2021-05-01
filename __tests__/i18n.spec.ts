import { createI18n } from '../src'
import { I18n } from '../src'

const defaultMessages = {
  home: {
    general: {
      button: 'Home',
    },
  },
}

describe('i18n', () => {
  describe('Init', () => {
    it('create plugin', () => {
      const plugin = createI18n()
      expect(plugin.current.value).toEqual('en')
    })

    it('create plugin with options', () => {
      const plugin = createI18n({
        locale: 'vi',
      })
      expect(plugin.current.value).toEqual('vi')
    })
  })

  describe('Plugin', () => {
    let plugin: I18n
    beforeEach(() => {
      plugin = createI18n({
        locale: 'en',
        messages: {
          en: defaultMessages,
        },
      })
    })

    it('message', () => {
      expect(plugin.t('home.general.button')).toEqual('Home')
    })

    it('extend and override message', () => {
      const messages = {
        home: {
          general: {
            button: 'Add to cart',
            cancel: 'Cancel',
          },
        },
      }

      plugin.setLocaleMessage('en', messages)
      expect(plugin.t('home.general.button')).toEqual(
        messages.home.general.button
      )
      expect(plugin.t('home.general.cancel')).toEqual(
        messages.home.general.cancel
      )
    })

    it('change locale', () => {
      const messages = {
        home: {
          general: {
            button: 'Trang chủ',
          },
        },
      }

      plugin.setLocaleMessage('vi', messages)
      plugin.changeLocale('vi')
      expect(plugin.t('home.general.button')).toEqual(
        messages.home.general.button
      )
    })

    it('message with values', () => {
      const messages = {
        cart: {
          alert: 'Total products {total}. Total amount: ${amount}',
        },
      }

      plugin.setLocaleMessage('en', messages)
      expect(plugin.t('cart.alert', { total: 10, amount: 9999 })).toEqual(
        'Total products 10. Total amount: $9999'
      )
      expect(plugin.t('cart.alert', [10])).toEqual(
        'Total products 10. Total amount: ${amount}'
      )
    })
  })
})
