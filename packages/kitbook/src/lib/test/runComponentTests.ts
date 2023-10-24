/* eslint-disable node/prefer-global/process */
import type { Expect, test as playwrightTest } from '@playwright/test'
import type { KitbookSettings, VariantsModule } from '../kitbook-types'
import { preparePath } from './preparePath'

export function runComponentTests({
  test,
  expect,
  kitbookConfig,
  variantModules,
}: {
  test: typeof playwrightTest
  expect: Expect
  kitbookConfig: KitbookSettings
  variantModules: [string, VariantsModule][]
}) {
  const { kitbookRoute, viewports: projectViewports } = kitbookConfig

  for (const [path, { variants, viewports: fileViewports }] of variantModules) {
    variants.forEach((variant, index) => {
      for (const { name: viewportName, width, height } of variant.viewports || fileViewports || projectViewports) {
        const { directory, filenameWithoutExtension, url } = preparePath({ kitbookRoute, path, index })
        const viewportIdentifier = viewportName || `${width}x${height}`
        const testName = `${directory}/${filenameWithoutExtension}/${variant.name || index.toString()}-${viewportIdentifier}`
        test(testName, async ({ page }) => {
          await page.setViewportSize({ width, height })
          await page.goto(url)
          await page.waitForLoadState('networkidle') // TODO: remove once local styles are able to load down with SSR. This is only needed when snapshotting locally as local dev SSR styles don't come down. SSR is fine when snapshotting a built version as is done in GitHub actions off of a Vercel preview url.
          await expect(page).toHaveScreenshot([`${testName}.png`])
        })

        if (variant.tests) {
          for (const [additionalName, additionalTest] of Object.entries(variant.tests)) {
            const name = `${testName}-${additionalName}`
            test(name, async ({ page }) => {
              await page.setViewportSize({ width, height })
              await page.goto(url)
              await additionalTest({
                page,
                expect,
                filepathWithoutExtension: `${directory}/${filenameWithoutExtension}`,
                name,
              })
            })
          }
        }
      }
    })
  }
}
