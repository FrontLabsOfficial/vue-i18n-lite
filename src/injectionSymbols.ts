import { InjectionKey } from 'vue'
import { I18n } from './types'

export const hasSymbol =
  typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol'

export const PolySymbol = (name: string) =>
  hasSymbol ? Symbol(name) : '_vt_' + name

export const vueI18nKey = /*#__PURE__*/ PolySymbol('i18n') as InjectionKey<I18n>
