import type { CompositionConfig } from './kitbook-types'

// Types

export type { KitbookSettings, Language, ViewerOptions, Viewport, Folder, Modules, DeprecatedVariant, Variant, DataVariant, VariantMeta, GroupedPage, GroupedPageMap, LoadedModules, UngroupedPage, VariantsModule, CompositionModule, MarkdownModule, CompositionConfig, DeepPartial, RPCFunctions, SvelteModule, SvelteModules } from './kitbook-types'

// Routes

export { layoutLoad } from './routes/layoutLoad'
export { groupColocatedModulesIntoPages } from './modules/parseModules/groupColocatedModulesIntoPages'
export { pagesStore } from './modules/hmrUpdatedModules'

export { default as MainPage } from './routes/[...file]/MainPage.svelte'
export { mainPageLoad } from './routes/[...file]/mainPageLoad'

export { default as SandboxPage } from './routes/sandbox/[...file]/SandboxPage.svelte'
export { sandboxPageLoad } from './routes/sandbox/[...file]/sandboxPageLoad'

export { default as ToolsPage } from './routes/tools/ToolsPage.svelte'

// Helpers

export { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from './lz/lz-string'

export function delay<T>(value: T, delay_ms = 1000): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(value), delay_ms))
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export function defineComposition(config: CompositionConfig): CompositionConfig {
  return config
}
