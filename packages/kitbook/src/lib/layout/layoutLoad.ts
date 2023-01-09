import type { GroupedPageMap } from "kitbook";

/**
 * `initFunction` is an optional async function that will be called before the layout is loaded. This is useful for things like setting up i18n before loading your Kitbook.
 * 
 * The default modules glob import used by Kitbook is this
 * ```js
 * const modules = import.meta.glob(['/src/**\/*.{md,svx,svelte,variants.ts}', '/README.md']);
 * ```
 * `{md,svx}` = Kitbook Story Files
 * 
 * `{svelte,variants.ts}` = Automatically create a default Story for each component w/ variants automatically being populated by colocated files `*.variants.ts` files (Foo.svelte and Foo.variants.ts; +page.svelte and _page.variants.ts)
 */
export function layoutLoad({ pages, initFunction }:
  {
    pages: GroupedPageMap,
    initFunction?: () => Promise<void>,
  }) {
  return async () => {
    initFunction && await initFunction();

    if (!Object.keys(pages).length) throw new Error('No pages found. Did you import layoutLoad into your Kitbook layout.ts file and you have at least a README.md or one +page.svelte, +layout.svelte, *.svelte, *.md, or *.svx file in your project?')

    return {
      pages,
    };
  }
} 
