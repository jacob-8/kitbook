import type { Folder, GroupedPageMap } from "../kitbook-types";
import { removeInitialDigitAndHyphens } from "./utils/removeInitialDigitAndHyphens";

export function putPagesIntoFolders(groupedPages: GroupedPageMap, { hideKitbookRoutes } = { hideKitbookRoutes: true }): Folder {
  let pagesToOrganize = Object.values(groupedPages)

  // __KitbookRoutes__
  // const routes = 'src/lib/routes';
  const routes = 'src/kitbook';

  if (hideKitbookRoutes) {
    pagesToOrganize = pagesToOrganize.filter(page => filterKitbookPath(page.path, routes))
  }

  const rootFolder: Folder = {
    name: '.',
    url: '/',
    depth: 0,
    folders: [],
    pages: [],
  };

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

function filterKitbookPath(path: string, kitbookRoutes: string): boolean {
  return !path.includes(kitbookRoutes);
}

if (import.meta.vitest) {
  test('filterKitbookPath', () => {
    const defaultKitbookRoutes = 'src/kitbook';
    const standardSvelteKitRoutes = 'src/routes';

    expect(filterKitbookPath('/src/kitbook/+page.svelte', defaultKitbookRoutes)).toMatchInlineSnapshot('false');
    expect(filterKitbookPath('/src/routes/+page.svelte', defaultKitbookRoutes)).toMatchInlineSnapshot('true');

    expect(filterKitbookPath('/src/routes/+page.svelte', standardSvelteKitRoutes)).toMatchInlineSnapshot('false');
  });
}