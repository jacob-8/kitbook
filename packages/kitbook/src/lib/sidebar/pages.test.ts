import { findActivePage, parsePages, putPagesIntoFolders } from "./pages";

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
