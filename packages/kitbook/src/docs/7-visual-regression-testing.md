# Visual Regression Testing

The simple [[3-component-variants|Variants]] format of Kitbook enables easy visual regression testing of all your components using [Playwright](https://playwright.dev/). 

## Install Playwright

```bash
pnpm install -D @playwright/test
```

## Create Test File

This function will take your current version of playwright and your Kitbook config ([[0-config|read here for quick setup]]) and construct urls to each variant found in your `variants.ts` files. It snapshots each url for all desired viewports (and languages if applicable - coming soon). These snapshots live in your repo so all changes will show up in a pull request's `Files changed` section with convenient before/after previews. This will allow your pull requests to self-document the visual changes made to your components.

```ts title="e2e/kitbook.spec.ts"
import { clearSnapshots, getVariants, runComponentTests } from 'kitbook/test'
import { expect, test } from '@playwright/test'
import kitbookConfig from '../kitbook.config'

clearSnapshots()
const variantModules = await getVariants()
runComponentTests({ test, expect, kitbookConfig, variantModules })
```

If you need more customization over your tests, please just copy out the source code of that function as it's pretty easy to create your own test file from scratch.

## Add Playwright config

If you haven't read the basics of [Playwright's config documentation](https://playwright.dev/docs/test-configuration), I highly recommend you do that, but if you don't already use Playwright and just want a quickstart, the following will work. It will automatically use your current dev server if already running. If not it will auto-start to Vite's default port, 5173. Lastly it will use Vercel deployment preview urls as the base url for the tests run in a GitHub action if you setup an action as described in [[7-visual-regression-testing#Add GitHub Action]].

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

## Add Test Command

This script will run playwright against all test files with "kitbook" in the name which will just pick up our component tests:

```txt title="package.json"
"test:components": "playwright test kitbook --update-snapshots",
```

Now you can run these commands and see the test results.

If you're already using Playwright for e2e tests you can incorporate the visual regression tests into your same test runs, or if you need to keep them separate because you have different settings you can always create a custom playwright config file and add the config flag to your script command above, e.g. `--config playwright.components.config.ts`.

You may also enjoy using playwright UI runner by adding the `--ui` flag to your script.

## Add GitHub Action

I run my component testing against actual deployment previews so the following workflow will only work if you deploy to Vercel. But it's easy to adapt to other environments as all you need is the base url, or you can just start a dev server.

```yaml title=".github/workflows/component-tests.yml"
name: Playwright Component Tests

on:
  deployment_status

permissions:
  contents: write
  pull-requests: write

jobs:
  run-e2e:
    name: Playwright Component Tests
    if: github.event.deployment_status.state == 'success' && (github.event.deployment_status.environment == 'Production' || github.event.deployment_status.environment == 'Preview')
    runs-on: ubuntu-latest # can only run containers on Linux
    timeout-minutes: 15
    container:
      image: mcr.microsoft.com/playwright:v1.37.1-jammy # https://playwright.dev/docs/ci#github-actions-via-containers - keep version in sync with installed package

    steps:
      # use the ref to get the right branch
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
          ref: '${{ github.event.deployment_status.deployment.ref }}'

      # allow branch name extraction; allow updated images changed within a container to be committed
      # might be ok with --global instead of system, https://github.com/actions/checkout/issues/1169
      - run: git config --system --add safe.directory /__w/polylingual.dev/polylingual.dev

      # workaround to extract branch name in "deployment_status" actions
      - name: Extract branch name
        shell: bash # redundant here but needed in a Windows env
        run: echo "GITHUB_BRANCH=$(git show -s --pretty=%D HEAD | tr -s ',' '\n' | sed 's/^ //' | grep -e 'origin/' | head -1 | sed 's/\origin\///g')" >> $GITHUB_OUTPUT
        id: extract_branch

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
        run: pnpm test:components:update
        env:
          CI: true
          PLAYWRIGHT_BASE_URL: ${{ github.event.deployment_status.target_url }}

      - name: Commit Changed Component Snapshots
        uses: stefanzweifel/git-auto-commit-action@v4.16.0
        if: github.event.deployment_status.environment != 'Production'
        with:
          commit_message: '[Updated Component Snapshots]'
          branch: ${{ steps.extract_branch.outputs.GITHUB_BRANCH }} # only needed when triggered by deployment_status

      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

It's important to note that snapshots will look slightly different on each device, particularly because of font rendering differences, so just use the ones created in CI for your actual comparisons. Sometimes it is nice to render snapshots locally as well, but if you have team members I recommend you don't check those in to GitHub as each of you may be using different operating systems.

## Cleanup Stale Images

If you've made it this far, you're probably excited at the idea of free and unlimited visual regression testing results on every pull request in the form of image file changes. But your probably also worrying about bloating your repo size. The good news is that you can clean up the images that are no longer needed. The bad news is that I haven't written this part yet, but you could help by submitting a PR with a `.github/workflows/visual-regression-stale-cleanup.yml` of how to force delete the `e2e/snapshots` folder on a monthly or weekly basis from the repo history. 

Yes, that sounds a little sticky but so are the alternatives: a lifetime of subscriptions to image regression services or a lifetime of visual regression bugs. 

There is perhaps an even better option than the three above: uploading the image results to a storage bucket and then comparing against those on every PR, but it's a little more convoluted and we're trying to remove friction here. If this last option interests you , I've included two links for further Google Cloud research and a GitHub action step that lets a workflow write a comment to a PR with image links if that helps you go this direction. Please share your results as a pull request if you do.

- [Auth Google Cloud with google-github-actions/auth@v1](https://github.com/google-github-actions/auth/blob/main/README.md)
- [Upload to Google Cloud Storage GitHub action](https://github.com/google-github-actions/upload-cloud-storage) 

```yaml
- name: Add PR Comment with Snaphshots of Changed Components
  uses: actions/github-script@v6
  with:
    github-token: ${{secrets.GITHUB_TOKEN}}
    script: |
      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: `Changed components:
      (![diff-img](https://github.com/jacob-8/polylingual.dev/assets/7559478/04a1be65-cafd-48b1-9f9c-5c257b2d5fd8))
      (![diff-img](https://the-next-changed-url...))
      `
      })
```


---

You've now learned the features of Kitbook as far as they have been documented. As you document and prototype your components for each situation you need, you may run into questions as to how to accomplish something. Feel free to browse the Kitbook related files in any of the provided [[8-examples|repo examples]] where Kitbook in is use. You may find your answer there. If not, please [create an issue](https://github.com/jacob-8/kitbook/issues/new), and let's discuss how you could add a needed feature.

[//begin]: # "Autogenerated link references for markdown compatibility"
[3-component-variants|Variants]: 3-component-variants.md "Component Variants"
[0-config|read here for quick setup]: 3-customizations/0-config.md "Kitbook Config"
[7-visual-regression-testing#Add GitHub Action]: 7-visual-regression-testing.md "Visual Regression Testing"
[8-examples|repo examples]: 8-examples.md "Examples"
[//end]: # "Autogenerated link references"