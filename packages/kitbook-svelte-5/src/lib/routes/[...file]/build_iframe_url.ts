import type { KitbookSettings } from '../../kitbook-types'
import { compressToEncodedURIComponent as encode } from '../../lz/lz-string'
import { find_kitbook_path } from './find_kitbook_path'

export function build_iframe_url({
  pathname,
  languageCode,
  add_language_to_url,
  props,
  story_name,
  composition_name,
  dark_mode,
}: {
  pathname: string
  languageCode?: string
  add_language_to_url?: KitbookSettings['add_language_to_url']
  props?: Record<string, any>
  story_name?: string
  composition_name?: string
  dark_mode?: boolean
}) {
  const { kitbookPath, activePath } = find_kitbook_path(pathname)
  const queryParams = []
  if (dark_mode)
    queryParams.push('darkMode=true')
  if (props)
    queryParams.push(`props=${encode(JSON.stringify(props))}`)
  if (story_name)
    queryParams.push(`story_name=${story_name}`)
  if (composition_name)
    queryParams.push(`composition_name=${composition_name}`)

  const queryParamsString = queryParams.length ? `?${queryParams.join('&')}` : ''
  const url = `${kitbookPath}/sandbox${activePath}${queryParamsString}`

  if (languageCode && add_language_to_url)
    return add_language_to_url({ url, code: languageCode })

  return url
}

if (import.meta.vitest) {
  describe(build_iframe_url, () => {
    test('variant', () => {
      const actual = build_iframe_url({
        pathname: '/kitbook/foo/bar',
        story_name: 'simple',
      })
      const expected = '/kitbook/sandbox/foo/bar?variantName=simple'
      expect(actual).toEqual(expected)
    })

    test('composition with language', () => {
      const actual = build_iframe_url({
        pathname: '/kitbook/foo/bar',
        languageCode: 'de',
        add_language_to_url({ code, url }) {
          const [path, search] = url.split('?')
          const params = new URLSearchParams(search)
          params.set('lang', code)
          return `${path}?${params.toString()}`
        },
        composition_name: 'default',
      })
      const expected = '/kitbook/sandbox/foo/bar?compositionName=default&lang=de'
      expect(actual).toEqual(expected)
    })

    test('variant with props and English in url but no code and function', () => {
      const actual = build_iframe_url({
        pathname: '/en/kitbook/foo/bar',
        story_name: 'complex',
        props: { foo: 'bar' },
      })
      const expected = '/en/kitbook/sandbox/foo/bar?props=N4IgZg9hIFwgRgQwE4gL5A&variantName=complex'
      expect(actual).toEqual(expected)
    })

    test('variant with different language', () => {
      const actual = build_iframe_url({
        pathname: '/[lang]/kitbook/foo/bar',
        languageCode: 'de',
        add_language_to_url({ code, url }) {
          return url.replace('[lang]', code)
        },
        story_name: 'simple',
      })
      const expected = '/de/kitbook/sandbox/foo/bar?variantName=simple'
      expect(actual).toEqual(expected)
    })
  })
}
