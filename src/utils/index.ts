import { I18nLocaleMessageObject, I18nValueObject, I18nValues } from '../types'

const disallowedKeys = ['__proto__', 'prototype', 'constructor']

/**
 * Is object
 * @param value
 */
export function isObject(value: any): boolean {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}

/**
 * Check is empty
 * @param obj
 */
export function isEmpty(obj: Array<any> | Object): boolean {
  return !(Array.isArray(obj) ? obj.length : Object.keys(obj).length)
}

/**
 * Is valid path
 * @param segments
 */
export function isValidPath(segments: Array<string>): boolean {
  return !segments.some(
    (segment: string) => disallowedKeys.indexOf(segment) !== -1
  )
}

/**
 * Parse path
 * @param path
 */
export function parsePath(path: string): Array<string> {
  const pathArray = path.split('.')
  const parts = []

  for (let i = 0; i < pathArray.length; i++) {
    let p = pathArray[i]

    while (p[p.length - 1] === '\\' && pathArray[i + 1] !== undefined) {
      p = p.slice(0, -1) + '.'
      p += pathArray[++i]
    }

    parts.push(p)
  }

  if (!isValidPath(parts)) {
    return []
  }

  return parts
}

/**
 * Get object value by path
 * @param object
 * @param path
 */
export function getMessage(
  object: I18nLocaleMessageObject,
  path: string
): string {
  if (!isObject(object)) {
    return ''
  }

  const paths = parsePath(path)
  if (paths.length === 0) {
    return ''
  }

  let rawObject = Object.assign({}, object)
  for (let i = 0; i < paths.length; i++) {
    if (typeof rawObject[paths[i]] === 'string') {
      return rawObject[paths[i]] as string
    }

    rawObject = rawObject[paths[i]] as I18nLocaleMessageObject
    if (rawObject === undefined || rawObject === null) {
      if (i !== paths.length - 1) {
        return ''
      }

      break
    }
  }

  return ''
}

/**
 * Parse locale values
 * @param message
 * @param values
 */
export function parseLocaleValues(
  message: string,
  values: I18nValues
): I18nValueObject {
  if (Array.isArray(values)) {
    const parseValues: I18nValueObject = {}
    const matches = [...message.matchAll(/{(.+?)}/g)]
    if (matches) {
      matches.forEach((match, index) => {
        if (values[index]) {
          parseValues[match[1]] = values[index]
        }
      })
    }

    return parseValues
  }

  return values as I18nValueObject
}

/**
 * Replace locale values to message
 * @param message
 * @param values
 */
export function replaceLocaleValues(message: string, values: I18nValueObject) {
  for (const key in values) {
    message = message.replace(`{${key}}`, String(values[key]))
  }

  return message
}
