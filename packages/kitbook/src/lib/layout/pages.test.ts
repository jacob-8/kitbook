import { parseModules, putPagesIntoFolders, parsePath } from "./pages";

const modules = {
  '/README.md': () => Promise.resolve({}),

  // markdown docs
  '/src/docs/0-why-kitbook.md': () => Promise.resolve({}),
  '/src/docs/1-get-started.md': () => Promise.resolve({}),
  '/src/docs/index.md': () => Promise.resolve({}),
  '/src/docs/my-notes/0-unocss.md': () => Promise.resolve({}),
  '/src/docs/my-notes/1-deploy-to-vercel.md': () => Promise.resolve({}),
  
  // components
  '/src/lib/A.svelte': () => Promise.resolve({}), // by itself
  
  '/src/lib/B.svelte': () => Promise.resolve({}), // with svx
  '/src/lib/B.svx': () => Promise.resolve({}),
  
  '/src/lib/a/C.svelte': () => Promise.resolve({}), // with variants
  '/src/lib/a/C.variants.ts': () => Promise.resolve({}),
  
  '/src/lib/a/D.svelte': () => Promise.resolve({}), // with svx and variants
  '/src/lib/a/D.svx': () => Promise.resolve({}),
  '/src/lib/a/D.variants.ts': () => Promise.resolve({}),
  
  '/src/lib/E.svx': () => Promise.resolve({}), // svx by itself (e.g. display combinations of components)
  
  // pages
  '/src/routes/+page.svelte': () => Promise.resolve({}), // by itself
  
  '/src/routes/a/+page.svelte': () => Promise.resolve({}), // with svx
  '/src/routes/a/_page.svx': () => Promise.resolve({}),

  '/src/routes/b/+page.svelte': () => Promise.resolve({}), // with variants
  '/src/routes/b/_page.variants.ts': () => Promise.resolve({}),
  
  '/src/routes/c/+page.svelte': () => Promise.resolve({}), // with svx and variants
  '/src/routes/c/_page.svx': () => Promise.resolve({}),
  '/src/routes/c/_page.variants.ts': () => Promise.resolve({}),
  
  // ignore layout files and kitbook route files
  '/src/routes/+layout.svelte': () => Promise.resolve({}), 
  '/src/routes/kitbook/[...file]/+page.svelte': () => Promise.resolve({}),
  '/src/routes/kitbook/sandbox/[...id]/+page@.svelte': () => Promise.resolve({}),
  
  // unrecognized extensions will be ignored in combineModulesIntoPages()
  '/src/lib/A.foo.svelte': () => Promise.resolve({}),
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
        "url": "/README",
      },
      {
        "ext": "md",
        "name": "why kitbook",
        "path": "/src/docs/0-why-kitbook.md",
        "url": "/docs/0-why-kitbook",
      },
      {
        "ext": "md",
        "name": "get started",
        "path": "/src/docs/1-get-started.md",
        "url": "/docs/1-get-started",
      },
      {
        "ext": "md",
        "name": "index",
        "path": "/src/docs/index.md",
        "url": "/docs/index",
      },
      {
        "ext": "md",
        "name": "unocss",
        "path": "/src/docs/my-notes/0-unocss.md",
        "url": "/docs/my-notes/0-unocss",
      },
      {
        "ext": "md",
        "name": "deploy to vercel",
        "path": "/src/docs/my-notes/1-deploy-to-vercel.md",
        "url": "/docs/my-notes/1-deploy-to-vercel",
      },
      {
        "ext": "svelte",
        "name": "A",
        "path": "/src/lib/A.svelte",
        "url": "/lib/A",
      },
      {
        "ext": "svelte",
        "name": "B",
        "path": "/src/lib/B.svelte",
        "url": "/lib/B",
      },
      {
        "ext": "svx",
        "name": "B",
        "path": "/src/lib/B.svx",
        "url": "/lib/B",
      },
      {
        "ext": "svelte",
        "name": "C",
        "path": "/src/lib/a/C.svelte",
        "url": "/lib/a/C",
      },
      {
        "ext": "variants.ts",
        "name": "C",
        "path": "/src/lib/a/C.variants.ts",
        "url": "/lib/a/C",
      },
      {
        "ext": "svelte",
        "name": "D",
        "path": "/src/lib/a/D.svelte",
        "url": "/lib/a/D",
      },
      {
        "ext": "svx",
        "name": "D",
        "path": "/src/lib/a/D.svx",
        "url": "/lib/a/D",
      },
      {
        "ext": "variants.ts",
        "name": "D",
        "path": "/src/lib/a/D.variants.ts",
        "url": "/lib/a/D",
      },
      {
        "ext": "svx",
        "name": "E",
        "path": "/src/lib/E.svx",
        "url": "/lib/E",
      },
      {
        "ext": "svelte",
        "name": "+page",
        "path": "/src/routes/+page.svelte",
        "url": "/routes/+page",
      },
      {
        "ext": "svelte",
        "name": "+page",
        "path": "/src/routes/a/+page.svelte",
        "url": "/routes/a/+page",
      },
      {
        "ext": "svx",
        "name": "_page",
        "path": "/src/routes/a/_page.svx",
        "url": "/routes/a/_page",
      },
      {
        "ext": "svelte",
        "name": "+page",
        "path": "/src/routes/b/+page.svelte",
        "url": "/routes/b/+page",
      },
      {
        "ext": "variants.ts",
        "name": "_page",
        "path": "/src/routes/b/_page.variants.ts",
        "url": "/routes/b/_page",
      },
      {
        "ext": "svelte",
        "name": "+page",
        "path": "/src/routes/c/+page.svelte",
        "url": "/routes/c/+page",
      },
      {
        "ext": "svx",
        "name": "_page",
        "path": "/src/routes/c/_page.svx",
        "url": "/routes/c/_page",
      },
      {
        "ext": "variants.ts",
        "name": "_page",
        "path": "/src/routes/c/_page.variants.ts",
        "url": "/routes/c/_page",
      },
      {
        "ext": "foo.svelte",
        "name": "A",
        "path": "/src/lib/A.foo.svelte",
        "url": "/lib/A",
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
  expect(parsePath('/README.md')).toMatchInlineSnapshot(`
    {
      "dir": "/",
      "ext": "md",
      "name": "README",
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

test.skip('skips and logs warning upon receiving unusable path', () => {
  expect(parsePath('+page.ts')).toThrow();
  // expect(parsePath('+page.ts')).toThrowErrorMatchingInlineSnapshot();
});

