import type { GroupedPageMap, Modules, RawModules } from '../../kitbook-types'
import { groupColocatedPages } from './groupColocatedPages'
import { parseModulesIntoUngroupedPages } from './parseModulesIntoUngroupedPages'
import { testModules } from './testModules'

export function groupColocatedModulesIntoPages({
  components,
  componentsRaw,
  variants,
  variantsRaw,
  compositions,
  compositionsRaw,
  markdown,
  markdownRaw,
}: {
  components: Record<string, unknown>
  componentsRaw: RawModules
  variants: Record<string, unknown>
  variantsRaw: RawModules
  compositions: Record<string, unknown>
  compositionsRaw: RawModules
  markdown: Record<string, unknown>
  markdownRaw: RawModules
}): GroupedPageMap {
  // Presently we are not using the distinctions, but this is set up to give flexibility in the future to allow users to choose their own extensions in their import.meta.glob patterns
  const modules = { ...markdown, ...components, ...variants, ...compositions } as Modules
  const rawModules: RawModules = { ...componentsRaw, ...variantsRaw, ...compositionsRaw, ...markdownRaw }
  const ungroupedPages = parseModulesIntoUngroupedPages(modules, rawModules)
  return groupColocatedPages(ungroupedPages)
}

if (import.meta.vitest) {
  // this test is redundant with the one in groupColocatedPages.ts but it's here to make sure that the two functions work together (would be good to figure out how to remove it)
  test(groupColocatedModulesIntoPages, () => {
    // @ts-expect-error - have not yet split out
    expect(groupColocatedModulesIntoPages({ components: testModules, componentsRaw: testModules })).toMatchFileSnapshot('./groupColocatedModulesIntoPages.snap')
  })
}
