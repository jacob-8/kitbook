import type { Expect, test as playwrightTest } from '@playwright/test'
import type { KitbookSettings, Language, VariantMeta, VariantsModule, Viewport } from '../kitbook-types'
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

export interface VariantToRun {
  variantName: string
  viewports: Viewport[]
  languages: Language[]
  url: string
  addLanguageToUrl?: KitbookSettings['addLanguageToUrl']
  filepathWithoutExtension: string
  userAdded?: VariantMeta['tests']
}

export function runComponentTests({
  test,
  expect,
  kitbookConfig,
  variantModules,
}: PlaywrightPieces & KitbookPieces) {
  const settings = mergeUserSettingsWithDefaults(kitbookConfig)
  const variantsToRun = prepareVariantsToRun({ kitbookConfig: settings, variantModules })
  for (const variantToRun of variantsToRun) {
    if (!variantToRun.userAdded?.skip)
      runTestsForVariant({ test, expect, ...variantToRun })

    if (variantToRun.userAdded?.additional)
      runAdditionalTests({ test, expect, ...variantToRun })
  }
}

export function prepareVariantsToRun({ kitbookConfig, variantModules }: KitbookPieces): VariantToRun[] {
  const { kitbookRoute, viewports: projectViewports, languages: projectLanguages, addLanguageToUrl } = kitbookConfig

  const variantsToRun: VariantToRun[] = []

  for (const [path, { shared_meta, ...variants }] of variantModules) {
    Object.entries(variants).forEach(([name, { _meta }]) => {
      const variantViewports = _meta?.viewports || shared_meta?.viewports || projectViewports
      const { directory, filenameWithoutExtension, url } = preparePath({ kitbookRoute, path, variantName: name })

      const filepathWithoutExtension = `${directory}/${filenameWithoutExtension}`
      const variantNameWithSafeCharacters = name?.replace(/[^a-z0-9]/gi, '_')

      const variantName = `${filepathWithoutExtension}/${variantNameWithSafeCharacters}`

      variantsToRun.push({
        variantName,
        viewports: variantViewports,
        languages: getLanguages({ variantLanguages: _meta?.languages, moduleLanguages: shared_meta?.languages, activeLanguages: projectLanguages }),
        url,
        addLanguageToUrl,
        filepathWithoutExtension,
        userAdded: _meta?.tests,
      })
    })
  }

  return variantsToRun
}

function getLanguages({ variantLanguages, moduleLanguages, activeLanguages: projectLanguages }: { variantLanguages: Language[]; moduleLanguages: Language[]; activeLanguages: Language[] }) {
  if (variantLanguages?.length === 0)
    return projectLanguages.slice(0, 1)
  if (moduleLanguages?.length === 0)
    return projectLanguages.slice(0, 1)
  return variantLanguages || moduleLanguages || projectLanguages
}

function runTestsForVariant({ test, expect, variantName, viewports, languages, url, addLanguageToUrl, userAdded }: PlaywrightPieces & VariantToRun) {
  test.describe(variantName, () => {
    const csr = !!userAdded?.clientSideRendered
    const waitUntil = csr ? 'networkidle' : 'load'
    test.use({ javaScriptEnabled: csr })

    for (const { name, width, height } of viewports) {
      const viewportName = name || `${width}x${height}`
      if (languages.length === 1 && !languages[0].code) {
        test(viewportName, async ({ page }) => {
          await page.setViewportSize({ width, height })
          await page.goto(url, { waitUntil })
          await expect(page).toHaveScreenshot([`${variantName}-${viewportName}.png`])
        })
      }
      else {
        test.describe(viewportName, () => {
          test.use({ viewport: { width, height } })
          for (const language of languages) {
            const urlWithLanguage = addLanguageToUrl({ url, code: language.code })
            test(language.name, async ({ page }) => {
              await page.goto(urlWithLanguage, { waitUntil })
              await expect(page).toHaveScreenshot([`${variantName}-${viewportName}-${language.code}.png`])
            })
          }
        })
      }
    }
  })
}

// ignores languages
function runAdditionalTests({ test, expect, variantName, viewports, url, filepathWithoutExtension, userAdded }: PlaywrightPieces & VariantToRun) {
  test.describe(variantName, () => {
    for (const [additionalName, additionalTest] of Object.entries(userAdded.additional)) {
      for (const { name, width, height } of viewports) {
        const viewportName = name || `${width}x${height}`
        const testName = `${additionalName}-${viewportName}`
        test(testName, async ({ page }) => {
          await page.setViewportSize({ width, height })
          await page.goto(url)
          await additionalTest({
            page,
            expect,
            filepathWithoutExtension,
            name: `${variantName}-${testName}`,
          })
        })
      }
    }
  })
}
