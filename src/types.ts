import { App, Ref } from 'vue'
import { DeepReadonly, UnwrapNestedRefs } from '@vue/reactivity'

/**
 * I18n options
 */
export type I18nOptions = {
  locale?: string
  fallbackLocale?: string
  messages?: {
    [locale: string]: I18nLocaleMessages
  }
}

/**
 * I18n value
 */
export type I18nValue = number | string

/**
 * I18n value object
 */
export type I18nValueObject = { [k: string]: I18nValue }

/**
 * I18n values
 */
export type I18nValues = I18nValue[] | I18nValueObject

/**
 * I18n locale
 */
export type I18nLocale = string

/**
 * I18n locale message
 */
export type I18nLocaleMessage = string

/**
 * I18n locale message object
 */
export type I18nLocaleMessageObject = {
  [k: string]: I18nLocaleMessageObject | I18nLocaleMessage
}

/**
 * I18n locale messages
 */
export type I18nLocaleMessages = {
  [k: string]: I18nLocaleMessageObject | I18nLocaleMessage
}

/**
 * I18n locales
 */
export type I18nLocales = UnwrapNestedRefs<{
  [k: string]: I18nLocaleMessages
}>

/**
 * I18n instance
 */
export type I18n = {
  current: DeepReadonly<UnwrapNestedRefs<Ref<string>>>
  options: DeepReadonly<UnwrapNestedRefs<I18nOptions>>
  setLocaleMessage(locale: I18nLocale, messages: I18nLocaleMessages): void
  getLocaleMessage(locale: I18nLocale): I18nLocaleMessages
  changeLocale(locale: I18nLocale): void
  install(app: App): void
  t(key: string, values?: I18nValues): string
  t(key: string, locale?: I18nLocale): string
}
