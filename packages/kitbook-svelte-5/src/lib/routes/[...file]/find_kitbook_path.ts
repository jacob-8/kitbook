export function find_kitbook_path(path: string): {
  kitbookPath: string
  activePath: string
} {
  const kitbookIndex = path.indexOf('/kitbook')

  if (kitbookIndex === -1) {
    return {
      kitbookPath: '',
      activePath: path.replace(/\/$/, ''),
    }
  }

  const kitbookPath = path.slice(0, kitbookIndex + 8)
  const activePath = path.slice(kitbookPath.length).replace(/\/$/, '')
  return {
    kitbookPath,
    activePath,
  }
}

if (import.meta.vitest) {
  describe(find_kitbook_path, () => {
    test('root is /', () => {
      expect(find_kitbook_path('/')).toEqual({
        kitbookPath: '',
        activePath: '',
      })
    })

    test('root is /kitbook', () => {
      expect(find_kitbook_path('/kitbook')).toEqual({
        kitbookPath: '/kitbook',
        activePath: '',
      })
    })

    test('root is /kitbook/', () => {
      expect(find_kitbook_path('/kitbook/')).toEqual({
        kitbookPath: '/kitbook',
        activePath: '',
      })
    })

    test('root is /en/kitbook', () => {
      expect(find_kitbook_path('/en/kitbook')).toEqual({
        kitbookPath: '/en/kitbook',
        activePath: '',
      })
    })

    test('nested', () => {
      expect(find_kitbook_path('/kitbook/docs')).toEqual({
        kitbookPath: '/kitbook',
        activePath: '/docs',
      })
    })

    test('nested with trailing slash', () => {
      expect(find_kitbook_path('/de/kitbook/docs/')).toEqual({
        kitbookPath: '/de/kitbook',
        activePath: '/docs',
      })
    })

    test('nested including kitbook in name', () => {
      expect(find_kitbook_path('/en/kitbook/docs/kitbook')).toEqual({
        kitbookPath: '/en/kitbook',
        activePath: '/docs/kitbook',
      })
    })
  })
}
