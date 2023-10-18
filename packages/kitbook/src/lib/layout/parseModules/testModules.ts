export const testModules = {
  '/README.md': () => Promise.resolve(null),

  // markdown docs
  '/src/index.md': () => Promise.resolve(null),
  '/src/docs/0-why-kitbook.md': () => Promise.resolve(null),
  '/src/docs/1-get-started.md': () => Promise.resolve(null),
  '/src/docs/1a-you-can-use-letters-to-adjust-ordering.md': () => Promise.resolve(null),
  '/src/docs/my-notes/0-unocss.md': () => Promise.resolve(null),
  '/src/docs/my-notes/1-deploy-to-vercel.md': () => Promise.resolve(null),

  // standalone components
  '/src/lib/A.svelte': () => Promise.resolve(null), // component only

  '/src/lib/B.svelte': () => Promise.resolve(null), // with svx
  '/src/lib/B.svx': () => Promise.resolve(null),

  '/src/lib/a/C.svelte': () => Promise.resolve(null), // with variants
  '/src/lib/a/C.variants.ts': () => Promise.resolve(null),

  '/src/lib/a/D.svelte': () => Promise.resolve(null), // with svx, variants, and compositions
  '/src/lib/a/D.svx': () => Promise.resolve(null),
  '/src/lib/a/D.variants.ts': () => Promise.resolve(null),
  '/src/lib/a/D.composition': () => Promise.resolve(null), // default composition
  '/src/lib/a/D.first.composition': () => Promise.resolve(null), // named composition
  '/src/lib/a/D.second.composition': () => Promise.resolve(null),

  '/src/lib/E.svx': () => Promise.resolve(null), // svx by itself

  // TODO:
  // '/src/lib/a/F.composition': () => Promise.resolve(null), // compositions by themselves will be put into their own bucket, ready to be referenced by docs modules but not given a page themselves

  // pages
  '/src/routes/+page.svelte': () => Promise.resolve(null), // page only

  '/src/routes/a/+page.svelte': () => Promise.resolve(null), // with svx
  '/src/routes/a/_page.svx': () => Promise.resolve(null),

  '/src/routes/b/+page.svelte': () => Promise.resolve(null), // with variants
  '/src/routes/b/_page.variants.ts': () => Promise.resolve(null),

  '/src/routes/c/_page.svx': () => Promise.resolve(null),
  '/src/routes/c/_page.variants.ts': () => Promise.resolve(null),
  '/src/routes/c/+page.svelte': () => Promise.resolve(null), // with svx and variants
  // probably won't happen but the order of the above is intentionally reversed to cover that situation in case Vite ever updates the order in which modules are returned from import.meta.glob

  // layouts
  '/src/routes/+layout.svelte': () => Promise.resolve(null), // layout only

  '/src/routes/a/+layout.svelte': () => Promise.resolve(null), // with svx
  '/src/routes/a/_layout.svx': () => Promise.resolve(null),

  '/src/routes/b/+layout.svelte': () => Promise.resolve(null), // with variants
  '/src/routes/b/_layout.variants.ts': () => Promise.resolve(null),

  '/src/routes/c/+layout.svelte': () => Promise.resolve(null), // with svx and variants
  '/src/routes/c/_layout.svx': () => Promise.resolve(null),
  '/src/routes/c/_layout.variants.ts': () => Promise.resolve(null),

  // unrecognized extensions will be ignored in groupColocatedPages()
  '/src/lib/A.foo.svelte': () => Promise.resolve(null),
  '/src/lib/Baz.foo.svelte': () => Promise.resolve(null),
  '/src/lib/Typescript.ts': () => Promise.resolve(null),
  '/src/lib/Vue.vue': () => Promise.resolve(null),
}
