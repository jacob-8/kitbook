export function resolve_relative_imports({ relative_path, parent_path }: { relative_path: string, parent_path: string }): string {
  const parent_path_parts = parent_path.split('/')
  const relative_path_parts = relative_path.split('/')

  const resolved_path_parts = parent_path_parts.slice(0, parent_path_parts.length - 1)
  for (const part of relative_path_parts) {
    if (part === '..')
      resolved_path_parts.pop()
    else if (part !== '.')
      resolved_path_parts.push(part)
  }

  return resolved_path_parts.join('/')
}

if (import.meta.vitest) {
  describe(resolve_relative_imports, () => {
    const parent_path = '/src/lib/modules/parse/parse_modules.ts'

    test('same folder', () => {
      const relative_path = './Button.svelte'
      expect(resolve_relative_imports({ relative_path, parent_path })).toEqual('/src/lib/modules/parse/Button.svelte')
    })

    test('sibling folder', () => {
      const relative_path = '../sibling/Button.svelte'
      expect(resolve_relative_imports({ relative_path, parent_path })).toEqual('/src/lib/modules/sibling/Button.svelte')
    })
  })
}
