import type { SvelteComponent } from 'svelte'
import { decompressFromEncodedURIComponent as decode } from '../lz/lz-string'
import type { GroupedPage, LoadedModules, Variant } from '../kitbook-types'

export async function sandboxPageLoad({ params, parent, url }) {
  const { pages } = await parent()
  const pageKey = `/${params?.file}` || ''
  const page: GroupedPage = pages[pageKey]
  const loadedModules: LoadedModules = {}

  const storyId = url.searchParams.get('storyId') as string
  const variantIdx = url.searchParams.get('variantIdx')

  if (storyId)
    loadedModules.svx = (await page.loadSvx.loadModule() as any).default as typeof SvelteComponent
  else
    loadedModules.component = (await page.loadComponent.loadModule() as any).default as typeof SvelteComponent

  let variant: Variant<SvelteComponent>
  if (variantIdx)
    variant = (await page.loadVariants.loadModule()).variants[variantIdx] || {}

  const editedProps: Record<string, any> = JSON.parse(decode(url.searchParams.get('props')) || null)
  return { page, pageKey, loadedModules, storyId, variant, variantIdx, editedProps }
}
