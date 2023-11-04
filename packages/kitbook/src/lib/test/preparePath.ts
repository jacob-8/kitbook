import { DEFAULT_KITBOOK_ROUTE } from '../plugins/vite/constants.js'

export function preparePath({
  path,
  index,
  kitbookRoute,
  srcDirectory = 'src',
}: {
  path: string
  index: number
  kitbookRoute?: string
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

  const url = `${kitbookRoute ?? DEFAULT_KITBOOK_ROUTE}/sandbox${filepathWithoutExtension}?variantIndex=${index}`

  return {
    directory: parts.join('/'),
    filenameWithoutExtension,
    url,
  }
}

if (import.meta.vitest) {
  describe(preparePath, () => {
    test('component', () => {
      const path = 'C:\\dev\\template\\src\\lib\\Button.variants.ts'
      expect(preparePath({ path, index: 0 })).toEqual({
        directory: 'lib',
        filenameWithoutExtension: 'Button',
        url: '/kitbook/sandbox/lib/Button?variantIndex=0',
      })
    })

    test('empty kitbookRoute, turns pages and layouts back to using +', () => {
      const path = 'C:\\dev\\template\\src\\routes\\(app)\\_page.variants.ts'
      expect(preparePath({ kitbookRoute: '', path, index: 1 })).toEqual({
        directory: 'routes/(app)',
        filenameWithoutExtension: '+page',
        url: '/sandbox/routes/(app)/+page?variantIndex=1',
      })
    })
  })
}
