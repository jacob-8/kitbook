export function parse_path(path: string) {
  if (path === '/README.md')
    return { ext: 'md', name: 'README', dir: '' }
  if (path === '/src/index.md')
    return { ext: 'md', name: 'index', dir: '' }

  const match = path.match(/^\/src\/(.*\/)(.+?)\.(.+)$/)
  if (!match)
    throw new Error(`${path} is not a module path that Kitbook can handle. Your Kitbook root +layout.js import.meta.glob patterns must start with '/src/**'`)
  const [, dir, name, ext] = match
  return {
    dir,
    name: name.replace('_page', '+page').replace('_layout', '+layout'),
    ext,
  }
}

if (import.meta.vitest) {
  test('parsePath parses path correctly', () => {
    expect(parse_path('/src/docs/0-why-kitbook.md')).toMatchInlineSnapshot(`
      {
        "dir": "docs/",
        "ext": "md",
        "name": "0-why-kitbook",
      }
    `)
    expect(parse_path('/src/index.md')).toMatchInlineSnapshot(`
      {
        "dir": "",
        "ext": "md",
        "name": "index",
      }
    `)
    expect(parse_path('/README.md')).toMatchInlineSnapshot(`
      {
        "dir": "",
        "ext": "md",
        "name": "README",
      }
    `)
    expect(parse_path('/src/routes/a/+page.svelte')).toMatchInlineSnapshot(`
      {
        "dir": "routes/a/",
        "ext": "svelte",
        "name": "+page",
      }
    `)
    expect(parse_path('/src/routes/a/_page.variants.ts')).toMatchInlineSnapshot(`
      {
        "dir": "routes/a/",
        "ext": "variants.ts",
        "name": "+page",
      }
    `)
    // Currently this sort of file will be filtered out downstream
    expect(parse_path('/src/routes/a/Apple.foo.svelte')).toMatchInlineSnapshot(`
      {
        "dir": "routes/a/",
        "ext": "foo.svelte",
        "name": "Apple",
      }
    `)
  })
}

// function prepare_url(path: string): string {
//   const url = path
//     .replace(/^\//, '') // remove initial slash
//     .replace('src/', '')
//     .replace('_page', '+page')
//     .replace('_layout', '+layout')

//   const last_dot_index = url.lastIndexOf('.');
//   if (last_dot_index === -1) return url;
//   return url.substring(0, last_dot_index);
// }
