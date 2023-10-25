import type { KitbookSettings } from '../kitbook-types'
import { DEFAULT_KITBOOK_ROUTE } from '../plugins/vite/constants'

export function preparePath({ kitbookRoute, path, index, srcDirectory = 'src', languageCode, addLanguageToUrl }: {
  kitbookRoute?: string
  path: string
  index: number
  srcDirectory?: string
  languageCode?: string
  addLanguageToUrl?: KitbookSettings['addLanguageToUrl']
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

  const urlWithLanguage = (languageCode && addLanguageToUrl) ? addLanguageToUrl({ url, code: languageCode }) : url

  return {
    directory: parts.join('/'),
    filenameWithoutExtension,
    url: urlWithLanguage,
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

    test('language', () => {
      const path = 'C:\\dev\\template\\src\\lib\\Button.variants.ts'
      expect(preparePath({
        path,
        index: 0,
        languageCode: 'de',
        addLanguageToUrl: ({ code, url }) => {
          const [path, search] = url.split('?')
          const params = new URLSearchParams(search)
          params.set('lang', code)
          return `${path}?${params.toString()}`
        },
      })).toEqual({
        directory: 'lib',
        filenameWithoutExtension: 'Button',
        url: '/kitbook/sandbox/lib/Button?variantIndex=0&lang=de',
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
