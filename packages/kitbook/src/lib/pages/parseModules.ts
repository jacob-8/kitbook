import type { Modules, RawModules, UngroupedPage } from "$lib/kitbook-types";
import { parsePath } from "./parsePath";
import { testModules } from "./testModules";
import { removeInitialDigitAndHyphens } from "./utils/removeInitialDigitAndHyphens";

export function parseModulesIntoUngroupedPages(modules: Modules, modulesRaw: RawModules): UngroupedPage[] {
  const allPaths = Object.keys(modules);
  const paths = filterOutUnwantedKitbookPaths(allPaths);
  if (!paths.length) return []

  return paths.map((path) => {
    const { name, ext } = parsePath(path);
    const url = path.replace('src/', '').replace(`.${ext}`, '');

    return {
      path,
      name: removeInitialDigitAndHyphens(name),
      ext,
      url,
      load: {
        loadModule: modules[path],
        loadRaw: modulesRaw[path],
      }
    };
  });
}

if (import.meta.vitest) {
  test('parseModules properly returns array of Pages', () => {
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
          "name": "index",
          "path": "/src/docs/index.md",
          "url": "/docs/index",
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
          "ext": "svx",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "B",
          "path": "/src/lib/B.svx",
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
          "ext": "svx",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "D",
          "path": "/src/lib/a/D.svx",
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
          "ext": "svx",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "E",
          "path": "/src/lib/E.svx",
          "url": "/lib/E",
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
          "ext": "svx",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "_page",
          "path": "/src/routes/a/_page.svx",
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
          "ext": "svx",
          "load": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "_page",
          "path": "/src/routes/c/_page.svx",
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
          "name": "Apple",
          "path": "/src/lib/Apple.foo.svelte",
          "url": "/lib/Apple",
        },
      ]
    `);
  });
}

function filterOutUnwantedKitbookPaths(paths: string[]): string[] {
  return paths.filter(path => {
      return !path.includes(`/src/kitbook`);
    });
}

if (import.meta.vitest) {
  test('removeKitbookPaths', () => {
    expect(filterOutUnwantedKitbookPaths(['/src/kitbook/+page.svelte'])).toMatchInlineSnapshot('[]');
  });
}