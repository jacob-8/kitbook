import { parseModules, putPagesIntoFolders, parsePath } from "./pages";

const modules = {
  '/README.md': () => Promise.resolve({}),
  // markdown docs
  '/src/docs/0-why-kitbook.md': () => Promise.resolve({}),
  '/src/docs/1-get-started.md': () => Promise.resolve({}),
  '/src/docs/maintainer-notes/0-unocss.md': () => Promise.resolve({}),
  '/src/docs/maintainer-notes/1-deploy-to-vercel.md': () => Promise.resolve({}),
  '/src/docs/index.md': () => Promise.resolve({}),
  
  // components
  '/src/lib/Header.svelte': () => Promise.resolve({}), // by itself

  '/src/lib/Layout.svelte': () => Promise.resolve({}), // with svx
  '/src/lib/Layout.svx': () => Promise.resolve({}),

  '/src/lib/sidebar/Folder.svelte': () => Promise.resolve({}), // with variants
  '/src/lib/sidebar/Folder.variants.ts': () => Promise.resolve({}),
  
  '/src/lib/sidebar/Sidebar.svelte': () => Promise.resolve({}), // with svx and variants
  '/src/lib/sidebar/Sidebar.svx': () => Promise.resolve({}),
  '/src/lib/sidebar/Sidebar.variants.ts': () => Promise.resolve({}),
  
  '/src/lib/sidebar/Page.svelte': () => Promise.resolve({}),
  
  // page data variants
  '/src/routes/+page.svelte': () => Promise.resolve({}),
  '/src/routes/_page.variants.ts': () => Promise.resolve({}),
  '/src/routes/a/+page.svelte': () => Promise.resolve({}),
  '/src/routes/a/_page.variants.ts': () => Promise.resolve({}),
  
  // ignore layout files
  '/src/routes/+layout.svelte': () => Promise.resolve({}), 
  // ignore kitbook route files
  '/src/routes/kitbook/+layout.svelte': () => Promise.resolve({}),
  '/src/routes/kitbook/[...file]/+page.svelte': () => Promise.resolve({}),
  '/src/routes/kitbook/sandbox/[...id]/+page@.svelte': () => Promise.resolve({})
}

test('putPagesIntoFolders organizes pages into proper folders', () => {
  const pages = parseModules(modules);
  expect(putPagesIntoFolders(pages)).toMatchSnapshot();
});

test('parseModules properly returns array of Page objects', () => {
  expect(parseModules(modules)).toMatchInlineSnapshot(`
    [
      {
        "ext": "md",
        "name": "README",
        "path": "/README.md",
        "url": "/",
      },
      {
        "ext": "md",
        "name": "why kitbook",
        "path": "docs/0-why-kitbook.md",
        "url": "docs/",
      },
      {
        "ext": "md",
        "name": "get started",
        "path": "docs/1-get-started.md",
        "url": "docs/",
      },
      {
        "ext": "md",
        "name": "unocss",
        "path": "docs/maintainer-notes/0-unocss.md",
        "url": "docs/maintainer-notes/",
      },
      {
        "ext": "md",
        "name": "deploy to vercel",
        "path": "docs/maintainer-notes/1-deploy-to-vercel.md",
        "url": "docs/maintainer-notes/",
      },
      {
        "ext": "md",
        "name": "index",
        "path": "docs/index.md",
        "url": "docs/",
      },
      {
        "ext": "svelte",
        "name": "Header",
        "path": "lib/Header.svelte",
        "url": "lib/",
      },
      {
        "ext": "svelte",
        "name": "Layout",
        "path": "lib/Layout.svelte",
        "url": "lib/",
      },
      {
        "ext": "svx",
        "name": "Layout",
        "path": "lib/Layout.svx",
        "url": "lib/",
      },
      {
        "ext": "svelte",
        "name": "Folder",
        "path": "lib/sidebar/Folder.svelte",
        "url": "lib/sidebar/",
      },
      {
        "ext": "variants.ts",
        "name": "Folder",
        "path": "lib/sidebar/Folder.variants.ts",
        "url": "lib/sidebar/",
      },
      {
        "ext": "svelte",
        "name": "Sidebar",
        "path": "lib/sidebar/Sidebar.svelte",
        "url": "lib/sidebar/",
      },
      {
        "ext": "svx",
        "name": "Sidebar",
        "path": "lib/sidebar/Sidebar.svx",
        "url": "lib/sidebar/",
      },
      {
        "ext": "variants.ts",
        "name": "Sidebar",
        "path": "lib/sidebar/Sidebar.variants.ts",
        "url": "lib/sidebar/",
      },
      {
        "ext": "svelte",
        "name": "Page",
        "path": "lib/sidebar/Page.svelte",
        "url": "lib/sidebar/",
      },
      {
        "ext": "svelte",
        "name": "+page",
        "path": "routes/+page.svelte",
        "url": "routes/",
      },
      {
        "ext": "variants.ts",
        "name": "_page",
        "path": "routes/_page.variants.ts",
        "url": "routes/",
      },
      {
        "ext": "svelte",
        "name": "+page",
        "path": "routes/a/+page.svelte",
        "url": "routes/a/",
      },
      {
        "ext": "variants.ts",
        "name": "_page",
        "path": "routes/a/_page.variants.ts",
        "url": "routes/a/",
      },
    ]
  `);
});

test('parsePath parses path correctly', () => {
  expect(parsePath('/src/docs/0-why-kitbook.md')).toMatchInlineSnapshot(`
    {
      "dir": "docs/",
      "ext": "md",
      "name": "0-why-kitbook",
    }
  `);
  expect(parsePath('/src/docs/index.md')).toMatchInlineSnapshot(`
    {
      "dir": "docs/",
      "ext": "md",
      "name": "index",
    }
  `);
  expect(parsePath('/src/routes/a/+page.svelte')).toMatchInlineSnapshot(`
    {
      "dir": "routes/a/",
      "ext": "svelte",
      "name": "+page",
    }
  `);
  expect(parsePath('/src/routes/a/_page.variants.ts')).toMatchInlineSnapshot(`
    {
      "dir": "routes/a/",
      "ext": "variants.ts",
      "name": "_page",
    }
  `);
});

test.skip('throws error upon receiving unusable path', () => {
  expect(parsePath('+page.ts')).toThrow();
  // expect(parsePath('+page.ts')).toThrowErrorMatchingInlineSnapshot();
});

// test('findActivePage returns page that includes current url', () => {
//   expect(findActivePage(pages, '/3-examples')).toMatchInlineSnapshot(`
//     {
//       "ext": "md",
//       "name": "examples",
//       "path": "./3-examples/+page.md",
//       "url": "/3-examples",
//     }
//   `);
// });

// test('findActivePage handles index page', () => {
//   expect(findActivePage(pages, '/')).toMatchInlineSnapshot(`
//     {
//       "ext": "md",
//       "name": "index",
//       "path": "./+page.md",
//       "url": "/",
//     }
//   `);
// });

// test('findActivePage works when kitbook is placed in a subfolder', () => {
//   expect(findActivePage(pages, '/foo/kitbookroot/3-examples')).toMatchInlineSnapshot(`
//     {
//       "ext": "md",
//       "name": "examples",
//       "path": "./3-examples/+page.md",
//       "url": "/3-examples",
//     }
//   `);
// });

// test('findActivePage returns kitbook index when no matches', () => {
//   expect(findActivePage(pages, '/foo/kitbookroot')).toMatchInlineSnapshot(`
//     {
//       "ext": "md",
//       "name": "index",
//       "path": "./+page.md",
//       "url": "/",
//     }
//   `);
// });