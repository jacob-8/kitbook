import type { GroupedPageMap, KitbookSettings } from 'kitbook'
import { pagesStore } from '../modules/hmrUpdatedModules'

// import { derived } from 'svelte/store'

/**
 * The default modules glob import used by Kitbook is this
 * ```js
 * const modules = import.meta.glob(['/src/**\/*.{md,svx,svelte,variants.ts}', '/README.md']);
 * ```
 * `{md,svx}` = Kitbook Story Files
 *
 * `{svelte,variants.ts}` = Automatically create a default Story for each component w/ variants automatically being populated by colocated files `*.variants.ts` files (Foo.svelte and Foo.variants.ts; +page.svelte and _page.variants.ts)
 */
export function layoutLoad({ pages: initialPages, settings }:
{
  pages: GroupedPageMap
  settings: KitbookSettings
}) {
  return async () => {
    if (!Object.keys(initialPages).length)
      throw new Error('No pages found. Did you import layoutLoad into your Kitbook layout.ts file and you have at least a README.md or one +page.svelte, +layout.svelte, *.svelte, *.md, or *.svx file in your project?')

    // console.log({ initialPages })
    // const pages = derived(pagesStore, ($pagesStore, set) => {
    //   console.log({ $pagesStore })
    //   if (Object.keys($pagesStore).length) {
    //     console.log('setting pages')
    //     set($pagesStore)
    //   }
    // }, initialPages)

    return {
      pages: initialPages,
      pagesStore,
      settings,
    }
  }
}
