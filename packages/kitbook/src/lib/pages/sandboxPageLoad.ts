// import { decompressFromEncodedURIComponent as decode } from '../lz/lz-string'
import type { GroupedPageMap, Variant } from '../kitbook-types'

export async function sandboxPageLoad({ params, parent, url }) {
  const { pages }: { pages: GroupedPageMap } = await parent()
  const pageKey = `/${params?.file}` || ''
  const page = pages[pageKey]

  const compositionName = url.searchParams.get('compositionName') as string
  const variantIndex = url.searchParams.get('variantIndex') as string // keep as string because it works as an index and doesn't give false negative on '0'

  if (compositionName) {
    const composition = (await page.loadCompositions[compositionName].loadModule()).default
    return { page, pageKey, composition, compositionName }
  }

  if (variantIndex) {
    const component = (await page.loadComponent.loadModule()).default
    const variant = (await page.loadVariants.loadModule()).variants[variantIndex] as Variant<any>
    return { page, pageKey, component, variant, variantIndex }
  }

  // const editedProps: Record<string, any> = JSON.parse(decode(url.searchParams.get('props')) || null)
}
