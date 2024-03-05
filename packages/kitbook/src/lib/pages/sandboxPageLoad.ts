// import { decompressFromEncodedURIComponent as decode } from '../lz/lz-string'
import type { SvelteComponent } from 'svelte'
import type { CompositionModule, GroupedPage, Variant } from '../kitbook-types'
import type { LayoutLoadResult } from '../layout/layoutLoad'

export interface SandboxPageLoadResult {
  page: GroupedPage
  pageKey: string

  compositionName?: string
  compositionModule?: CompositionModule

  variantIndex?: string
  component?: typeof SvelteComponent
  variant?: Variant<any>

  darkMode: boolean
  // editedProps?: Record<string, any>
}

export async function sandboxPageLoad({ params, parent, url }) {
  const { pages } = await parent() as LayoutLoadResult
  const pageKey = `/${params?.file}` || ''
  const page = pages[pageKey]

  const compositionName = url.searchParams.get('compositionName') as string
  const variantIndex = url.searchParams.get('variantIndex') as string // keep as string because it works as an index and doesn't give false negative on '0'
  const darkMode = url.searchParams.get('darkMode') === 'true'

  if (compositionName) {
    const compositionModule = (await page.loadCompositions[compositionName].loadModule())
    return { page, pageKey, compositionModule, compositionName, darkMode } satisfies SandboxPageLoadResult
  }

  if (variantIndex) {
    const component = (await page.loadComponent.loadModule()).default
    const variant = (await page.loadVariants.loadModule()).variants[variantIndex] as Variant<any>
    return { page, pageKey, component, variant, variantIndex, darkMode } satisfies SandboxPageLoadResult
  }

  // const editedProps: Record<string, any> = JSON.parse(decode(url.searchParams.get('props')) || null)
}
