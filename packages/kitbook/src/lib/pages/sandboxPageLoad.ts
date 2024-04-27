// import { decompressFromEncodedURIComponent as decode } from '../lz/lz-string'
import type { SvelteComponent } from 'svelte'
import type { CompositionModule, GroupedPage, VariantsModule } from '../kitbook-types'
import type { LayoutLoadResult } from '../layout/layoutLoad'
import { browser } from '$app/environment'

// export interface SandboxPageLoadResult<T extends SvelteComponent> {
export interface SandboxPageLoadResult {
  page: GroupedPage
  pageKey: string
  canMount: boolean

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
  const server = !browser

  if (compositionName) {
    const compositionModule = (await page.loadCompositions[compositionName].loadModule())
    const ssrFalse = compositionModule.config?.ssr === false
    const canMount = !(server && ssrFalse)
    return { page, pageKey, compositionModule, compositionName, darkMode, canMount } satisfies SandboxPageLoadResult
  }

  if (variantName) {
    const variantsModule = (await page.loadVariants.loadModule())
    const ssrFalse = variantsModule.shared_meta?.ssr === false
    const canMount = !(server && ssrFalse)

    const component = canMount ? (await page.loadComponent.loadModule())?.default : null
    // caution, this page prop name is confusing with SvelteKit's $page store
    return { page, pageKey, component, variantsModule, variantName, darkMode, canMount } satisfies SandboxPageLoadResult
  }

  // const editedProps: Record<string, any> = JSON.parse(decode(url.searchParams.get('props')) || null)
}
