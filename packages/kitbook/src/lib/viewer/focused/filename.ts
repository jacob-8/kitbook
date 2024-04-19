export function isFromNodeModules(component: ComponentWithChildren): boolean {
  const elements = Array.from(component.childElements)
  return elements.some((element) => {
    const filename = element?.__svelte_meta?.loc.file
    return filename.includes('node_modules')
  })
}

export function getLocalFilename(component: ComponentWithChildren): string | undefined {
  const elements = Array.from(component.childElements)
  const elementNotInNodeModules = elements.find((element) => {
    const filename = element?.__svelte_meta?.loc.file
    return !filename.includes('node_modules')
  })
  return elementNotInNodeModules?.__svelte_meta?.loc?.file
}

if (import.meta.vitest) {
  describe(isFromNodeModules, () => {
    test('return true if node_modules', () => {
      const component: ComponentWithChildren = {
        childElements: new Set([
          { __svelte_meta: { loc: { file: 'somewhere/node_modules/foo' } } },
          { __svelte_meta: { loc: { file: 'src/lib/Foo.svelte' } } },
        ]),
      } as ComponentWithChildren

      expect(isFromNodeModules(component)).toBeTruthy()
    })
    test('returns false if none', () => {
      const component: ComponentWithChildren = {
        childElements: new Set([
          { __svelte_meta: { loc: { file: 'src/lib/Foo.svelte' } } },
        ]),
      } as ComponentWithChildren

      expect(isFromNodeModules(component)).toBeFalsy()
    })
  })

  describe(getLocalFilename, () => {
    test('returns filename even if mixed between local and node_modules', () => {
      const component: ComponentWithChildren = {
        childElements: new Set([
          { __svelte_meta: { loc: { file: 'somewhere/node_modules/foo' } } },
          { __svelte_meta: { loc: { file: 'src/lib/Foo.svelte' } } },
          { __svelte_meta: { loc: {} } },
          { __svelte_meta: {} },
          { },
        ]),
      } as ComponentWithChildren

      expect(getLocalFilename(component)).toBe('src/lib/Foo.svelte')
    })

    test('returns false if only node_modules', () => {
      const component: ComponentWithChildren = {
        childElements: new Set([
          { __svelte_meta: { loc: { file: 'somewhere/node_modules/foo' } } },
        ]),
      } as ComponentWithChildren

      expect(getLocalFilename(component)).toBeFalsy()
    })

    test('returns false if no elements', () => {
      const component: ComponentWithChildren = {
        childElements: new Set(),
      } as ComponentWithChildren

      expect(getLocalFilename(component)).toBeFalsy()
    })
  })
}
