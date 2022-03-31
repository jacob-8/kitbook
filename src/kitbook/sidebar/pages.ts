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

function removeInitialDigitAndHyphens(string: string) {
  return string.replace(/^\d+/, '').replace(/-/g, ' ').trim();
}

type Modules = Record<string, () => Promise<{ [key: string]: any }>>;

function parsePages(modules: Modules): Page[] {
  const paths = Object.keys(modules);
  let pages = paths.map((path) => {
    const match = path.match(/^\.\/(.*\/)*(.+)\.(.+)$/);
    const [, dir, name, ext] = match;
    return {
      path,
      name: removeInitialDigitAndHyphens(name),
      ext,
      url: `/${dir || ''}${name === 'index' ? '' : name}`,
    };
  });
  const indexPageIndex = pages.findIndex((page) => page.url === '/');
  const indexPage = pages.splice(indexPageIndex, 1)[0];
  pages.unshift(indexPage);
  pages = pages.filter((page) => page.name !== '__layout');
  // todo sort pages to end if directory undefined
  return pages;
}

function putPagesIntoFolders(pagesToOrganize: Page[]): Folder {
  const rootFolder: Folder = {
    name: '.',
    url: '/',
    depth: 0,
    folders: [],
    pages: [],
  };
  pagesToOrganize.forEach((page) => {
    const path = page.path.split('/');
    let currentFolder = rootFolder;
    path.forEach((folderName, index) => {
      const cleanedFolderName = removeInitialDigitAndHyphens(folderName);
      if (index === path.length - 1) {
        currentFolder.pages.push(page); // is a page
      } else if (folderName === '.') {
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

export function parseModulesIntoFolders(modules: Modules): Folder {
  return putPagesIntoFolders(parsePages(modules));
}

if (import.meta.vitest) {
  const modules = {
    './9-privacy-policy.md': () => Promise.resolve({}),
    './index.md': () => Promise.resolve({}),
    './0-get-started.md': () => Promise.resolve({}),
    './0-components/0-Button.svelte': () => Promise.resolve({}),
    './0-components/1-Switch.svelte': () => Promise.resolve({}),
    './0-components/0-ui/0-Button.svelte': () => Promise.resolve({}),
    './0-components/play-audio-section.svelte': () => Promise.resolve({}), // test this to remove section hyphen
    './[reference]/__layout.svelte': () => Promise.resolve({}),
    './a/b/c-d/e.svelte': () => Promise.resolve({}),
    './a/b/c-d/f.svelte': () => Promise.resolve({}),
  };

  test('putPagesIntoFolders organizes pages into proper folders based on dir', () => {
    const pages = parsePages(modules);
    expect(putPagesIntoFolders(pages)).toMatchSnapshot();
  });

  test('parsePages properly returns array of Page objects', () => {
    expect(parsePages(modules)).toMatchInlineSnapshot(`
      [
        {
          "ext": "md",
          "name": "index",
          "path": "./index.md",
          "url": "/",
        },
        {
          "ext": "md",
          "name": "privacy policy",
          "path": "./9-privacy-policy.md",
          "url": "/9-privacy-policy",
        },
        {
          "ext": "md",
          "name": "get started",
          "path": "./0-get-started.md",
          "url": "/0-get-started",
        },
        {
          "ext": "svelte",
          "name": "Button",
          "path": "./0-components/0-Button.svelte",
          "url": "/0-components/0-Button",
        },
        {
          "ext": "svelte",
          "name": "Switch",
          "path": "./0-components/1-Switch.svelte",
          "url": "/0-components/1-Switch",
        },
        {
          "ext": "svelte",
          "name": "Button",
          "path": "./0-components/0-ui/0-Button.svelte",
          "url": "/0-components/0-ui/0-Button",
        },
        {
          "ext": "svelte",
          "name": "play audio section",
          "path": "./0-components/play-audio-section.svelte",
          "url": "/0-components/play-audio-section",
        },
        {
          "ext": "svelte",
          "name": "e",
          "path": "./a/b/c-d/e.svelte",
          "url": "/a/b/c-d/e",
        },
        {
          "ext": "svelte",
          "name": "f",
          "path": "./a/b/c-d/f.svelte",
          "url": "/a/b/c-d/f",
        },
      ]
    `);
  });
}
