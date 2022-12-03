import type { Page, Modules } from "$lib/kitbook-types";
import { parsePath } from "./parsePath";
import { testModules } from "./testModules";
import { removeInitialDigitAndHyphens } from "./utils/removeInitialDigitAndHyphens";

export function parseModules(modules: Modules): Page[] {
  const paths = Object.keys(modules)
    .filter(p => {
      return !p.includes(`/src/kitbook`) &&
        !p.includes('+layout.svelte')
    });

  if (!paths.length) return []

  const pages = paths.map((path) => {
    const { name, ext } = parsePath(path);
    const url = path.replace('src/', '').replace(`.${ext}`, '');
    return {
      path,
      name: removeInitialDigitAndHyphens(name),
      ext,
      url,
    };
  });
  return pages;
}

if (import.meta.vitest) {
  test('parseModules properly returns array of Pages', () => {
    expect(parseModules(testModules)).toMatchInlineSnapshot(`
      [
        {
          "ext": "md",
          "name": "README",
          "path": "/README.md",
          "url": "/README",
        },
        {
          "ext": "md",
          "name": "why kitbook",
          "path": "/src/docs/0-why-kitbook.md",
          "url": "/docs/0-why-kitbook",
        },
        {
          "ext": "md",
          "name": "get started",
          "path": "/src/docs/1-get-started.md",
          "url": "/docs/1-get-started",
        },
        {
          "ext": "md",
          "name": "index",
          "path": "/src/docs/index.md",
          "url": "/docs/index",
        },
        {
          "ext": "md",
          "name": "unocss",
          "path": "/src/docs/my-notes/0-unocss.md",
          "url": "/docs/my-notes/0-unocss",
        },
        {
          "ext": "md",
          "name": "deploy to vercel",
          "path": "/src/docs/my-notes/1-deploy-to-vercel.md",
          "url": "/docs/my-notes/1-deploy-to-vercel",
        },
        {
          "ext": "svelte",
          "name": "A",
          "path": "/src/lib/A.svelte",
          "url": "/lib/A",
        },
        {
          "ext": "svelte",
          "name": "B",
          "path": "/src/lib/B.svelte",
          "url": "/lib/B",
        },
        {
          "ext": "svx",
          "name": "B",
          "path": "/src/lib/B.svx",
          "url": "/lib/B",
        },
        {
          "ext": "svelte",
          "name": "C",
          "path": "/src/lib/a/C.svelte",
          "url": "/lib/a/C",
        },
        {
          "ext": "variants.ts",
          "name": "C",
          "path": "/src/lib/a/C.variants.ts",
          "url": "/lib/a/C",
        },
        {
          "ext": "svelte",
          "name": "D",
          "path": "/src/lib/a/D.svelte",
          "url": "/lib/a/D",
        },
        {
          "ext": "svx",
          "name": "D",
          "path": "/src/lib/a/D.svx",
          "url": "/lib/a/D",
        },
        {
          "ext": "variants.ts",
          "name": "D",
          "path": "/src/lib/a/D.variants.ts",
          "url": "/lib/a/D",
        },
        {
          "ext": "svx",
          "name": "E",
          "path": "/src/lib/E.svx",
          "url": "/lib/E",
        },
        {
          "ext": "svelte",
          "name": "+page",
          "path": "/src/routes/+page.svelte",
          "url": "/routes/+page",
        },
        {
          "ext": "svelte",
          "name": "+page",
          "path": "/src/routes/a/+page.svelte",
          "url": "/routes/a/+page",
        },
        {
          "ext": "svx",
          "name": "_page",
          "path": "/src/routes/a/_page.svx",
          "url": "/routes/a/_page",
        },
        {
          "ext": "svelte",
          "name": "+page",
          "path": "/src/routes/b/+page.svelte",
          "url": "/routes/b/+page",
        },
        {
          "ext": "variants.ts",
          "name": "_page",
          "path": "/src/routes/b/_page.variants.ts",
          "url": "/routes/b/_page",
        },
        {
          "ext": "svelte",
          "name": "+page",
          "path": "/src/routes/c/+page.svelte",
          "url": "/routes/c/+page",
        },
        {
          "ext": "svx",
          "name": "_page",
          "path": "/src/routes/c/_page.svx",
          "url": "/routes/c/_page",
        },
        {
          "ext": "variants.ts",
          "name": "_page",
          "path": "/src/routes/c/_page.variants.ts",
          "url": "/routes/c/_page",
        },
        {
          "ext": "foo.svelte",
          "name": "A",
          "path": "/src/lib/A.foo.svelte",
          "url": "/lib/A",
        },
      ]
    `);
  });
}