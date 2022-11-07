export type Folder = {
  name: string;
  url: string;
  depth: number;
  folders?: Folder[];
  pages?: Page[];
};

// create 1 page, show any stories/docs first, then default component view, then any variants
export type Page = {
  name: string;
  ext: string;
  path: string;
  url: string;
  // type?: 'story' | 'component' | 'page' | 'variants';
  // 1st check for story/docs (md/svx)
  storyModulePath?: string;
  // 2nd check for component or page (svelte)
  componentModulePath?: string;
  pageModulePath?: string;
  // 3rd check for variants (variants.ts)
  variantsModulePath?: string;
};

export type Modules = Record<string, () => Promise<{ [key: string]: any }>>;

function removeInitialDigitAndHyphens(string: string) {
  return string.replace(/^\d+/, '').replace(/-/g, ' ').trim();
}

export function parsePath(path: string) {
  if (path === '/README.md') return { ext: 'md', name: 'README', dir: '/' }

  const match = path.match(/^\/src\/(.*\/)(.+?)\.(.+)$/);
  if (!match) throw new Error(`${path} is not a module path that Kitbook can handle. Make sure your Kitbook Layout Load import meta glob starts with '/src/**'`);
  const [, dir, name, ext] = match;
  return { dir, name, ext };
}

export function parseModules(modules: Modules, root = '/kitbook'): Page[] {
  const paths = Object.keys(modules)
    .filter(p => {
      return !p.includes(`/src/routes${root}`) &&
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

export function combineModulesIntoPages(uncombined: Page[]): Page[] {
  return uncombined;
}
// Will skip file if an unexpected additional . is found in file name, e.g. /src/A/Bar.foo.svelte

export function putPagesIntoFolders(pagesToOrganize: Page[]): Folder {
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


