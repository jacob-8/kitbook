# Visual Regression Testing

The simple [[3-component-variants|Variants]] format of Kitbook enables easy visual regression testing of all your components using [Playwright](https://playwright.dev/). 

## Install Playwright

```bash
pnpm install -D @playwright/test
```

## Create Snapshots Test File

This function will take your current version of [Playwright](https://playwright.dev/) and your ([[0-config|Kitbook config]]) to construct urls to each variant found in your `variants.ts` files. It snapshots each url for all your viewports (and [[8-i18n|languages]] if applicable). 

```ts title="e2e/kitbook.spec.ts"
import { clearSnapshots, getVariants, runComponentTests } from 'kitbook/test'
import { expect, test } from '@playwright/test'
import kitbookConfig from '../kitbook.config'

clearSnapshots()
const variantModules = await getVariants()
runComponentTests({ test, expect, kitbookConfig, variantModules })
```

## Add Playwright config

If you don't already use Playwright the following [config](https://playwright.dev/docs/test-configuration) will get you started. Locally it uses your current dev server if already running, and if not it will auto-start to Vite's default port, 5173. On CI it will use the deployment preview url as the base url for the tests run in a GitHub action if you setup an action as described below in [[7-visual-regression-testing#GitHub Action]].

```ts title="playwright.config.ts"
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: 'e2e',
  snapshotDir: 'e2e/snapshots',
  snapshotPathTemplate: '{snapshotDir}/{arg}-{projectName}-{platform}{ext}',
  fullyParallel: true,
  reporter: 'html',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5173',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm run dev',
    port: 5173,
    reuseExistingServer: true,
  },
})
```

## Add to .gitignore

```txt
playwright-report
test-results
```

## Add Test Command

This script will run playwright against all test files with "kitbook" in the name which will just pick up our component tests:

```txt title="package.json"
"test:components": "playwright test kitbook --update-snapshots",
```

Now you can run these commands and see the test results.

If you're already using Playwright for e2e tests you can incorporate the visual regression tests into your same test runs, or if you need to keep them separate because you have different settings you can always create a custom playwright config file and add the config flag to your script command above, e.g. `--config playwright.components.config.ts`.

You may also enjoy using the Playwright UI runner by adding the `--ui` flag to your script.

## Add Changed Snapshots as PR Comment

Next, setup a Google Cloud Storage bucket to store snapshots and add a GitHub action that will comment on your PR with changed snapshots on every push.

### Google Cloud Storage Bucket

[Create a new bucket](https://console.cloud.google.com/storage/create-bucket) using the standard storage class and uncheck `Enforce public access prevention on this bucket`. Then in your bucket go to the `Permissions` tab and add a new principal `allUsers` with the `Storage Object Viewer` role and save. This is described [here](https://cloud.google.com/storage/docs/access-control/making-data-public#buckets). 


Still in the Google Cloud Console, create a [service account](https://console.cloud.google.com/apis/credentials/serviceaccountkey) for your project with the `Storage Folder Admin` role. Then from that service account, create a service account key, download it as JSON, and store it as a secret in your GitHub repo using `GOOGLE_APPLICATION_CREDENTIALS` or something you consider more helpful. *It's recommended to remove all newlines from the key before pasting as a GitHub secret.*

### GitHub Action

**WORK IN PROGRESS**: This action only establishes the baseline but does not yet compare changed snapshots on PRs.

The following action will use your recently created storage bucket along with Vercel deployment urls to comment on your PR with changed snapshots. Note each of the places below where you need to update using your own details.

```yaml title=".github/workflows/component-tests.yml"
name: Component Visual Regression Tests

on:
  deployment_status

permissions:
  pull-requests: write

jobs:
  update-base-snapshots:
    name: Keep Base Component Snapshots In Sync with Main Branch
    if: github.event.deployment_status.state == 'success' &&  github.event.deployment_status.environment == 'Production' # CHECK: is this the right environment name?
    runs-on: ubuntu-latest
    timeout-minutes: 15
    container:
      image: mcr.microsoft.com/playwright:v1.39.0-jammy # CHECK: keep version in sync with installed Playwright package https://playwright.dev/docs/ci#github-actions-via-containers

    steps:
      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8.6.0

      - name: Install Dependencies
        run: pnpm install

      - name: Run Playwright Component tests
        run: pnpm test:components
        env:
          CI: true
          PLAYWRIGHT_BASE_URL: ${{ github.event.deployment_status.target_url }} # CHECK: This is for Vercel, make sure the right url is passed to `PLAYWRIGHT_BASE_URL` or you could also spin up a dev server.

      - name: Wipe base clean
        uses: actions-hub/gcloud@master
        env:
          PROJECT_ID: components-check # CHANGE to your Google Cloud project id
          APPLICATION_CREDENTIALS: ${{ secrets.GCS_COMPONENT_CHECK_BUCKETS_CREDENTIALS }} # CHANGE to your GitHub secret name
        with:
          args: storage rm gs://component-snapshots/kitbook/main/** --verbosity=critical # CHANGE to your bucket name and desired main snapshots path (we set verbosity to ignore errors emitted when nothing is found to delete)

      - name: Upload base images
        uses: actions-hub/gcloud@master
        env:
          PROJECT_ID: components-check # CHANGE to your Google Cloud project id
        with:
          args: storage cp --recursive ./e2e/snapshots gs://component-snapshots/kitbook/main/** # CHANGE the first part to your local snapshots folder and the second part to your bucket name and desired main snapshots path

      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

It's important to note that snapshots will look slightly different on each platform, particularly because of font rendering differences, so we just use the ones created in a Linux CI environment for comparisons.

**Great!** You've set up an essentially free visual regression testing system for your components!

## Further Tips

### Skip Files

If you need to pass a Svelte component into a variant as a prop, you'll need to skip taking screenshots for that variants file as Playwright will choke when trying to import the Svelte file. You can pass an array of `skipFiles` (without extensions) like this:

```ts title="e2e/kitbook.spec.ts" {5-7,10}
import { expect, test } from '@playwright/test'
import { clearSnapshots, getVariants, runComponentTests } from 'kitbook/test'
import kitbookConfig from '../kitbook.config'

const skipFiles = [
  '/routes/foo/+page',
  '/lib/ui/Button',
]

clearSnapshots()
const variantModules = await getVariants({ skipFiles })
runComponentTests({ test, expect, kitbookConfig, variantModules })
```

If you know a way to update Playwright's file parsing to handle imported Svelte files, please submit a PR. Or at least a way to ignore the Svelte file. That's not the data we need to run the tests. We only need file locations, variant names, viewports and languages.

### Turn off Vercel Comments

You may notice from time to time that the comment call-to-action button shows up in your snapshots. If you don't use Vercel comments, you can [turn off comments](https://vercel.com/docs/workflow-collaboration/comments/how-comments-work#at-the-account-level).

### Use $lib imports in variants

Sometimes its nice to use `$lib` imports when assembling your mock data for variants. You will need to specify your path aliases directly in your `tsconfig.json` and not the extended svelte config. Also add `baseUrl` [according to the Playwright docs](https://playwright.dev/docs/test-typescript#tsconfig-path-mapping):


```json title="tsconfig.json"
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    // ...
    "paths": {
      "$lib": [
        "./src/lib"
      ],
      "$lib/*": [
        "./src/lib/*"
      ]
    },
    "baseUrl": "."
  }
}
```

### Compositions (coming soon)

Screenshotting compositions is not yet supported but it will be added. In the meantime, if you read the source code used for variants you could probably set it up yourself. 


[//begin]: # "Autogenerated link references for markdown compatibility"
[3-component-variants|Variants]: 3-component-variants.md "Component Variants"
[0-config|Kitbook config]: 3-customizations/0-config.md "Kitbook Config"
[8-i18n|languages]: 8-i18n.md "i18n"
[7-visual-regression-testing#GitHub Action]: 7-visual-regression-testing.md "Visual Regression Testing"
[//end]: # "Autogenerated link references"