import type { ViewerOptions } from './viewer/options'

export interface KitbookSettings {
  title: string
  description: string
  viewports: Viewport[]
  languages?: Language[]
  expandTree?: boolean
  githubURL?: string
  /**
   * An array of Vite glob patterns for building your Kitbook. See https://vitejs.dev/guide/features.html#multiple-patterns. Defaults to ['/src/**_/*.{md,svx,svelte,variants.ts}', '/README.md']. Adjust this to be able to incrementally adopt Kitbook into your project. << ignore the underscore in the glob pattern, it's just there to make the JSDoc comment work.
   */
  importModuleGlobs?: string[]
  viewer?: ViewerOptions
  /** `src/routes` by default - if you have changed the default SvelteKit routes directory, you must specify it here also */
  routesDirectory?: string
  /** `/kitbook` by default, pass in an empty string `""` for the root `/` route */
  kitbookRoute?: string
}

export interface Viewport {
  name?: string
  width: number
  height: number
}

export interface Language {
  name: string
  code: string
}
