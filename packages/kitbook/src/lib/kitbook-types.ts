import type { ComponentProps, SvelteComponent } from 'svelte'
import type { Expect, Page } from '@playwright/test'

type IsEmpty<T> = T extends Record<string, never> ? true : false

export type Variant<T extends SvelteComponent> = IsEmpty<ComponentProps<T>> extends true
  ? { _meta?: VariantMeta }
  : { _meta?: VariantMeta } & ComponentProps<T>

export type DataVariant<T extends SvelteComponent> = IsEmpty<ComponentProps<T>> extends true
  ? { _meta?: VariantMeta }
  : { _meta?: VariantMeta } & ComponentProps<T>['data']

export interface VariantMeta {
  description?: string
  /** overrides Kitbook-wide viewports */
  viewports?: Viewport[]
  /** overrides Kitbook-wide language selection, pass an empty array to use just Kitbook's first language */
  languages?: Language[]
  /** contexts won't be HMRed as context must be set on component init which requires remounting the component */
  contexts?: MockedContext[]
  /** can pass in a string to be @html rendered or a Svelte Component for the default slot - you may find Compositions easier to work with than passing in a default slot but it's here. For named slots, use a Composition. */
  slot?: string | any
  /** don't hydrate variant on client by turning off scripts on iframe */
  csr?: false
  /** don't render on server by waiting until iframe is running client side to render variant  */
  ssr?: false
  tests?: {
    /** skips default snapshot test, but not additional tests */
    skip?: boolean
    /** each additional test will take viewports into account and run once per applicable viewport but will not take languages into account */
    additional?: Record<string, Test>
    /** When running Playwright screenshot tests, wait until there are no network operations for at least 500ms, discouraged except when needing to test hydrated views. Defaults to `false`. */
    clientSideRendered?: boolean
  }
}

export interface VariantsModule {
  shared_meta?: VariantMeta
  [key: string]: Variant<any>
}

export interface DeprecatedVariantsModule {
  variants: DeprecatedVariant<any>[]
  viewports?: Viewport[]
  languages?: Language[]
}

export interface DeprecatedVariant<T extends SvelteComponent> {
  name?: string
  description?: string
  viewports?: Viewport[]
  languages?: Language[]
  props?: ComponentProps<T>
  contexts?: MockedContext[]
  /** only the 'default' slot is supported */
  slots?: Record<string, string | any>
  tests?: {
    /** skips default snapshot test, but not additional tests */
    skip?: boolean
    /** each additional test will take viewports into account and run once per applicable viewport but will not take languages into account */
    additional?: Record<string, Test>
    /** When running Playwright screenshot tests, wait until there are no network operations for at least 500ms, discouraged except when needing to test hydrated views. Defaults to `false`. */
    clientSideRendered?: boolean
  }
}

type Test = ({
  page,
  expect,
  filepathWithoutExtension,
  name,
}: {
  page: Page
  expect: Expect<any>
  filepathWithoutExtension: string
  name: string
}) => Promise<void>

export interface MockedContext {
  key: any
  context: any
}

export interface Folder {
  name: string
  url: string
  depth: number
  folders?: Folder[]
  pages?: GroupedPage[]
}

interface PageMetadata {
  path: string // allows adding easy link to Github
  url: string // used as the key in GroupedPageMap
  name: string
}

export type UngroupedPage<T> = PageMetadata & {
  ext: string
  load: LoadFunctions<T>
}

export type GroupedPage = PageMetadata & {
  extensions: string[]
  loadMarkdown?: LoadFunctions<MarkdownModule>
  loadComponent?: LoadFunctions<{ default: typeof SvelteComponent }>
  loadCompositions?: Record<string, LoadFunctions<CompositionModule>>
  loadVariants?: LoadFunctions<VariantsModule>
}
export type GroupedPageMap = Record<string, GroupedPage>

interface LoadFunctions<T> {
  loadModule: () => Promise<T>
  loadRaw: RawModule
}

export type Modules = Record<string, Module>
export type RawModules = Record<string, RawModule>
type Module = () => Promise<Record<string, any>>
type RawModule = () => Promise<string>

export interface MarkdownModule {
  html: string
}

export interface MarkdownWithCompositionsModule {
  sections: (HTMLSection | CompositionSection)[]
}

interface HTMLSection {
  html: string
  compositionName?: never // type guard
}

interface CompositionSection {
  compositionName: string
  html?: never // type guard
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

export type DeprecatedCompositionModule = Omit<CompositionModule, 'config'> & CompositionConfig

export interface LoadedModules {
  markdown?: MarkdownModule
  markdownRaw?: string
  component?: typeof SvelteComponent
  componentRaw?: string
  variantsModule?: VariantsModule
  variantsRaw?: string
  compositionsModules?: Record<string, CompositionModule>
  compositionsRaw?: Record<string, string>
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
  addLanguageToUrl?: ({ code, url }: { code: string, url: string }) => string
  /** `false` by default */
  expandTree?: boolean
  githubURL?: string
  viewer?: ViewerOptions
  /** `src/routes` by default - if you have changed the default SvelteKit routes directory, you must specify it here also */
  routesDirectory?: string
  /**
   * `/kitbook` by default
   *
   * Pass an empty string `""` to indicate the root `/` route
   */
  kitbookRoute?: string
  /** Experimental: API is still unstable and implementation is just being started */
  darkMode?: true
  /** Don't use this - Kitbook automatically calculates it by running your addLanguageToUrl function (if it exists) on your kitbookRoute. */
  _languageInsertedKitbookRoute?: string
}

export interface Viewport {
  name?: string
  width: number
  height: number
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

export interface ViewerOptions {
  /**
   * define a key combo to toggle inspector,
   * @default 'alt-shift' - you might consider this 'option-shift' on mac but it's the same thing
   *
   * any number of modifiers `control` `shift` `alt` `meta` followed by zero or one regular key, separated by -
   * examples: control-shift, control-o, control-alt-s  meta-x control-meta
   * Some keys have native behavior (e.g. alt-s opens history menu on firefox).
   * To avoid conflicts or accidentally typing into inputs, modifier only combinations are recommended.
   */
  toggleKeyCombo?: string

  /**
   * inspector is automatically disabled when releasing toggleKeyCombo after holding it for a longpress
   * @default true
   */
  holdMode?: boolean

  /**
   * when to show the toggle button
   * @default 'always'
   */
  showToggleButton?: 'always' | 'active'

  /**
   * Tells Kitbook how to open the tools window. `document-picture-in-picture` will fallback to `popup` if it's not supported by your browser
   * @default 'document-picture-in-picture'
   */
  openToolsIn?: 'document-picture-in-picture' | 'popup'

  /**
   * internal options that are automatically set, not to be set or used by users
   */
  __internal?: {
    /** empty string by default */
    viteBase: string
  }
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
}

export interface RPCFunctions {
  svelte_modules: () => Promise<SvelteModules>
  open_or_create_variant: ({ filepath, props }: { filepath: string, props: Record<string, any> }) => void
  open_or_create_file: ({ filepath, template }: { filepath: string, template: string }) => void
  // notifications
  module_updated: (filepath: string) => void
  open_in_editor: (url: string) => void
}

export type SvelteModules = Record<string, SvelteModule>

export interface SvelteModule {
  is_route?: boolean
  // src_based_path: string
  parents: string[]
  children: string[]
}
