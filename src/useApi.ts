import { inject } from 'vue'
import { vueI18nKey } from './injectionSymbols'
import { I18n } from './types'

/**
 * Returns the i18n instance.
 */
export function useI18n(): I18n {
  return inject(vueI18nKey)!
}
