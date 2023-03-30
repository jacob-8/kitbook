// TODO: After build, copy virtual/stringified/importModules.js to importModulesStringified and build again - this needs converted into a script run after building so building doesn't need done twice

// @ts-ignore - this file is going to become a virtual module in an environment where kitbook is available
import { groupColocatedModulesIntoPages, pagesStore } from "kitbook";
import type { SvelteComponent } from "svelte";

// Vite reference: https://vitejs.dev/guide/features.html#glob-import
const modules = import.meta.glob(['REPLACE_WITH_MODULE_GLOBS']);
const rawModules = import.meta.glob(['REPLACE_WITH_MODULE_GLOBS'], { as: 'raw' });
// testing prebundling loading optimization
// const makeSureAllDependenciesAreOptimizedAtOnceToAvoidPageReloads = import.meta.glob(['/src/**/*.svelte'], { eager: true });
// console.log({makeSureAllDependenciesAreOptimizedAtOnceToAvoidPageReloads})

export const pages = groupColocatedModulesIntoPages(modules, rawModules);

const WrapRootLayoutMap = import.meta.glob<typeof SvelteComponent>(['/src/.kitbook/WrapRootLayout.svelte'], { eager: true, import: 'default', });
export const WrapRootLayout = WrapRootLayoutMap['/src/.kitbook/WrapRootLayout.svelte'];

type AsyncFunction = () => Promise<void>;
const init = import.meta.glob<AsyncFunction>(['/src/.kitbook/init.{js,ts}'], { eager: true, import: 'default', });
export const initFunction = init['/src/.kitbook/init.js'] || init['/src/.kitbook/init.ts'];

if (import.meta.hot) {
  import.meta.hot.accept((updatedModuleImport) => {
    if (updatedModuleImport?.pages) {
      pagesStore.set(updatedModuleImport.pages);
    }
  })
}
