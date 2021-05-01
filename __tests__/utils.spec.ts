import {
  getMessage,
  isValidPath,
  parseLocaleValues,
  parsePath,
  replaceLocaleValues,
} from '../src/utils'

describe('Utils', () => {
  describe('parsePath', () => {
    it('valid path', () => {
      const paths = parsePath('a.b.c')
      expect(paths).toEqual(['a', 'b', 'c'])
    })

    it('invalid path', () => {
      const paths = parsePath('a/b/c')
      expect(paths).toHaveLength(1)
    })
  })

  describe('isValidPath', () => {
    it('valid', () => {
      expect(isValidPath(['a', 'b', 'c'])).toBeTruthy()
    })
  })

  describe('getMessages', () => {
    it('default', () => {
      expect(getMessage({ home: 'Home' }, 'home')).toEqual('Home')
    })

    it('not exists', () => {
      expect(getMessage({}, 'home.button.add')).toEqual('')
    })
  })

  describe('locale values', () => {
    const message = 'Total: {total}. Amount: ${amount}'
    const values = { total: 10, amount: 100 }

    it('values is object', () => {
      expect(parseLocaleValues(message, values)).toEqual(values)
    })

    it('values is array', () => {
      expect(parseLocaleValues(message, [10, 100])).toEqual(values)
    })

    it('replace values', () => {
      expect(replaceLocaleValues(message, values)).toEqual(
        'Total: 10. Amount: $100'
      )
    })
  })
})
