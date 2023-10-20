import type { GroupedPageMap, Modules, RawModules } from '../../kitbook-types'
import { groupColocatedPages } from './groupColocatedPages'
import { parseModulesIntoUngroupedPages } from './parseModulesIntoUngroupedPages'
import { testModules } from './testModules'

export function groupColocatedModulesIntoPages(modules: Modules, rawModules: RawModules): GroupedPageMap {
  const ungroupedPages = parseModulesIntoUngroupedPages(modules, rawModules)
  return groupColocatedPages(ungroupedPages)
}

if (import.meta.vitest) {
  // this test is redundant with the one in groupColocatedPages.ts but it's here to make sure that the two functions work together (would be good to figure out how to remove it)
  test(groupColocatedModulesIntoPages, () => {
    expect(groupColocatedModulesIntoPages(testModules, testModules)).toMatchFileSnapshot('./groupColocatedModulesIntoPages.snap')
  })
}
