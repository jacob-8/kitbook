import { parsePages, putPagesIntoFolders, parsePath } from "./pages";

const modules = {
  svxModules: {
    '/src/docs/0-why-kitbook.md': () => Promise.resolve({}),
    '/src/docs/1-get-started.md': () => Promise.resolve({}),
    '/src/docs/2-add-stories.md': () => Promise.resolve({}),
    '/src/docs/3-examples.md': () => Promise.resolve({}),
    '/src/docs/9-maintainer-notes/0-add-windicss.md': () => Promise.resolve({}),
    '/src/docs/9-maintainer-notes/1-deploy-to-vercel.md': () => Promise.resolve({}),
    '/src/docs/9-maintainer-notes/2-add-vitest.md': () => Promise.resolve({}),
    '/src/docs/9-maintainer-notes/3-contributing.md': () => Promise.resolve({}),
    '/src/docs/9-maintainer-notes/4-todo.md': () => Promise.resolve({}),
    '/src/docs/9-maintainer-notes/5-inspiration.md': () => Promise.resolve({}),
    '/src/docs/index.md': () => Promise.resolve({}),
    '/src/lib/Layout.svx': () => Promise.resolve({}),
    '/src/lib/sidebar/Sidebar.svx': () => Promise.resolve({}),
    '/src/lib/stories/Knobs.svx': () => Promise.resolve({}),
    '/src/lib/stories/Story.svx': () => Promise.resolve({})
  },
  componentModules: {
    '/src/lib/Header.svelte': () => Promise.resolve({}),
    '/src/lib/Layout.svelte': () => Promise.resolve({}),
    '/src/lib/plugins/input/Backticks.svelte': () => Promise.resolve({}),
    '/src/lib/plugins/output/Backticks.svelte': () => Promise.resolve({}),
    '/src/lib/sidebar/Folder.svelte': () => Promise.resolve({}),
    '/src/lib/sidebar/Page.svelte': () => Promise.resolve({}),
    '/src/lib/sidebar/Sidebar.svelte': () => Promise.resolve({}),
    '/src/lib/stories/Knobs.svelte': () => Promise.resolve({}),
    '/src/lib/stories/Story.svelte': () => Promise.resolve({})
  }
}

// const modules = {
//   './9-privacy-policy/+page.md': () => Promise.resolve({}),
//   './0-get-started/+page.md': () => Promise.resolve({}),
//   './0-components/0-Button/+page.svelte': () => Promise.resolve({}),
//   './0-components/1-Switch/+page.svelte': () => Promise.resolve({}),
//   './0-components/0-ui/0-Button/+page.svelte': () => Promise.resolve({}),
//   './0-components/play-audio-section/+page.svelte': () => Promise.resolve({}), // test this to remove section hyphen
//   './3-examples/+page.md': () => Promise.resolve({}),
//   './[reference]/+layout.svelte': () => Promise.resolve({}),
//   './a/b/c-d/e/+page.svelte': () => Promise.resolve({}),
//   './a/b/c-d/f/+page.svelte': () => Promise.resolve({}),
//   './+page.md': () => Promise.resolve({}),
// };
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
        "path": "./+page.md",
        "url": "/",
      },
      {
        "ext": "md",
        "name": "privacy policy",
        "path": "./9-privacy-policy/+page.md",
        "url": "/9-privacy-policy",
      },
      {
        "ext": "md",
        "name": "get started",
        "path": "./0-get-started/+page.md",
        "url": "/0-get-started",
      },
      {
        "ext": "svelte",
        "name": "Button",
        "path": "./0-components/0-Button/+page.svelte",
        "url": "/0-components/0-Button",
      },
      {
        "ext": "svelte",
        "name": "Switch",
        "path": "./0-components/1-Switch/+page.svelte",
        "url": "/0-components/1-Switch",
      },
      {
        "ext": "svelte",
        "name": "Button",
        "path": "./0-components/0-ui/0-Button/+page.svelte",
        "url": "/0-components/0-ui/0-Button",
      },
      {
        "ext": "svelte",
        "name": "play audio section",
        "path": "./0-components/play-audio-section/+page.svelte",
        "url": "/0-components/play-audio-section",
      },
      {
        "ext": "md",
        "name": "examples",
        "path": "./3-examples/+page.md",
        "url": "/3-examples",
      },
      {
        "ext": "svelte",
        "name": "e",
        "path": "./a/b/c-d/e/+page.svelte",
        "url": "/a/b/c-d/e",
      },
      {
        "ext": "svelte",
        "name": "f",
        "path": "./a/b/c-d/f/+page.svelte",
        "url": "/a/b/c-d/f",
      },
    ]
  `);
});

test('parsePath parses path correctly', () => {
  expect(parsePath('./a/b/c-d/f/+page.svx')).toMatchInlineSnapshot(`
    {
      "dir": "/a/b/c-d/f",
      "ext": "svx",
      "name": "f",
    }
  `);
  expect(parsePath('./a/+page.svx')).toMatchInlineSnapshot(`
    {
      "dir": "/a",
      "ext": "svx",
      "name": "a",
    }
  `);
  expect(parsePath('./+page.svx')).toMatchInlineSnapshot(`
    {
      "dir": undefined,
      "ext": "svx",
      "name": "index",
    }
  `);
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