import type { Expect, test as playwrightTest } from '@playwright/test'
import type { KitbookSettings, Variant, VariantsModule } from '../kitbook-types'
import { mergeUserSettingsWithDefaults } from '../plugins/vite/mergeUserSettingsWithDefaults.js'
import { preparePath } from './preparePath.js'

interface PlaywrightPieces {
  test: typeof playwrightTest
  expect: Expect<any>
}

interface KitbookPieces {
  kitbookConfig: KitbookSettings | Partial<KitbookSettings>
  variantModules: [string, VariantsModule][]
}

interface TestToRun {
  testName: string
  width: number
  height: number
  url: string
  filepathWithoutExtension: string
  additionalTests?: Variant<any>['tests']['additional']
  clientSideRendered?: boolean
}

export function runComponentTests({
  test,
  expect,
  kitbookConfig,
  variantModules,
}: PlaywrightPieces & KitbookPieces) {
  const settings = mergeUserSettingsWithDefaults(kitbookConfig)
  const testsToRun = prepareTestsToRun({ kitbookConfig: settings, variantModules })
  for (const testToRun of testsToRun) {
    runTest({ test, expect, ...testToRun })

    if (testToRun.additionalTests)
      runAdditionalTests({ test, expect, ...testToRun })
  }
}

export function prepareTestsToRun({ kitbookConfig, variantModules }: KitbookPieces): TestToRun[] {
  const { kitbookRoute, viewports: projectViewports, languages: projectLanguages, addLanguageToUrl } = kitbookConfig

  const tests: TestToRun[] = []

  for (const [path, { variants, viewports: fileViewports, languages: fileLanguages }] of variantModules) {
    variants.forEach((variant, index) => {
      const variantViewports = variant.viewports || fileViewports || projectViewports
      const variantLanguages = variant.languages || fileLanguages || projectLanguages

      for (const { name: viewportName, width, height } of variantViewports) {
        for (const language of variantLanguages) {
          const { directory, filenameWithoutExtension, url } = preparePath({ kitbookRoute, path, index, languageCode: language.code, addLanguageToUrl })

          const filepathWithoutExtension = `${directory}/${filenameWithoutExtension}`
          const variantNameWithSafeCharacters = variant.name?.replace(/[^a-z0-9]/gi, '_')
          const viewportIdentifier = viewportName || `${width}x${height}`
          const possibleLanguageSuffix = language.code ? `-${language.code}` : ''

          const testName = `${filepathWithoutExtension}/${variantNameWithSafeCharacters || index.toString()}-${viewportIdentifier}${possibleLanguageSuffix}`

          tests.push({ testName, width, height, url, filepathWithoutExtension, additionalTests: variant.tests?.additional, clientSideRendered: variant.tests?.clientSideRendered })
        }
      }
    })
  }

  return tests
}

function runTest({ test, expect, testName, width, height, url, clientSideRendered }: PlaywrightPieces & TestToRun) {
  test(testName, async ({ page }) => {
    await page.setViewportSize({ width, height })
    const waitUntil = clientSideRendered ? 'networkidle' : 'load'
    await page.goto(url, { waitUntil })
    await expect(page).toHaveScreenshot([`${testName}.png`])
  })
}

function runAdditionalTests({ test, expect, testName, width, height, url, filepathWithoutExtension, additionalTests }: PlaywrightPieces & TestToRun) {
  for (const [additionalName, additionalTest] of Object.entries(additionalTests)) {
    const name = `${testName}-${additionalName}`
    test(name, async ({ page }) => {
      await page.setViewportSize({ width, height })
      await page.goto(url)
      await additionalTest({
        page,
        expect,
        filepathWithoutExtension,
        name,
      })
    })
  }
}
