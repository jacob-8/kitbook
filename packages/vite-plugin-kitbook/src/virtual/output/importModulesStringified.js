export default `import { groupColocatedModulesIntoPages, pagesStore } from "kitbook";
const modules = import.meta.glob(["/src/**/*.{md,svx,svelte,variants.ts}", "/README.md"]);
const rawModules = import.meta.glob(["/src/**/*.{md,svx,svelte,variants.ts}", "/README.md"], { as: "raw" });
export const pages = groupColocatedModulesIntoPages(modules, rawModules);
const WrapRootLayoutMap = import.meta.glob(["/src/.kitbook/WrapRootLayout.svelte"], { eager: true, import: "default" });
export const WrapRootLayout = WrapRootLayoutMap["/src/.kitbook/WrapRootLayout.svelte"];
const init = import.meta.glob(["/src/.kitbook/init.{js,ts}"], { eager: true, import: "default" });
export const initFunction = init["/src/.kitbook/init.js"] || init["/src/.kitbook/init.ts"];
if (import.meta.hot) {
  import.meta.hot.accept((updatedModuleImport) => {
    if (updatedModuleImport?.pages) {
      pagesStore.set(updatedModuleImport.pages);
    }
  });
}`;
