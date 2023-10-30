import type { GroupedPageMap, KitbookSettings } from 'kitbook'
import { pagesStore } from '../modules/hmrUpdatedModules'

export interface LayoutLoadResult {
  pages: GroupedPageMap
  pagesStore: typeof pagesStore
  settings: KitbookSettings
}

// import { derived } from 'svelte/store'
export function layoutLoad({
  pages: initialPages,
  settings,
}: {
  pages: GroupedPageMap
  settings: KitbookSettings
}): () => Promise<LayoutLoadResult> {
  return async () => {
    if (!Object.keys(initialPages).length)
      throw new Error('No pages found. Did you import layoutLoad into your Kitbook layout.ts file and you have at least a README.md or one +page.svelte, +layout.svelte, *.svelte, *.md, or other Kitbook file in your project?')

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
