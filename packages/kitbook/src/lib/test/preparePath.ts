import { DEFAULT_KITBOOK_ROUTE } from '../plugins/vite/constants'

export function preparePath({ kitbookRoute, path, index, srcDirectory = 'src' }: {
  kitbookRoute: string | undefined
  path: string
  index: number
  srcDirectory?: string
}): {
    directory: string
    filenameWithoutExtension: string
    url: string
  } {
  const [, relativePath] = path.split(srcDirectory)

  const normalizedPath = relativePath
    .replace(/\\\\|\\/g, '/')

  const filepathWithoutExtension = normalizedPath
    .replace('_', '+')
    .replace('.variants.ts', '')

  const parts = filepathWithoutExtension.split('/').filter(Boolean)
  const filenameWithoutExtension = parts.pop() as string

  const url = `${kitbookRoute || DEFAULT_KITBOOK_ROUTE}/sandbox${filepathWithoutExtension}?variantIndex=${index}`

  return {
    directory: parts.join('/'),
    filenameWithoutExtension,
    url,
  }
}

if (import.meta.vitest) {
  describe(preparePath, () => {
    test('component', () => {
      const kitbookRoute = undefined
      const path = 'C:\\dev\\kitbook\\packages\\template\\src\\lib\\Button.variants.ts'
      const index = 0
      expect(preparePath({ kitbookRoute, path, index })).toEqual({
        directory: 'lib',
        filenameWithoutExtension: 'Button',
        url: '/kitbook/sandbox/lib/Button?variantIndex=0',
      })
    })

    test('turns pages and layouts back to using +', () => {
      const kitbookRoute = undefined
      const path = 'C:\\dev\\kitbook\\packages\\template\\src\\routes\\(app)\\_page.variants.ts'
      const index = 1
      expect(preparePath({ kitbookRoute, path, index })).toEqual({
        directory: 'routes/(app)',
        filenameWithoutExtension: '+page',
        url: '/kitbook/sandbox/routes/(app)/+page?variantIndex=1',
      })
    })
  })
}
