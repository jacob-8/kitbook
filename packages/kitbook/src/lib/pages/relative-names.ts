export function friendly_relative_name(path: string) {
  let no_extension = path.replace(/\.svelte$/, '')

  if (no_extension.includes('/+page') || no_extension.includes('/+layout')) {
    no_extension = no_extension.substring(0, no_extension.lastIndexOf('/'))
    no_extension = no_extension.replace(/.*routes/, '')

    if (no_extension === '')
      no_extension = '/'

    if (path.includes('/+layout'))
      no_extension += ' Layout'

    return no_extension
  }

  return no_extension.substring(no_extension.lastIndexOf('/') + 1)
}

if (import.meta.vitest) {
  describe(friendly_relative_name, () => {
    test('shows url for page routes', () => {
      expect(friendly_relative_name('/routes/+page.svelte')).toEqual('/')
      expect(friendly_relative_name('/routes/another/+page.svelte')).toEqual('/another')
    })

    test('shows url and Layout title for layouts', () => {
      expect(friendly_relative_name('/routes/+layout.svelte')).toEqual('/ Layout')
      expect(friendly_relative_name('/routes/inner/+layout.svelte')).toEqual('/inner Layout')
    })

    test('Only shows component title for regular Svelte components', () => {
      expect(friendly_relative_name('/lib/Button.svelte')).toEqual('Button')
      expect(friendly_relative_name('/lib/a/b/Header.svelte')).toEqual('Header')
    })
  })
}
