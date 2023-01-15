import { groupColocatedModulesIntoPages, pagesStore } from "kitbook";
import type { SvelteComponent } from "svelte";

// Vite reference: https://vitejs.dev/guide/features.html#glob-import
const modules = import.meta.glob(['/src/**/*.{md,svx,svelte,variants.ts}', '/README.md']);
const rawModules = import.meta.glob(['/src/**/*.{md,svx,svelte,variants.ts}', '/README.md'], { as: 'raw' });

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
