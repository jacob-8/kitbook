import type { GroupedPage, LoadedModules } from 'kitbook'
import type { LayoutLoadResult } from '../layout/layoutLoad'

export interface MainPageLoadResult {
  loadedModules: LoadedModules
  page?: GroupedPage
  pageKey?: string
  error?: string
}

export async function mainPageLoad({ params, parent }): Promise<MainPageLoadResult> {
  const loadedModules: LoadedModules = {}
  const { pages } = await parent() as LayoutLoadResult
  if (!pages)
    return { error: 'No pages found. Kitbook is not setup properly.', loadedModules }
  const pageKey = parsePageKey(params?.file)
  const page = pages[pageKey]

  if (page) {
    if (page.loadSvx) {
      loadedModules.svx = (await page.loadSvx.loadModule())?.default
      loadedModules.svxRaw = await page.loadSvx.loadRaw()
    }
    if (page.loadComponent) {
      loadedModules.component = (await page.loadComponent.loadModule())?.default
      loadedModules.componentRaw = await page.loadComponent.loadRaw()
    }
    if (page.loadVariants) {
      loadedModules.variantsModule = (await page.loadVariants.loadModule())
      loadedModules.variantsRaw = await page.loadVariants.loadRaw()
    }
    if (page.loadCompositions) {
      loadedModules.compositionsModules = {}
      loadedModules.compositionsRaw = {}
      for (const compositionName in page.loadCompositions) {
        loadedModules.compositionsModules[compositionName] = (await page.loadCompositions[compositionName].loadModule())
        loadedModules.compositionsRaw[compositionName] = await page.loadCompositions[compositionName].loadRaw()
      }
    }
    return { page, pageKey, loadedModules }
  }

  const indexPage = pages['/index']
  if (indexPage) {
    loadedModules.svx = (await indexPage.loadSvx.loadModule())?.default
    loadedModules.svxRaw = await indexPage.loadSvx.loadRaw()
    return { page: indexPage, pageKey: '/index', loadedModules }
  }

  const readmePage = pages['/README']
  if (readmePage) {
    try {
      loadedModules.svx = (await readmePage.loadSvx.loadModule())?.default
      loadedModules.svxRaw = await readmePage.loadSvx.loadRaw()
      return { page: readmePage, pageKey: '/README', loadedModules }
    }
    catch (e) {
      return {
        error: `Displaying your project README.md as the Kitbook homepage will only work if you allow the Vite server to access one level up from project root (/src) by setting "server.fs.allow = ['..']" in your Vite config. You must have changed the Kitbook default. See https://vitejs.dev/config/#server-fs-allow for more info. // ERROR: ${e}`,
        loadedModules,
      }
    }
  }

  return { error: 'No modules found for this route. By default Kitbook will try to display your project README.md file as the home page if no src/index.md file exists.', loadedModules }
}

function parsePageKey(input: string) {
  return `/${input || ''}`
}

if (import.meta.vitest) {
  describe(parsePageKey, () => {
    test('adds slash before found param', () => {
      expect(parsePageKey('docs/1-get-started')).toEqual('/docs/1-get-started')
    })
    test('handles undefined with just a slash', () => {
      expect(parsePageKey(null)).toEqual('/')
    })
  })
}
