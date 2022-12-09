import type { GroupedPageMap, UngroupedPage } from "$lib/kitbook-types";
import { testModules } from "./testModules";
import { parseModulesIntoUngroupedPages } from "./parseModulesIntoUngroupedPages";

const ALLOWED_EXTENSIONS = ['md', 'svx', 'svelte', 'variants.ts'];

/** Group _page/_layout Kitbook modules with +page/+layout modules */
function convertUnderscorePrefixToPlus(s: string): string {
  return s.replace('_page', '+page').replace('_layout', '+layout')
}

export function groupColocatedPages(ungrouped: UngroupedPage[]): GroupedPageMap {
  const grouped: GroupedPageMap = {};

  for (const page of sortPageAndLayoutPagesWithPlusFirst(ungrouped)) {
    const url = convertUnderscorePrefixToPlus(page.url);

    if (!ALLOWED_EXTENSIONS.includes(page.ext)) continue;

    if (!grouped[url]) {
      grouped[url] = { name: page.name, url, path: page.path, extensions: [page.ext] }
    } else {
      grouped[url].extensions.push(page.ext)
    }

    if (['md', 'svx'].includes(page.ext)) {
      grouped[url].loadSvx = loadModuleObject(page);
    } else if (isPageOrLayout(page.name)) {
      grouped[url].loadPage = loadModuleObject(page);
    } else if (page.ext === 'svelte') {
      grouped[url].loadComponent = loadModuleObject(page);
    } else if (page.ext === 'variants.ts') {
      grouped[url].loadVariants = loadModuleObject(page);
    }
  }

  return grouped;
}

if (import.meta.vitest) {
  test('groupColocatedPages properly groups Uncombined Pages', () => {
    const pages = parseModulesIntoUngroupedPages(testModules, testModules);
    expect(groupColocatedPages(pages)).toMatchInlineSnapshot(`
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

function loadModuleObject(page: UngroupedPage) {
  return {
    loadModule: page.load.loadModule,
    loadRaw: page.load.loadRaw
  };
}

// layouts are just pages, but with slot inheritance super-powers
function isPageOrLayout(name: string): boolean {
  if (name.startsWith('+page')) return true;
  if (name.startsWith('+layout')) return true;
  return false;
}

if (import.meta.vitest) {
  test('isPageOrLayout', () => {
    expect(isPageOrLayout('+page')).toMatchInlineSnapshot('true');
    expect(isPageOrLayout('+page@(app)')).toMatchInlineSnapshot('true');
    expect(isPageOrLayout('_page')).toMatchInlineSnapshot('false');
    expect(isPageOrLayout('+layout')).toMatchInlineSnapshot('true');
    expect(isPageOrLayout('+layout@')).toMatchInlineSnapshot('true');
    expect(isPageOrLayout('blue')).toMatchInlineSnapshot('false');
  });
}

function sortPageAndLayoutPagesWithPlusFirst(pages: UngroupedPage[]): UngroupedPage[] {
  return pages.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    const namesToSort = ['+page', '_page', '+layout', '_layout']
    if (!(namesToSort.includes(nameA) && namesToSort.includes(nameB))) return 0;
    return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
  });
}

if (import.meta.vitest) {
  test('sortPageAndLayoutPagesWithPlusFirst moves + ahead of _ without affecting other components', () => {
    const pages = ["MyComponent", "_page", "+page", "_layout", "+layout", "AnotherRegularComponent"].map(p => {
      return {
        name: p,
        ext: null,
        load: null,
        path: null,
        url: null,
      }
    })
    expect(sortPageAndLayoutPagesWithPlusFirst(pages)).toMatchInlineSnapshot(`
      [
        {
          "ext": null,
          "load": null,
          "name": "MyComponent",
          "path": null,
          "url": null,
        },
        {
          "ext": null,
          "load": null,
          "name": "+layout",
          "path": null,
          "url": null,
        },
        {
          "ext": null,
          "load": null,
          "name": "+page",
          "path": null,
          "url": null,
        },
        {
          "ext": null,
          "load": null,
          "name": "_layout",
          "path": null,
          "url": null,
        },
        {
          "ext": null,
          "load": null,
          "name": "_page",
          "path": null,
          "url": null,
        },
        {
          "ext": null,
          "load": null,
          "name": "AnotherRegularComponent",
          "path": null,
          "url": null,
        },
      ]
    `);
  });
}