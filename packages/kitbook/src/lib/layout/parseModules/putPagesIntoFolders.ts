import type { Folder, GroupedPageMap } from "../../kitbook-types";
import { removeInitialDigitAndHyphens } from "./utils/removeInitialDigitAndHyphens";

export function putPagesIntoFolders(groupedPages: GroupedPageMap): Folder {
  let pagesToOrganize = Object.values(groupedPages)

  if (typeof __KitbookRoutes__ !== 'undefined') {
    const isNotKitbookItself = __KitbookRoutes__ !== 'src/lib/routes';
    if (isNotKitbookItself) {
      pagesToOrganize = pagesToOrganize.filter(page => filterKitbookRoutes(page.path, __KitbookRoutes__))
    }
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

function filterKitbookRoutes(path: string, kitbookRoutes: string): boolean {
  return !path.includes(kitbookRoutes);
}

if (import.meta.vitest) {
  test('filterKitbookRoutes', () => {
    const defaultKitbookRoutes = 'src/kitbook';
    const standardSvelteKitRoutes = 'src/routes';

    expect(filterKitbookRoutes('/src/kitbook/+page.svelte', defaultKitbookRoutes)).toMatchInlineSnapshot('false');
    expect(filterKitbookRoutes('/src/routes/+page.svelte', defaultKitbookRoutes)).toMatchInlineSnapshot('true');

    expect(filterKitbookRoutes('/src/routes/+page.svelte', standardSvelteKitRoutes)).toMatchInlineSnapshot('false');
  });
}