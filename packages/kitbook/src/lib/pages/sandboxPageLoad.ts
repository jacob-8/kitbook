// import { decompressFromEncodedURIComponent as decode } from '../lz/lz-string'
import type { SvelteComponent } from 'svelte'
import type { CompositionModule, GroupedPage, VariantsModule } from '../kitbook-types'
import type { LayoutLoadResult } from '../layout/layoutLoad'

// export interface SandboxPageLoadResult<T extends SvelteComponent> {
export interface SandboxPageLoadResult {
  page: GroupedPage
  pageKey: string

  compositionName?: string
  compositionModule?: CompositionModule

  variantName?: string
  variantsModule?: VariantsModule
  component?: typeof SvelteComponent

  darkMode: boolean
  // editedProps?: Record<string, any>
}

export async function sandboxPageLoad({ params, parent, url }) {
  const { pages } = await parent() as LayoutLoadResult
  const pageKey = `/${params?.file}` || ''
  const page = pages[pageKey]

  const compositionName = url.searchParams.get('compositionName') as string
  const variantName = url.searchParams.get('variantName') as string
  const darkMode = url.searchParams.get('darkMode') === 'true'

  if (compositionName) {
    const compositionModule = (await page.loadCompositions[compositionName].loadModule())
    return { page, pageKey, compositionModule, compositionName, darkMode } satisfies SandboxPageLoadResult
  }

  if (variantName) {
    const component = (await page.loadComponent.loadModule()).default
    const variantsModule = (await page.loadVariants.loadModule())
    // caution, this page prop name is confusing with SvelteKit's $page store
    return { page, pageKey, component, variantsModule, variantName, darkMode } satisfies SandboxPageLoadResult
  }

  // const editedProps: Record<string, any> = JSON.parse(decode(url.searchParams.get('props')) || null)
}
