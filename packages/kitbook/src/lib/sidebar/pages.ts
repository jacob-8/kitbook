export type Folder = {
  name: string;
  url: string;
  depth: number;
  folders?: Folder[];
  pages?: Page[];
};

export type Page = {
  name: string;
  ext: string;
  path: string;
  url: string;
};

export type Modules = Record<string, () => Promise<{ [key: string]: any }>>;

function removeInitialDigitAndHyphens(string: string) {
  return string.replace(/^\d+/, '').replace(/-/g, ' ').trim();
}

export function parsePath(path: string) {
  const [, dir, ext] = path.match(/^\.(.*)*\/\+page\.(.+)$/);
  if (dir) {
    return { dir, name: dir.split('/').pop(), ext };
  } else {
    return { dir, name: 'index', ext };
  }
}

export function parsePages(modules: Modules): Page[] {
  console.log(modules)
  const paths = Object.keys(modules);
  if (!paths.length) return []

  const pagePaths = paths.filter((path) => path.indexOf('+page') > -1);
  const pages = pagePaths.map((path) => {
    const { dir, name, ext } = parsePath(path);
    return {
      path,
      name: removeInitialDigitAndHyphens(name),
      ext,
      url: dir || '/',
    };
  });
  const indexPageIndex = pages.findIndex((page) => page.url === '/');
  const indexPage = pages.splice(indexPageIndex, 1)[0];
  pages.unshift(indexPage);
  // todo sort pages to end if directory undefined
  return pages;
}

export function putPagesIntoFolders(pagesToOrganize: Page[]): Folder {
  const rootFolder: Folder = {
    name: '.',
    url: '/',
    depth: 0,
    folders: [],
    pages: [],
  };
  return rootFolder;

  if (!pagesToOrganize?.length) return rootFolder;
  pagesToOrganize.forEach((page) => {
    const path = page.url.split('/');
    let currentFolder = rootFolder;
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

// export function findActivePage(pages: Page[], urlPathname: string): Page {
//   const activePage = pages.find((page) => {
//     const regex = new RegExp(`${page.url}$`);
//     return regex.test(urlPathname);
//   });
//   if (activePage) return activePage;
//   return pages.find((page) => page.url === '/');
// }
