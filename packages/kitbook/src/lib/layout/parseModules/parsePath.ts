export function parsePath(path: string) {
  if (path === '/README.md')
    return { ext: 'md', name: 'README', dir: '/' }
  if (path === '/src/index.md')
    return { ext: 'md', name: 'index', dir: '/' }

  const match = path.match(/^\/src\/(.*\/)(.+?)\.(.+)$/)
  if (!match)
    throw new Error(`${path} is not a module path that Kitbook can handle. Make sure the Kitbook Layout Load import.meta.glob starts with '/src/**'`)
  const [, dir, name, ext] = match
  return { dir, name, ext }
}

if (import.meta.vitest) {
  test('parsePath parses path correctly', () => {
    expect(parsePath('/src/docs/0-why-kitbook.md')).toMatchInlineSnapshot(`
      {
        "dir": "docs/",
        "ext": "md",
        "name": "0-why-kitbook",
      }
    `)
    expect(parsePath('/src/index.md')).toMatchInlineSnapshot(`
      {
        "dir": "/",
        "ext": "md",
        "name": "index",
      }
    `)
    expect(parsePath('/README.md')).toMatchInlineSnapshot(`
      {
        "dir": "/",
        "ext": "md",
        "name": "README",
      }
    `)
    expect(parsePath('/src/routes/a/+page.svelte')).toMatchInlineSnapshot(`
      {
        "dir": "routes/a/",
        "ext": "svelte",
        "name": "+page",
      }
    `)
    expect(parsePath('/src/routes/a/_page.variants.ts')).toMatchInlineSnapshot(`
      {
        "dir": "routes/a/",
        "ext": "variants.ts",
        "name": "_page",
      }
    `)
    // Currently this sort of file will be filtered out downstream
    expect(parsePath('/src/routes/a/Apple.foo.svelte')).toMatchInlineSnapshot(`
      {
        "dir": "routes/a/",
        "ext": "foo.svelte",
        "name": "Apple",
      }
    `)
  })

  test.skip('skips and logs warning upon receiving unusable path', () => {
    expect(parsePath('+page.ts')).toThrow()
    // expect(parsePath('+page.ts')).toThrowErrorMatchingInlineSnapshot();
  })
}
