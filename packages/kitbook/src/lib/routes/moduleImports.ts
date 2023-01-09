import { groupColocatedModulesIntoPages, pagesStore } from "kitbook";

// Vite reference: https://vitejs.dev/guide/features.html#glob-import
const modules = import.meta.glob(['/src/**/*.{md,svx,svelte,variants.ts}', '/README.md']);
const rawModules = import.meta.glob(['/src/**/*.{md,svx,svelte,variants.ts}', '/README.md'], { as: 'raw' });

export const pages = groupColocatedModulesIntoPages(modules, rawModules);

// pagesStore.set(pages); // optional to switch right from SSR to Client loaded modules

if (import.meta.hot) {
  import.meta.hot.accept((updatedModuleImport) => {
    if (updatedModuleImport?.pages) {
      pagesStore.set(updatedModuleImport.pages);
    }
  })
}
