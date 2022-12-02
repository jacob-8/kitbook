import { combineModulesIntoPages, parseModules } from "kitbook";
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
  // See https://vitejs.dev/guide/features.html#glob-import for help writing glob imports if needed.
  // **/*.{md,svx} = Kitbook Story Files
  // **/*.svelte = Automatically create a default Story for each component w/ variants automatically being populated by colocated Foo.variants.ts files. +page.svelte files (**/+*.svelte) will only be displayed if mock data is colocated in a page.variants.ts file (not yet implemented)
  // **/*.variants.ts contains props for displaying component/page variants
  const modules = import.meta.glob(['/src/**/*.{md,svx,svelte,variants.ts}', '/README.md']);
  const modulesRaw = import.meta.glob(['/src/**/*.{md,svx,svelte,variants.ts}', '/README.md'], { as: 'raw' });

  return {
    modules,
    modulesRaw,
    pages: combineModulesIntoPages(parseModules(modules))
  };
}

// export { layoutLoad as load };
// Modify the default layoutLoad function with your own to customize file endings and/or directories to scan.