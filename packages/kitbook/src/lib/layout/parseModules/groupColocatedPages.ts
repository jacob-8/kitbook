import type { SvelteComponent } from 'svelte'
import type { CompositionModule, GroupedPage, GroupedPageMap, MarkdownModule, UngroupedPage, VariantsModule } from '../../kitbook-types'
import { testModules } from './testModules'
import { parseModulesIntoUngroupedPages } from './parseModulesIntoUngroupedPages'
import { convertDeprecatedCompositionToCurrentApi, convertDeprecatedVariantsToCurrentApi } from './convertDeprecatedToCurrentApi'

export function groupColocatedPages(ungrouped: UngroupedPage<MarkdownModule | { default: typeof SvelteComponent } | VariantsModule | CompositionModule>[] = [], extensions = { md: ['md'], variants: 'variants.ts', compositions: 'composition' }): GroupedPageMap {
  const allowedExtensions = [...extensions.md, extensions.variants, 'svelte']
  const grouped: GroupedPageMap = {}

  for (const page of sortPageAndLayoutPagesWithPlusFirst(ungrouped)) {
    const url = convertUnderscorePrefixToPlus(page.url)

    if (!allowedExtensions.includes(page.ext) && !page.ext.endsWith(extensions.compositions))
      continue

    if (!grouped[url])
      grouped[url] = { name: page.name, url, path: page.path, extensions: [page.ext] }
    else
      grouped[url].extensions.push(page.ext)

    if (extensions.md.includes(page.ext)) {
      grouped[url].loadMarkdown = loadModuleObject(page) as GroupedPage['loadMarkdown']
    } else if (page.ext === 'svelte') {
      grouped[url].loadComponent = loadModuleObject(page) as GroupedPage['loadComponent']
    } else if (page.ext === extensions.variants) {
      grouped[url].loadVariants = loadVariantsModuleObject(page as UngroupedPage<VariantsModule>) as GroupedPage['loadVariants']
    } else if (page.ext.endsWith(extensions.compositions)) {
      const compositionName = page.ext === extensions.compositions ? 'default' : page.ext.split('.')[0]
      grouped[url].loadCompositions = {
        ...grouped[url].loadCompositions,
        [compositionName]: loadCompositionModuleObject(page as UngroupedPage<CompositionModule>),
      } as GroupedPage['loadCompositions']
    }
  }

  return grouped
}

if (import.meta.vitest) {
  test('groupColocatedPages properly groups ungrouped pages', () => {
    const ungroupedPages = parseModulesIntoUngroupedPages(testModules, testModules)
    expect(groupColocatedPages(ungroupedPages)).toMatchFileSnapshot('./groupColocatedPages.snap')
  })
}

/** Groups _page/_layout Kitbook modules with +page/+layout modules */
function convertUnderscorePrefixToPlus(s: string): string {
  return s.replace('_page', '+page').replace('_layout', '+layout')
}

function loadModuleObject<T>(page: UngroupedPage<T>) {
  return {
    loadModule: page.load.loadModule,
    loadRaw: page.load.loadRaw,
  }
}

function loadVariantsModuleObject(page: UngroupedPage<VariantsModule>) {
  return {
    loadModule: async () => convertDeprecatedVariantsToCurrentApi(await page.load.loadModule()),
    loadRaw: page.load.loadRaw,
  }
}

function loadCompositionModuleObject(page: UngroupedPage<CompositionModule>) {
  return {
    loadModule: async () => convertDeprecatedCompositionToCurrentApi(await page.load.loadModule()),
    loadRaw: page.load.loadRaw,
  }
}

function sortPageAndLayoutPagesWithPlusFirst<T>(pages: UngroupedPage<T>[] = []): UngroupedPage<T>[] {
  return pages.sort(({ url: urlA }, { url: urlB }) => {
    return urlA < urlB ? -1 : urlA > urlB ? 1 : 0
  })
}

// if (import.meta.vitest) {
//   test('sortPageAndLayoutPagesWithPlusFirst moves + ahead of _ without affecting other components', () => {
//     const pages = ['_MyComponent', '_page@', '+page@', '_layout', '+layout', 'AnotherRegularComponent'].map((p) => {
//       return {
//         url: p,
//       }
//     }) as UngroupedPage<any>[]
//     expect(sortPageAndLayoutPagesWithPlusFirst(pages)).toMatchInlineSnapshot()
//   })
// }
