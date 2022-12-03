import type { Folder, PageMap } from "kitbook";
import { combineModulesIntoPages } from "./combineModulesIntoPages";
import { parseModules } from "./parseModules";
import { testModules } from "./testModules";
import { removeInitialDigitAndHyphens } from "./utils/removeInitialDigitAndHyphens";

export function putPagesIntoFolders(combinedPages: PageMap): Folder {
  const rootFolder: Folder = {
    name: '.',
    url: '/',
    depth: 0,
    folders: [],
    pages: [],
  };

  const pagesToOrganize = Object.values(combinedPages)
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
    const pages = parseModules(testModules);
    expect(putPagesIntoFolders(combineModulesIntoPages(pages))).toMatchInlineSnapshot(`
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
                    "name": "unocss",
                    "svxModulePath": "/src/docs/my-notes/0-unocss.md",
                    "url": "/docs/my-notes/0-unocss",
                  },
                  {
                    "name": "deploy to vercel",
                    "svxModulePath": "/src/docs/my-notes/1-deploy-to-vercel.md",
                    "url": "/docs/my-notes/1-deploy-to-vercel",
                  },
                ],
                "url": "/docs/my-notes",
              },
            ],
            "name": "docs",
            "pages": [
              {
                "name": "why kitbook",
                "svxModulePath": "/src/docs/0-why-kitbook.md",
                "url": "/docs/0-why-kitbook",
              },
              {
                "name": "get started",
                "svxModulePath": "/src/docs/1-get-started.md",
                "url": "/docs/1-get-started",
              },
              {
                "name": "index",
                "svxModulePath": "/src/docs/index.md",
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
                    "componentModulePath": "/src/lib/a/C.svelte",
                    "name": "C",
                    "url": "/lib/a/C",
                    "variantsModulePath": "/src/lib/a/C.variants.ts",
                  },
                  {
                    "componentModulePath": "/src/lib/a/D.svelte",
                    "name": "D",
                    "svxModulePath": "/src/lib/a/D.svx",
                    "url": "/lib/a/D",
                    "variantsModulePath": "/src/lib/a/D.variants.ts",
                  },
                ],
                "url": "/lib/a",
              },
            ],
            "name": "lib",
            "pages": [
              {
                "componentModulePath": "/src/lib/A.svelte",
                "name": "A",
                "url": "/lib/A",
              },
              {
                "componentModulePath": "/src/lib/B.svelte",
                "name": "B",
                "svxModulePath": "/src/lib/B.svx",
                "url": "/lib/B",
              },
              {
                "name": "E",
                "svxModulePath": "/src/lib/E.svx",
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
                    "name": "+page",
                    "pageModulePath": "/src/routes/a/+page.svelte",
                    "svxModulePath": "/src/routes/a/_page.svx",
                    "url": "/routes/a/+page",
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
                    "name": "+page",
                    "pageModulePath": "/src/routes/b/+page.svelte",
                    "url": "/routes/b/+page",
                    "variantsModulePath": "/src/routes/b/_page.variants.ts",
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
                    "name": "+page",
                    "pageModulePath": "/src/routes/c/+page.svelte",
                    "svxModulePath": "/src/routes/c/_page.svx",
                    "url": "/routes/c/+page",
                    "variantsModulePath": "/src/routes/c/_page.variants.ts",
                  },
                ],
                "url": "/routes/c",
              },
            ],
            "name": "routes",
            "pages": [
              {
                "name": "+page",
                "pageModulePath": "/src/routes/+page.svelte",
                "url": "/routes/+page",
              },
            ],
            "url": "/routes",
          },
        ],
        "name": ".",
        "pages": [
          {
            "name": "README",
            "svxModulePath": "/README.md",
            "url": "/README",
          },
        ],
        "url": "/",
      }
    `);
  });
}