export function urlFromPath(filepath: string): string | null {
  const normalizedPath = filepath.replace(/\\/g, '/')

  const match = normalizedPath.match(/^(?:.*\/src\/)(?<path>.+?)\/(?<filename>.+)\.[^\/]+$/)
  if (!match?.groups)
    return null

  const { path, filename } = match.groups
  const baseFilename = filename.split('.').shift()
  const url = `/${path}/${baseFilename}`
  return url
}

if (import.meta.vitest) {
  describe(urlFromPath, () => {
    test('handles linux filepaths', () => {
      expect(urlFromPath('/dev/project/src/lib/components/Foo.svelte'))
        .toEqual('/lib/components/Foo')
    })
    test('handles windows filepaths', () => {
      expect(urlFromPath('C:\\dev\\project\\src\\routes\\+layout.svelte'))
        .toEqual('/routes/+layout')
    })
    test('handles named compositions (filenames with multiple dots)', () => {
      expect(urlFromPath('/dev/project/src/lib/components/Foo.some.composition'))
        .toEqual('/lib/components/Foo')
    })
    test('return null if path does not match', () => {
      expect(urlFromPath('/dev/project/some.config.ts'))
        .toBeNull()
    })
  })
}
