import type { Component, ComponentProps, SvelteComponent } from 'svelte'

export interface StoryMeta {
  description?: string
  viewports?: Viewport[]
  /** Mock data you want available for Components that are not `+page.svelte` files to be able to directly access values from the data prop on SvelteKit's page state, i.e. `page.data`. `+page.svelte` will also receive this data but it will be overwritten by any prop data you pass in so you can customize multiple stories. */
  page_data?: Record<string, any>
  /** contexts won't be HMRed as context must be set on component init which requires remounting the component */
  contexts?: MockedContext[]
  /** don't hydrate story on client by turning off scripts on iframe */
  csr?: false
  /** don't render on server by waiting until iframe is running client side to render story  */
  ssr?: false
}

export interface Story<TComponent extends Component<any>> extends StoryMeta {
  props?: ComponentProps<TComponent>
  /** For partial interopability with stories from Storybook. Kitbook prefers using 'props' as it's standard Svelte terminology. */
  args?: Story<TComponent>['props']
}

export interface PageStory<TComponent extends Component<any>> extends StoryMeta {
  props?: ComponentProps<TComponent>['data']
  /** For partial interopability with stories from Storybook. Kitbook prefers using 'props' as it's standard Svelte terminology. */
  args?: PageStory<TComponent>['props']
}

export interface Viewport {
  name?: string
  width: number
  height?: number
}

export interface OptionalWidthViewport {
  name?: string
  width?: number
  height: number
}

export interface Language {
  name: string
  code: string
}

export interface MockedContext {
  key: any
  context: any
}

export type ParsedModuleSets = Record<string, ParsedModuleSet>

export interface ParsedModuleSet {
  name: string
  url: string // used as the key
  is_route?: boolean
  component?: {
    path: string // allows adding easy link to Github
    raw: string
    parent_paths: string[]
    children_paths: string[]
    load_component: () => Promise<typeof SvelteComponent>
  }
  markdown?: {
    path: string
    load_raw: () => Promise<string>
  }
  compositions?: Record<string, {
    path: string
    load_raw: () => Promise<string>
    load_composition: () => Promise<CompositionModule>
  }>
  stories?: {
    path: string
    load_raw: () => Promise<string>
    load_stories: () => Promise<StoriesModule>
  }
}

export interface StoriesModule {
  shared_meta?: StoryMeta
  [key: string]: Story<any>
}

export interface CompositionModule {
  default: typeof SvelteComponent
  config?: CompositionConfig
  /** Internal use */
  inlined?: boolean
  code?: string
}

export interface CompositionConfig {
  /** overrides default composition full-width viewport */
  viewports?: OptionalWidthViewport[]
  /** overrides Kitbook-wide language selection, pass an empty array to use just Kitbook's first language */
  languages?: Language[]
  /** Set false to keep block iframe scripts and only show the server rendered version.  */
  csr?: false
  /** Set false to only mount component client side and skip server rendering. */
  ssr?: false
}

export interface KitbookSettings {
  title: string
  /** This will be placed into the page head's description meta tag. Use it. */
  description: string
  /** Kitbook provides mobile and desktop sizes by default, but you can set your own. These will apply to every variant unless overriden by a `viewports` export from that file or from the `viewports` prop within a specific variant. */
  viewports?: Viewport[]
  languages?: Language[]
  /**
   * Function instructing Kitbook how to apply your language codes to each URL. For example, if your route is `[lang=locale]/(app)/+page.svelte`, you would pass in:
   * ```
   * ({code, url}) => url.replace('[lang=locale]', code)
   * ```
   * If you use query params to set the language then you need a little more complex function to add `lang=${code}` to the query string or start a new query string if none exists. For example:
   * ```
   * ({code, url}) => {
   *   const [path, search] = url.split('?')
   *   const params = new URLSearchParams(search)
   *   params.set('lang', code)
   *   return `${path}?${params.toString()}`
   * }
   * ```
   */
  add_language_to_url?: ({ code, url }: { code: string, url: string }) => string
  /** `false` by default */
  expandTree?: boolean
  githubURL?: string
  // viewer?: ViewerOptions
  /** `src/routes` by default - if you have changed the default SvelteKit routes directory, you must specify it here also */
  routes_directory?: string
  /** `$lib: 'src/lib'` is already included by default. */
  alias?: Record<string, string>
  /**
   * `/kitbook` by default
   *
   * Pass an empty string `""` to indicate the root `/` route
   */
  kitbook_route?: string
  /** Experimental: API is still unstable and implementation is just being started */
  dark_mode?: true
  /** Don't use this - Kitbook automatically calculates it by running your add_language_to_url function (if it exists) on your kitbook_route. */
  _language_inserted_kitbook_route?: string
}
