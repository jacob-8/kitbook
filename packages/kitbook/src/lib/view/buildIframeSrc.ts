import { findKitbookPath } from '../layout/kitbookPath'
import { compressToEncodedURIComponent as encode } from '../lz/lz-string'

export function buildIframeUrl({ pathname, languageCode, props, variantIndex, compositionName }:
{
  pathname: string
  languageCode?: string
  props?: Record<string, any>
  variantIndex?: number
  compositionName?: string
}) {
  const { kitbookPath, activePath } = findKitbookPath(pathname)
  const queryParams = []
  if (props)
    queryParams.push(`props=${encode(JSON.stringify(props))}`)
  if (typeof variantIndex === 'number')
    queryParams.push(`variantIndex=${variantIndex}`)
  if (compositionName)
    queryParams.push(`compositionName=${compositionName}`)

  const languageEncodedKitbookPath = languageCode ? `${kitbookPath.replace('en', languageCode)}` : kitbookPath

  if (queryParams.length === 0)
    throw new Error('No variantIndex nor Composition name specified')

  const queryParamsString = `?${queryParams.join('&')}`
  return `${languageEncodedKitbookPath}/sandbox${activePath}${queryParamsString}`
}

if (import.meta.vitest) {
  describe(buildIframeUrl, () => {
    test('variant', () => {
      const actual = buildIframeUrl({
        pathname: '/kitbook/foo/bar',
        variantIndex: 0,
      })
      const expected = '/kitbook/sandbox/foo/bar?variantIndex=0'
      expect(actual).toEqual(expected)
    })

    test('composition (with random unused language code)', () => {
      const actual = buildIframeUrl({
        pathname: '/kitbook/foo/bar',
        languageCode: 'de',
        compositionName: 'default',
      })
      const expected = '/kitbook/sandbox/foo/bar?compositionName=default'
      expect(actual).toEqual(expected)
    })

    test('variant with props and English language code', () => {
      const actual = buildIframeUrl({
        pathname: '/en/kitbook/foo/bar',
        languageCode: 'en',
        variantIndex: 1,
        props: { foo: 'bar' },
      })
      const expected = '/en/kitbook/sandbox/foo/bar?props=N4IgZg9hIFwgRgQwE4gL5A&variantIndex=1'
      expect(actual).toEqual(expected)
    })

    test('variant with different language', () => {
      const actual = buildIframeUrl({
        pathname: '/en/kitbook/foo/bar',
        languageCode: 'de',
        variantIndex: 2,
      })
      const expected = '/de/kitbook/sandbox/foo/bar?variantIndex=2'
      expect(actual).toEqual(expected)
    })
  })
}
