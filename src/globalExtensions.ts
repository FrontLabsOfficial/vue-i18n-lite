import { I18nLocale, I18nValues } from './types'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $t(key: string, values?: I18nValues): string
    $t(key: string, locale: I18nLocale): string
  }
}
