import { DEFAULT_KITBOOK_ROUTE } from '../plugins/constants.js'

export function preparePath({
  path,
  variantName,
  kitbookRoute,
  srcDirectory = 'src',
}: {
  path: string
  variantName: string
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

  const url = `${kitbookRoute ?? DEFAULT_KITBOOK_ROUTE}/sandbox${filepathWithoutExtension}?variantName=${variantName}`

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
      expect(preparePath({ path, variantName: 'simple' })).toEqual({
        directory: 'lib',
        filenameWithoutExtension: 'Button',
        url: '/kitbook/sandbox/lib/Button?variantName=simple',
      })
    })

    test('empty kitbookRoute, turns pages and layouts back to using +', () => {
      const path = 'C:\\dev\\template\\src\\routes\\(app)\\_page.variants.ts'
      expect(preparePath({ kitbookRoute: '', path, variantName: 'complex' })).toEqual({
        directory: 'routes/(app)',
        filenameWithoutExtension: '+page',
        url: '/sandbox/routes/(app)/+page?variantName=complex',
      })
    })
  })
}
