import type { KitbookSettings } from '../kitbook-types'
import { findKitbookPath } from '../layout/kitbookPath'
import { compressToEncodedURIComponent as encode } from '../lz/lz-string'

export function buildIframeUrl({
  pathname,
  languageCode,
  addLanguageToUrl,
  props,
  variantName,
  compositionName,
  darkMode,
}: {
  pathname: string
  languageCode?: string
  addLanguageToUrl?: KitbookSettings['addLanguageToUrl']
  props?: Record<string, any>
  variantName?: string
  compositionName?: string
  darkMode?: boolean
}) {
  const { kitbookPath, activePath } = findKitbookPath(pathname)
  const queryParams = []
  if (darkMode)
    queryParams.push('darkMode=true')
  if (props)
    queryParams.push(`props=${encode(JSON.stringify(props))}`)
  if (variantName)
    queryParams.push(`variantName=${variantName}`)
  if (compositionName)
    queryParams.push(`compositionName=${compositionName}`)
  if (queryParams.length === 0)
    throw new Error('No variantName or compositionName specified')

  const queryParamsString = `?${queryParams.join('&')}`
  const url = `${kitbookPath}/sandbox${activePath}${queryParamsString}`

  if (languageCode && addLanguageToUrl)
    return addLanguageToUrl({ url, code: languageCode })

  return url
}

if (import.meta.vitest) {
  describe(buildIframeUrl, () => {
    test('variant', () => {
      const actual = buildIframeUrl({
        pathname: '/kitbook/foo/bar',
        variantName: 'simple',
      })
      const expected = '/kitbook/sandbox/foo/bar?variantName=simple'
      expect(actual).toEqual(expected)
    })

    test('composition with language', () => {
      const actual = buildIframeUrl({
        pathname: '/kitbook/foo/bar',
        languageCode: 'de',
        addLanguageToUrl({ code, url }) {
          const [path, search] = url.split('?')
          const params = new URLSearchParams(search)
          params.set('lang', code)
          return `${path}?${params.toString()}`
        },
        compositionName: 'default',
      })
      const expected = '/kitbook/sandbox/foo/bar?compositionName=default&lang=de'
      expect(actual).toEqual(expected)
    })

    test('variant with props and English in url but no code and function', () => {
      const actual = buildIframeUrl({
        pathname: '/en/kitbook/foo/bar',
        variantName: 'complex',
        props: { foo: 'bar' },
      })
      const expected = '/en/kitbook/sandbox/foo/bar?props=N4IgZg9hIFwgRgQwE4gL5A&variantName=complex'
      expect(actual).toEqual(expected)
    })

    test('variant with different language', () => {
      const actual = buildIframeUrl({
        pathname: '/[lang]/kitbook/foo/bar',
        languageCode: 'de',
        addLanguageToUrl({ code, url }) {
          return url.replace('[lang]', code)
        },
        variantName: 'simple',
      })
      const expected = '/de/kitbook/sandbox/foo/bar?variantName=simple'
      expect(actual).toEqual(expected)
    })
  })
}
