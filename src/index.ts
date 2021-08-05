import { App, ref, reactive, readonly, toRaw } from 'vue'
import {
  getMessage,
  isEmpty,
  mergeDeep,
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
  const initOptions = Object.assign(
    { locale: 'en', fallbackLocale: 'en', messages: {} },
    options
  )
  const current = ref(initOptions.locale)
  const locales: I18nLocales = reactive({})
  Object.entries(initOptions.messages).forEach(([key, messages]) => {
    locales[key] = messages
  })

  return {
    t(key: string, option?: I18nLocale | I18nValues): string {
      if (!key) {
        return ''
      }

      const locale =
        typeof option === 'string' && option ? option : current.value

      let message =
        getMessage(locales[locale], key) ||
        getMessage(locales[initOptions.fallbackLocale], key)
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
      locales[locale] = mergeDeep(toRaw(locales[locale] || {}), messages)
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
