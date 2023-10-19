import type { SvelteComponent } from 'svelte'
import type { GroupedPage, GroupedPageMap, UngroupedPage, VariantsModule } from '../../kitbook-types'
import { testModules } from './testModules'
import { parseModulesIntoUngroupedPages } from './parseModulesIntoUngroupedPages'

export function groupColocatedPages(ungrouped: UngroupedPage<{ default: typeof SvelteComponent } | VariantsModule>[] = [], extensions = { svx: ['md', 'svx'], variants: 'variants.ts', compositions: 'composition' }): GroupedPageMap {
  const allowedExtensions = [...extensions.svx, extensions.variants, 'svelte']
  const grouped: GroupedPageMap = {}

  for (const page of sortPageAndLayoutPagesWithPlusFirst(ungrouped)) {
    const url = convertUnderscorePrefixToPlus(page.url)

    if (!allowedExtensions.includes(page.ext) && !page.ext.endsWith(extensions.compositions))
      continue

    if (!grouped[url])
      grouped[url] = { name: page.name, url, path: page.path, extensions: [page.ext] }
    else
      grouped[url].extensions.push(page.ext)

    if (extensions.svx.includes(page.ext)) {
      grouped[url].loadSvx = loadModuleObject(page) as GroupedPage['loadSvx']
    }
    else if (page.ext === 'svelte') {
      grouped[url].loadComponent = loadModuleObject(page) as GroupedPage['loadComponent']
    }
    else if (page.ext === extensions.variants) {
      grouped[url].loadVariants = loadModuleObject(page) as GroupedPage['loadVariants']
    }
    else if (page.ext.endsWith(extensions.compositions)) {
      const compositionName = page.ext === extensions.compositions ? 'default' : page.ext.split('.')[0]
      grouped[url].loadCompositions = {
        ...grouped[url].loadCompositions,
        [compositionName]: loadModuleObject(page),
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

function isPageOrLayout(name: string): boolean {
  if (name.startsWith('+page'))
    return true
  if (name.startsWith('+layout'))
    return true // layouts are just pages, but with slot inheritance super-powers
  return false
}

if (import.meta.vitest) {
  test(isPageOrLayout, () => {
    expect(isPageOrLayout('+page')).toBeTruthy()
    expect(isPageOrLayout('+page@(app)')).toBeTruthy()
    expect(isPageOrLayout('_page')).toBeFalsy()
    expect(isPageOrLayout('+layout')).toBeTruthy()
    expect(isPageOrLayout('+layout@')).toBeTruthy()
    expect(isPageOrLayout('blue')).toBeFalsy()
  })
}

const STARTS_WITH_PAGE_OR_LAYOUT = /(\+|_)(page|layout).*/

function sortPageAndLayoutPagesWithPlusFirst<T>(pages: UngroupedPage<T>[] = []): UngroupedPage<T>[] {
  return pages.sort(({ name: nameA }, { name: nameB }) => {
    if (nameA.match(STARTS_WITH_PAGE_OR_LAYOUT) && nameB.match(STARTS_WITH_PAGE_OR_LAYOUT)) {
      if (nameA.startsWith('+') && nameB.startsWith('_'))
        return -1
      if (nameA.startsWith('_') && nameB.startsWith('+'))
        return 1
    }
    return 0
  })
}

if (import.meta.vitest) {
  test('sortPageAndLayoutPagesWithPlusFirst moves + ahead of _ without affecting other components', () => {
    const pages = ['_MyComponent', '_page@', '+page@', '_layout', '+layout', 'AnotherRegularComponent'].map((p) => {
      return {
        name: p,
      }
    }) as UngroupedPage<any>[]
    expect(sortPageAndLayoutPagesWithPlusFirst(pages)).toMatchInlineSnapshot(`
      [
        {
          "name": "_MyComponent",
        },
        {
          "name": "+page@",
        },
        {
          "name": "+layout",
        },
        {
          "name": "_page@",
        },
        {
          "name": "_layout",
        },
        {
          "name": "AnotherRegularComponent",
        },
      ]
    `)
  })
}
