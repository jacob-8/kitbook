import { parseModules, putPagesIntoFolders, parsePath, combineModulesIntoPages } from "./pages";

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

test('parseModules properly returns array of Pages', () => {
  expect(parseModules(modules)).toMatchSnapshot();
});

test('combineModulesIntoPages properly combines Pages', () => {
  const pages = parseModules(modules);
  expect(combineModulesIntoPages(pages)).toMatchSnapshot();
});

test('putPagesIntoFolders organizes Pages into proper folders', () => {
  const pages = parseModules(modules);
  expect(putPagesIntoFolders(combineModulesIntoPages(pages))).toMatchSnapshot();
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

