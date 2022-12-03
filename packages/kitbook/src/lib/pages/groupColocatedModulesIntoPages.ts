import type { Modules, PageMap } from "$lib/kitbook-types";
import { combineModulesIntoPages } from "./combineModulesIntoPages";
import { parseModules } from "./parseModules";
import { testModules } from "./testModules";

export function groupColocatedModulesIntoPages(modules: Modules): PageMap {
  const parsedModules = parseModules(modules);
  return combineModulesIntoPages(parsedModules);
}

if (import.meta.vitest) {
  test('groupColocatedModulesIntoPages', () => {
    expect(groupColocatedModulesIntoPages(testModules)).toMatchInlineSnapshot(`
      {
        "/README": {
          "name": "README",
          "svxModulePath": "/README.md",
          "url": "/README",
        },
        "/docs/0-why-kitbook": {
          "name": "why kitbook",
          "svxModulePath": "/src/docs/0-why-kitbook.md",
          "url": "/docs/0-why-kitbook",
        },
        "/docs/1-get-started": {
          "name": "get started",
          "svxModulePath": "/src/docs/1-get-started.md",
          "url": "/docs/1-get-started",
        },
        "/docs/index": {
          "name": "index",
          "svxModulePath": "/src/docs/index.md",
          "url": "/docs/index",
        },
        "/docs/my-notes/0-unocss": {
          "name": "unocss",
          "svxModulePath": "/src/docs/my-notes/0-unocss.md",
          "url": "/docs/my-notes/0-unocss",
        },
        "/docs/my-notes/1-deploy-to-vercel": {
          "name": "deploy to vercel",
          "svxModulePath": "/src/docs/my-notes/1-deploy-to-vercel.md",
          "url": "/docs/my-notes/1-deploy-to-vercel",
        },
        "/lib/A": {
          "componentModulePath": "/src/lib/A.svelte",
          "name": "A",
          "url": "/lib/A",
        },
        "/lib/B": {
          "componentModulePath": "/src/lib/B.svelte",
          "name": "B",
          "svxModulePath": "/src/lib/B.svx",
          "url": "/lib/B",
        },
        "/lib/E": {
          "name": "E",
          "svxModulePath": "/src/lib/E.svx",
          "url": "/lib/E",
        },
        "/lib/a/C": {
          "componentModulePath": "/src/lib/a/C.svelte",
          "name": "C",
          "url": "/lib/a/C",
          "variantsModulePath": "/src/lib/a/C.variants.ts",
        },
        "/lib/a/D": {
          "componentModulePath": "/src/lib/a/D.svelte",
          "name": "D",
          "svxModulePath": "/src/lib/a/D.svx",
          "url": "/lib/a/D",
          "variantsModulePath": "/src/lib/a/D.variants.ts",
        },
        "/routes/+page": {
          "name": "+page",
          "pageModulePath": "/src/routes/+page.svelte",
          "url": "/routes/+page",
        },
        "/routes/a/+page": {
          "name": "+page",
          "pageModulePath": "/src/routes/a/+page.svelte",
          "svxModulePath": "/src/routes/a/_page.svx",
          "url": "/routes/a/+page",
        },
        "/routes/b/+page": {
          "name": "+page",
          "pageModulePath": "/src/routes/b/+page.svelte",
          "url": "/routes/b/+page",
          "variantsModulePath": "/src/routes/b/_page.variants.ts",
        },
        "/routes/c/+page": {
          "name": "+page",
          "pageModulePath": "/src/routes/c/+page.svelte",
          "svxModulePath": "/src/routes/c/_page.svx",
          "url": "/routes/c/+page",
          "variantsModulePath": "/src/routes/c/_page.variants.ts",
        },
      }
    `);
  });
}