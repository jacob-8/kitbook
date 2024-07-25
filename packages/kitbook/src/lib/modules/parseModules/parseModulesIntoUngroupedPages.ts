import type { Modules, RawModules, UngroupedPage } from '../../kitbook-types'
import { parsePath } from './parsePath'
import { testModules } from './testModules'
import { removeInitialDigitAndHyphens } from './utils/removeInitialDigitAndHyphens'

export function parseModulesIntoUngroupedPages(modules: Modules, rawModules: RawModules): UngroupedPage<any>[] {
  const paths = Object.keys(modules)
  if (!paths.length)
    return []

  return paths.map((path) => {
    const { name, ext } = parsePath(path)
    const url = path.replace('src/', '').replace(`.${ext}`, '')

    return {
      path,
      name: removeInitialDigitAndHyphens(name),
      ext,
      url,
      load: {
        loadModule: modules[path],
        loadRaw: rawModules[path],
      },
    }
  })
}

if (import.meta.vitest) {
  test('parseModulesIntoUngroupedPages properly returns array of Pages', () => {
    expect(parseModulesIntoUngroupedPages(testModules, testModules)).toMatchInlineSnapshot(`
      [
        {
          "ext": "md",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "README",
          "path": "/README.md",
          "url": "/README",
        },
        {
          "ext": "md",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "index",
          "path": "/src/index.md",
          "url": "/index",
        },
        {
          "ext": "md",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "why kitbook",
          "path": "/src/docs/0-why-kitbook.md",
          "url": "/docs/0-why-kitbook",
        },
        {
          "ext": "md",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "get started",
          "path": "/src/docs/1-get-started.md",
          "url": "/docs/1-get-started",
        },
        {
          "ext": "md",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "you can use letters to adjust ordering",
          "path": "/src/docs/1a-you-can-use-letters-to-adjust-ordering.md",
          "url": "/docs/1a-you-can-use-letters-to-adjust-ordering",
        },
        {
          "ext": "md",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "unocss",
          "path": "/src/docs/my-notes/0-unocss.md",
          "url": "/docs/my-notes/0-unocss",
        },
        {
          "ext": "md",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "deploy to vercel",
          "path": "/src/docs/my-notes/1-deploy-to-vercel.md",
          "url": "/docs/my-notes/1-deploy-to-vercel",
        },
        {
          "ext": "svelte",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "A",
          "path": "/src/lib/A.svelte",
          "url": "/lib/A",
        },
        {
          "ext": "svelte",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "B",
          "path": "/src/lib/B.svelte",
          "url": "/lib/B",
        },
        {
          "ext": "md",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "B",
          "path": "/src/lib/B.md",
          "url": "/lib/B",
        },
        {
          "ext": "svelte",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "C",
          "path": "/src/lib/a/C.svelte",
          "url": "/lib/a/C",
        },
        {
          "ext": "variants.ts",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "C",
          "path": "/src/lib/a/C.variants.ts",
          "url": "/lib/a/C",
        },
        {
          "ext": "svelte",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "D",
          "path": "/src/lib/a/D.svelte",
          "url": "/lib/a/D",
        },
        {
          "ext": "md",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "D",
          "path": "/src/lib/a/D.md",
          "url": "/lib/a/D",
        },
        {
          "ext": "variants.ts",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "D",
          "path": "/src/lib/a/D.variants.ts",
          "url": "/lib/a/D",
        },
        {
          "ext": "composition",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "D",
          "path": "/src/lib/a/D.composition",
          "url": "/lib/a/D",
        },
        {
          "ext": "first.composition",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "D",
          "path": "/src/lib/a/D.first.composition",
          "url": "/lib/a/D",
        },
        {
          "ext": "second.composition",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "D",
          "path": "/src/lib/a/D.second.composition",
          "url": "/lib/a/D",
        },
        {
          "ext": "md",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "E",
          "path": "/src/lib/E.md",
          "url": "/lib/E",
        },
        {
          "ext": "composition",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "F",
          "path": "/src/lib/a/F.composition",
          "url": "/lib/a/F",
        },
        {
          "ext": "svelte",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "+page",
          "path": "/src/routes/+page.svelte",
          "url": "/routes/+page",
        },
        {
          "ext": "svelte",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "+page",
          "path": "/src/routes/a/+page.svelte",
          "url": "/routes/a/+page",
        },
        {
          "ext": "md",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "_page",
          "path": "/src/routes/a/_page.md",
          "url": "/routes/a/_page",
        },
        {
          "ext": "svelte",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "+page",
          "path": "/src/routes/b/+page.svelte",
          "url": "/routes/b/+page",
        },
        {
          "ext": "variants.ts",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "_page",
          "path": "/src/routes/b/_page.variants.ts",
          "url": "/routes/b/_page",
        },
        {
          "ext": "md",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "_page",
          "path": "/src/routes/c/_page.md",
          "url": "/routes/c/_page",
        },
        {
          "ext": "variants.ts",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "_page",
          "path": "/src/routes/c/_page.variants.ts",
          "url": "/routes/c/_page",
        },
        {
          "ext": "svelte",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "+page",
          "path": "/src/routes/c/+page.svelte",
          "url": "/routes/c/+page",
        },
        {
          "ext": "svelte",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "+layout",
          "path": "/src/routes/+layout.svelte",
          "url": "/routes/+layout",
        },
        {
          "ext": "svelte",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "+layout",
          "path": "/src/routes/a/+layout.svelte",
          "url": "/routes/a/+layout",
        },
        {
          "ext": "md",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "_layout",
          "path": "/src/routes/a/_layout.md",
          "url": "/routes/a/_layout",
        },
        {
          "ext": "svelte",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "+layout",
          "path": "/src/routes/b/+layout.svelte",
          "url": "/routes/b/+layout",
        },
        {
          "ext": "variants.ts",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "_layout",
          "path": "/src/routes/b/_layout.variants.ts",
          "url": "/routes/b/_layout",
        },
        {
          "ext": "svelte",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "+layout",
          "path": "/src/routes/c/+layout.svelte",
          "url": "/routes/c/+layout",
        },
        {
          "ext": "md",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "_layout",
          "path": "/src/routes/c/_layout.md",
          "url": "/routes/c/_layout",
        },
        {
          "ext": "variants.ts",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "_layout",
          "path": "/src/routes/c/_layout.variants.ts",
          "url": "/routes/c/_layout",
        },
        {
          "ext": "foo.svelte",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "A",
          "path": "/src/lib/A.foo.svelte",
          "url": "/lib/A",
        },
        {
          "ext": "foo.svelte",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "Baz",
          "path": "/src/lib/Baz.foo.svelte",
          "url": "/lib/Baz",
        },
        {
          "ext": "ts",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "Typescript",
          "path": "/src/lib/Typescript.ts",
          "url": "/lib/Typescript",
        },
        {
          "ext": "vue",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "Vue",
          "path": "/src/lib/Vue.vue",
          "url": "/lib/Vue",
        },
      ]
    `)
  })
}
