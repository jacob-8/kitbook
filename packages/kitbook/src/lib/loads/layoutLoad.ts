import { groupColocatedModulesIntoPages } from "../pages/groupColocatedModulesIntoPages";

export const layoutLoad = async () => {
  // See https://vitejs.dev/guide/features.html#glob-import for help writing glob imports if needed.
  // **/*.{md,svx} = Kitbook Story Files
  // **/*.svelte = Automatically create a default Story for each component w/ variants automatically being populated by colocated files *.variants.ts files (Foo.svelte and Foo.variants.ts; +page.svelte and _page.variants.ts)
  // **/*.variants.ts contains props for displaying component/page variants
  const modules = import.meta.glob(['/src/**/*.{md,svx,svelte,variants.ts}', '/README.md']);
  // const modulesRaw = import.meta.glob(['/src/**/*.{md,svx,svelte,variants.ts}', '/README.md'], { as: 'raw' }); // will rerun on every change so must be put inside a store instead of here. If it's here in the root layout it will cause a full page refresh on every code change.

  const pages = groupColocatedModulesIntoPages(modules);
  if (!Object.keys(pages).length) throw new Error('No pages found. Did you import layoutLoad into your Kitbook layout.ts file and you have at least a README.md or one +page.svelte, +layout.svelte, *.svelte, *.md, or *.svx file in your project?')

  return {
    pages: groupColocatedModulesIntoPages(modules),
  };
}
