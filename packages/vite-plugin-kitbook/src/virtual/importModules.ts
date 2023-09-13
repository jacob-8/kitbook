// @ts-ignore - this file is going to become a virtual module in an environment where kitbook is available
import { groupColocatedModulesIntoPages, pagesStore } from "kitbook";

// Vite reference: https://vitejs.dev/guide/features.html#glob-import
const modules = import.meta.glob(['REPLACE_WITH_MODULE_GLOBS']);
const rawModules = import.meta.glob(['REPLACE_WITH_MODULE_GLOBS'], { as: 'raw' });
// testing prebundling loading optimization
// const makeSureAllDependenciesAreOptimizedAtOnceToAvoidPageReloads = import.meta.glob(['/src/**/*.svelte'], { eager: true });
// console.log({makeSureAllDependenciesAreOptimizedAtOnceToAvoidPageReloads})

export const pages = groupColocatedModulesIntoPages(modules, rawModules);

if (import.meta.hot) {
  import.meta.hot.accept((updatedModuleImport) => {
    if (updatedModuleImport?.pages) {
      pagesStore.set(updatedModuleImport.pages);
    }
  })
}
