export const modules = {
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
  '/src/kitbook/[...file]/+page.svelte': () => Promise.resolve({}),
  '/src/kitbook/sandbox/[...file]/+page.svelte': () => Promise.resolve({}),

  // unrecognized extensions will be ignored in combineModulesIntoPages()
  '/src/lib/A.foo.svelte': () => Promise.resolve({}),
}