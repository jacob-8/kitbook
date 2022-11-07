export type Folder = {
  name: string;
  url: string;
  depth: number;
  folders?: Folder[];
  pages?: Page[];
};

export type Page = {
  name: string;
  url: string;
  ext?: string;
  path?: string;
  // organize sibling modules into 1 page, show stories/docs first, then default component view, then variants
  storyModulePath?: string;
  componentModulePath?: string;
  pageModulePath?: string;
  variantsModulePath?: string;
};

export type Modules = Record<string, () => Promise<{ [key: string]: any }>>;

function removeInitialDigitAndHyphens(string: string) {
  return string.replace(/^\d+/, '').replace(/-/g, ' ').trim();
}

export function parsePath(path: string) {
  if (path === '/README.md') return { ext: 'md', name: 'README', dir: '/' }

  const match = path.match(/^\/src\/(.*\/)[+_]?(.+?)\.(.+)$/);
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
  const combined: Record<string, Page> = {};

  for (const page of uncombined) {
    const url = page.url.replace(/[+_]?page/, 'page'); // strip page prefixes for merging
    if (!combined[url])
      combined[url] = { name: page.name, url: page.url }

    // Will skip files not matching expected extensions, e.g. /src/A/Bar.foo.svelte
    if (['md', 'svx'].includes(page.ext)) {
      combined[url].storyModulePath = page.path
    } else if (page.name === '+page') {
      combined[url].pageModulePath = page.path
    } else if (page.ext === 'svelte') {
      combined[url].componentModulePath = page.path
    } else if (page.ext === 'variants.ts') {
      combined[url].variantsModulePath = page.path
    }
  }

  return Object.values(combined);
}

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


