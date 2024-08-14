import type { GroupedPageMap, KitbookSettings } from 'kitbook'
import { pagesStore } from '../modules/hmrUpdatedModules'
import { rpc_client } from '../modules/rpc-client'

interface LayoutLoadInput {
  pages: GroupedPageMap
  settings: KitbookSettings
  /** Mock any additional data you want available for Components that are not `+page.svelte` files to be able to directly access values from the data prop on SvelteKit's page store, i.e. `$page.data`. For `+page.svelte` it's better to directly import page data using the `data` prop so that you can customize multiple variants. */
  mockedPageData?: Record<string, any>
}

export interface LayoutLoadResult {
  pages: GroupedPageMap
  pagesStore: typeof pagesStore
  kitbook_settings: KitbookSettings // prefixed to allow users to use the settings keyword in the mockedPageData
  rpc_client: typeof rpc_client
}

export function layoutLoad({
  pages: initialPages,
  settings,
  mockedPageData,
}: LayoutLoadInput): () => LayoutLoadResult {
  return () => {
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
      kitbook_settings: settings,
      rpc_client,
      ...(mockedPageData || {}),
    }
  }
}
