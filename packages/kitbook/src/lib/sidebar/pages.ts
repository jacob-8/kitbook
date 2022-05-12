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

export function parsePages(modules: Modules): Page[] {
  const paths = Object.keys(modules);
  if (!paths.length) {
    throw new Error(
      'Did not find any modules (page files in your routes directory) that match your "import.meta.glob" pattern. Have you added any pages in your routes directory yet with an extension matching your glob pattern? The default pattern is "./**/*.{md,svx}"'
    );
  }
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

export function putPagesIntoFolders(pagesToOrganize: Page[]): Folder {
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

export function findActivePage(pages: Page[], urlPathname: string): Page {
  const activePage = pages.find((page) => {
    const regex = new RegExp(`${page.url}$`);
    return regex.test(urlPathname);
  });
  if (activePage) return activePage;
  return pages.find((page) => page.url === '/');
}

if (import.meta.vitest) {
  const modules = {
    // ./0-components/0-layout.md
    // ./0-components/1-story.svx
    // ./0-components/internal/0-sidebar.svx
    // ./0-components/internal/1-knobs.svx
    // ./0-why-kitbook.md
    // ./1-get-started.md
    // ./2-add-stories.md
    // ./9-maintainer-notes/0-add-windicss.md
    // ./9-maintainer-notes/1-deploy-to-vercel.md
    './9-privacy-policy.md': () => Promise.resolve({}),
    './0-get-started.md': () => Promise.resolve({}),
    './0-components/0-Button.svelte': () => Promise.resolve({}),
    './0-components/1-Switch.svelte': () => Promise.resolve({}),
    './0-components/0-ui/0-Button.svelte': () => Promise.resolve({}),
    './0-components/play-audio-section.svelte': () => Promise.resolve({}), // test this to remove section hyphen
    './3-examples.md': () => Promise.resolve({}),
    './[reference]/__layout.svelte': () => Promise.resolve({}),
    './a/b/c-d/e.svelte': () => Promise.resolve({}),
    './a/b/c-d/f.svelte': () => Promise.resolve({}),
    './index.md': () => Promise.resolve({}),
  };
  const pages = parsePages(modules);

  test('putPagesIntoFolders organizes pages into proper folders based on dir', () => {
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
          "ext": "md",
          "name": "examples",
          "path": "./3-examples.md",
          "url": "/3-examples",
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

  test('findActivePage returns page that includes current url', () => {
    expect(findActivePage(pages, '/3-examples')).toMatchInlineSnapshot(`
      {
        "ext": "md",
        "name": "examples",
        "path": "./3-examples.md",
        "url": "/3-examples",
      }
    `);
  });

  test('findActivePage handles index page', () => {
    expect(findActivePage(pages, '/')).toMatchInlineSnapshot(`
      {
        "ext": "md",
        "name": "index",
        "path": "./index.md",
        "url": "/",
      }
    `);
  });

  test('findActivePage works when kitbook is placed in a subfolder', () => {
    expect(findActivePage(pages, '/foo/kitbookroot/3-examples')).toMatchInlineSnapshot(`
      {
        "ext": "md",
        "name": "examples",
        "path": "./3-examples.md",
        "url": "/3-examples",
      }
    `);
  });

  test('findActivePage returns kitbook index when no matches', () => {
    expect(findActivePage(pages, '/foo/kitbookroot')).toMatchInlineSnapshot(`
      {
        "ext": "md",
        "name": "index",
        "path": "./index.md",
        "url": "/",
      }
    `);
  });
}
