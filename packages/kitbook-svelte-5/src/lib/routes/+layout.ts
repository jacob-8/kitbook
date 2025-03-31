// let firstLoad = true
// if (firstLoad) {
//   pagesStore.set(_pages)
//   firstLoad = false
// }

// if (import.meta.hot) {
//   import.meta.hot.accept((module) => {
//     if (module?._pages)
//       pagesStore.set(module._pages)
//   })
// }

// @ts-ignore - virtual import
// import { settings } from 'virtual:kitbook'
// import { layoutLoad, pagesStore } from 'kitbook'
import { parse_modules } from 'kitbook'
import type { KitbookSettings } from 'kitbook/kitbook-types'
import type { LayoutLoad } from './$types'

const settings: KitbookSettings = {
  routes_directory: 'src/lib/routes',
  alias: {
    kitbook: 'src/lib',
  },
}

/**
 * Vite glob patterns used for building your Kitbook. See https://vitejs.dev/guide/features.html#multiple-patterns.
 * Restrict these paths to be able to incrementally adopt Kitbook into your project.
 * Alternate extensions are not supported.
 * Kitbook changes in the future will cause this file to be regenerated. Your glob patterns will be preserved as long as you only edit the patterns inside the array brackets and nothing else (you should add the routes/kitbook/* path to your lint ignore).
 */
const components_raw_eager = import.meta.glob(['/src/**/*.svelte'], { query: '?raw', import: 'default', eager: true })
const stories_raw = import.meta.glob(['/src/**/*.stories.ts', '/src/**/*.variants.ts'], { query: '?raw', import: 'default' })
const compositions_raw = import.meta.glob(['/src/**/*.composition'], { query: '?raw', import: 'default' })
const markdown_raw = import.meta.glob(['/src/**/*.md', '/README.md'], { query: '?raw', import: 'default' })

const parsed_module_sets = parse_modules({ components_raw_eager, stories_raw, compositions_raw, markdown_raw, settings })

// export const load = layoutLoad({ parsed_modules, settings, mockedPageData: {} }) satisfies LayoutLoad
export const load = (() => {
  return { parsed_module_sets, settings }
}) satisfies LayoutLoad
