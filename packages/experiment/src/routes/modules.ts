import type { SvelteComponent } from "svelte";
type SvelteImport = () => Promise<{ default: typeof SvelteComponent }>;


export const modules = import.meta.glob(['/src/**/*.{svelte,variants.ts}']); // need to make negative to not accept .kitbook - it doesn't now but that may be a bug so prevent against changing behavior there.
export const storyModules = import.meta.glob(['/src/.kitbook/*.svelte']) as Record<string, SvelteImport>; // need to make this accept nested folders

import { updatedModules, updatedStories } from "./hmrUpdatedModules";
updatedModules.set(modules); // optional to switch right from SSR to Client loaded
updatedStories.set(storyModules);

if (import.meta.hot) {
  import.meta.hot.accept((module) => {
    if (module && module.modules) {
      updatedModules.set(module.modules)

      // updatedStories.set(module.storyModules)
      // since Svelte self-accepts HMR updates, this won't ever be called but it's nice to make imports uniform.
    }
  })
}
