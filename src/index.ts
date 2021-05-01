import { App, ref, readonly } from 'vue'
import {
  getMessage,
  isEmpty,
  parseLocaleValues,
  replaceLocaleValues,
} from './utils'
import {
  I18nOptions,
  I18nLocale,
  I18nLocales,
  I18n,
  I18nValues,
  I18nLocaleMessages,
} from './types'
import { vueI18nKey } from './injectionSymbols'

/**
 * Creates a I18n instance that can be used by a Vue app.
 *
 * @param options - {@link I18nOptions}
 */
export function createI18n(options?: I18nOptions): I18n {
  const current = ref(options?.locale || 'en')
  const locales: I18nLocales = options?.messages || {}

  return {
    t(key: string, option?: I18nLocale | I18nValues): string {
      if (!key) {
        return ''
      }

      const locale = typeof option === 'string' && option ? option : current.value
      if (!locales[locale]) {
        return key
      }

      let message = getMessage(locales[locale], key)
      if (option && typeof option !== 'string') {
        const values = parseLocaleValues(message, option)
        if (!isEmpty(values)) {
          message = replaceLocaleValues(message, values)
        }
      }

      return message || key
    },
    current: readonly(current),
    options: readonly(options || {}),
    install(app: App) {
      const context = this
      app.config.globalProperties.$t = context.t
      app.provide(vueI18nKey, context)
    },
    changeLocale(locale: string) {
      current.value = locale
    },
    setLocaleMessage(locale: string, messages: I18nLocaleMessages) {
      locales[locale] = Object.assign({}, locales[locale] || {}, messages)
    },
    getLocaleMessage(locale: I18nLocale): I18nLocaleMessages {
      return locales[locale] || {}
    },
  }
}

export * from './useApi'
export * from './globalExtensions'
export * from './types'

/**
 * Super lightweight internationalization (i18n) plugin for Vue 3
 *
 * @packageDocumentation
 */
