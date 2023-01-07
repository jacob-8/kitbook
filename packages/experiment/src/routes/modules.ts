export const modules = import.meta.glob(['/src/**/*.{svelte,variants.ts}']);

import { updatedModules } from "./hmrUpdatedModules";
updatedModules.set(modules); // optional to switch right from SSR to Client loaded

if (import.meta.hot) {
  import.meta.hot.accept((module) => {
    if (module && module.modules) {
      updatedModules.set(module.modules)
      console.log({ accepted: module.modules })
    }
  })
}
