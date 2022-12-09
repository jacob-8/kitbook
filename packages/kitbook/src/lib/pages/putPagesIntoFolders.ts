import type { Folder, GroupedPageMap } from "../kitbook-types";
import { groupColocatedPages } from "./groupColocatedPages";
import { parseModulesIntoUngroupedPages } from "./parseModulesIntoUngroupedPages";
import { testModules } from "./testModules";
import { removeInitialDigitAndHyphens } from "./utils/removeInitialDigitAndHyphens";

export function putPagesIntoFolders(groupedPages: GroupedPageMap): Folder {
  const rootFolder: Folder = {
    name: '.',
    url: '/',
    depth: 0,
    folders: [],
    pages: [],
  };

  const pagesToOrganize = Object.values(groupedPages)
  if (!pagesToOrganize?.length) return rootFolder;

  pagesToOrganize.forEach((page) => {
    let currentFolder = rootFolder;

    const path = page.url.split('/');
    path.forEach((folderName, index) => {
      const cleanedFolderName = removeInitialDigitAndHyphens(folderName);

      if (index === path.length - 1) {
        currentFolder.pages.push(page); // is a page
      } else if (folderName === '') {
        currentFolder = rootFolder;
      } else {
        let folder = currentFolder.folders.find((folder) => folder.name === cleanedFolderName);
        if (!folder) {
          folder = {
            name: cleanedFolderName,
            url: path
              .slice(0, index + 1)
              .join('/')
              .replace(/^\./, ''),
            depth: index,
            folders: [],
            pages: [],
          };
          currentFolder.folders.push(folder);
        }
        currentFolder = folder;
      }
    });
  });
  return rootFolder;
}

if (import.meta.vitest) {
  test('putPagesIntoFolders organizes Pages into proper folders', () => {
    const pages = parseModulesIntoUngroupedPages(testModules, testModules);
    expect(putPagesIntoFolders(groupColocatedPages(pages))).toMatchInlineSnapshot(`
      {
        "depth": 0,
        "folders": [
          {
            "depth": 1,
            "folders": [
              {
                "depth": 2,
                "folders": [],
                "name": "my notes",
                "pages": [
                  {
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
                  {
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
                ],
                "url": "/docs/my-notes",
              },
            ],
            "name": "docs",
            "pages": [
              {
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
              {
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
              {
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
            ],
            "url": "/docs",
          },
          {
            "depth": 1,
            "folders": [
              {
                "depth": 2,
                "folders": [],
                "name": "a",
                "pages": [
                  {
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
                  {
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
                ],
                "url": "/lib/a",
              },
            ],
            "name": "lib",
            "pages": [
              {
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
              {
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
              {
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
            ],
            "url": "/lib",
          },
          {
            "depth": 1,
            "folders": [
              {
                "depth": 2,
                "folders": [],
                "name": "a",
                "pages": [
                  {
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
                  {
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
                ],
                "url": "/routes/a",
              },
              {
                "depth": 2,
                "folders": [],
                "name": "b",
                "pages": [
                  {
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
                  {
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
                ],
                "url": "/routes/b",
              },
              {
                "depth": 2,
                "folders": [],
                "name": "c",
                "pages": [
                  {
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
                  {
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
                ],
                "url": "/routes/c",
              },
            ],
            "name": "routes",
            "pages": [
              {
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
              {
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
            ],
            "url": "/routes",
          },
        ],
        "name": ".",
        "pages": [
          {
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
        ],
        "url": "/",
      }
    `);
  });
}