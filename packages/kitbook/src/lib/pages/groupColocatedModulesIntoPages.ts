import type { Modules, RawModules, GroupedPageMap } from "../kitbook-types";
import { groupColocatedPages } from "./groupColocatedPages";
import { parseModulesIntoUngroupedPages } from "./parseModulesIntoUngroupedPages";
import { testModules } from "./testModules";

export function groupColocatedModulesIntoPages(modules: Modules, modulesRaw: RawModules): GroupedPageMap {
  const ungroupedPages = parseModulesIntoUngroupedPages(modules, modulesRaw);
  return groupColocatedPages(ungroupedPages);
}

if (import.meta.vitest) {
  // this test is redundant with the one in groupColocatedPages.ts but it's here to make sure that the two functions work together (would be good to figure out how to remove it)
  test('groupColocatedModulesIntoPages', () => {
    expect(groupColocatedModulesIntoPages(testModules, testModules)).toMatchInlineSnapshot(`
      {
        "/README": {
          "extensions": [
            "md",
          ],
          "loadSvx": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "README",
          "path": "/README.md",
          "url": "/README",
        },
        "/docs/0-why-kitbook": {
          "extensions": [
            "md",
          ],
          "loadSvx": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "why kitbook",
          "path": "/src/docs/0-why-kitbook.md",
          "url": "/docs/0-why-kitbook",
        },
        "/docs/1-get-started": {
          "extensions": [
            "md",
          ],
          "loadSvx": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "get started",
          "path": "/src/docs/1-get-started.md",
          "url": "/docs/1-get-started",
        },
        "/docs/index": {
          "extensions": [
            "md",
          ],
          "loadSvx": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "index",
          "path": "/src/docs/index.md",
          "url": "/docs/index",
        },
        "/docs/my-notes/0-unocss": {
          "extensions": [
            "md",
          ],
          "loadSvx": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "unocss",
          "path": "/src/docs/my-notes/0-unocss.md",
          "url": "/docs/my-notes/0-unocss",
        },
        "/docs/my-notes/1-deploy-to-vercel": {
          "extensions": [
            "md",
          ],
          "loadSvx": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "deploy to vercel",
          "path": "/src/docs/my-notes/1-deploy-to-vercel.md",
          "url": "/docs/my-notes/1-deploy-to-vercel",
        },
        "/lib/A": {
          "extensions": [
            "svelte",
          ],
          "loadComponent": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "A",
          "path": "/src/lib/A.svelte",
          "url": "/lib/A",
        },
        "/lib/B": {
          "extensions": [
            "svelte",
            "svx",
          ],
          "loadComponent": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "loadSvx": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "B",
          "path": "/src/lib/B.svelte",
          "url": "/lib/B",
        },
        "/lib/E": {
          "extensions": [
            "svx",
          ],
          "loadSvx": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "E",
          "path": "/src/lib/E.svx",
          "url": "/lib/E",
        },
        "/lib/a/C": {
          "extensions": [
            "svelte",
            "variants.ts",
          ],
          "loadComponent": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "loadVariants": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "C",
          "path": "/src/lib/a/C.svelte",
          "url": "/lib/a/C",
        },
        "/lib/a/D": {
          "extensions": [
            "svelte",
            "svx",
            "variants.ts",
          ],
          "loadComponent": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "loadSvx": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "loadVariants": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "D",
          "path": "/src/lib/a/D.svelte",
          "url": "/lib/a/D",
        },
        "/routes/+layout": {
          "extensions": [
            "svelte",
          ],
          "loadPage": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "+layout",
          "path": "/src/routes/+layout.svelte",
          "url": "/routes/+layout",
        },
        "/routes/+page": {
          "extensions": [
            "svelte",
          ],
          "loadPage": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "+page",
          "path": "/src/routes/+page.svelte",
          "url": "/routes/+page",
        },
        "/routes/a/+layout": {
          "extensions": [
            "svelte",
            "svx",
          ],
          "loadPage": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "loadSvx": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "+layout",
          "path": "/src/routes/a/+layout.svelte",
          "url": "/routes/a/+layout",
        },
        "/routes/a/+page": {
          "extensions": [
            "svelte",
            "svx",
          ],
          "loadPage": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "loadSvx": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "+page",
          "path": "/src/routes/a/+page.svelte",
          "url": "/routes/a/+page",
        },
        "/routes/b/+layout": {
          "extensions": [
            "svelte",
            "variants.ts",
          ],
          "loadPage": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "loadVariants": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "+layout",
          "path": "/src/routes/b/+layout.svelte",
          "url": "/routes/b/+layout",
        },
        "/routes/b/+page": {
          "extensions": [
            "svelte",
            "variants.ts",
          ],
          "loadPage": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "loadVariants": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "+page",
          "path": "/src/routes/b/+page.svelte",
          "url": "/routes/b/+page",
        },
        "/routes/c/+layout": {
          "extensions": [
            "svelte",
            "svx",
            "variants.ts",
          ],
          "loadPage": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "loadSvx": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "loadVariants": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "+layout",
          "path": "/src/routes/c/+layout.svelte",
          "url": "/routes/c/+layout",
        },
        "/routes/c/+page": {
          "extensions": [
            "svelte",
            "svx",
            "variants.ts",
          ],
          "loadPage": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "loadSvx": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "loadVariants": {
            "loadModule": [Function],
            "loadRaw": [Function],
          },
          "name": "+page",
          "path": "/src/routes/c/+page.svelte",
          "url": "/routes/c/+page",
        },
      }
    `);
  });
}