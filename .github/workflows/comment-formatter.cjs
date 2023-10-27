// @ts-check

/**
 * @param {object} params
 * @param {string} params.uploadResults
 * @param {string} params.prNumber
 */
function makeComment({ uploadResults, prNumber }) {
  const playwrightReportUrl = `https://storage.googleapis.com/component-snapshots/kitbook-template/pr/${prNumber}/playwright-report/index.html`

  let comment = '## Playwright Component Snapshots Report'

  comment += `
<details><summary><a href="${playwrightReportUrl}" target="_blank">Playwright Report</a></summary>
`

  const urls = uploadResults?.split(',') || []
  for (const url of urls) {
  /** @type {'actual' | 'diff' | 'expected'} */
    let type = 'actual'
    if (url.endsWith('-expected.png'))
      type = 'expected'
    else if (url.endsWith('-diff.png'))
      type = 'diff'

    comment += `
${type}:
(![diff-img](https://storage.googleapis.com/component-snapshots/${url}))
`
  }
  comment += `
</details>`

  return comment
}

module.exports = ({ uploadResults, prNumber }) => {
  return makeComment({ uploadResults, prNumber })
}

// const results = 'kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Mobile-chromium-retry1/routes/(app)/+page/Second-Mobile-actual.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Mobile-chromium-retry1/routes/(app)/+page/Second-Mobile-diff.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Mobile-chromium-retry1/routes/(app)/+page/Second-Mobile-expected.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Mobile-chromium-retry2/routes/(app)/+page/Second-Mobile-actual.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Mobile-chromium-retry2/routes/(app)/+page/Second-Mobile-diff.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Mobile-chromium-retry2/routes/(app)/+page/Second-Mobile-expected.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Mobile-chromium/routes/(app)/+page/Second-Mobile-actual.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Mobile-chromium/routes/(app)/+page/Second-Mobile-diff.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Mobile-chromium/routes/(app)/+page/Second-Mobile-expected.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Tablet-chromium-retry1/routes/(app)/+page/Second-Tablet-actual.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Tablet-chromium-retry1/routes/(app)/+page/Second-Tablet-diff.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Tablet-chromium-retry1/routes/(app)/+page/Second-Tablet-expected.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Tablet-chromium-retry2/routes/(app)/+page/Second-Tablet-actual.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Tablet-chromium-retry2/routes/(app)/+page/Second-Tablet-diff.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Tablet-chromium-retry2/routes/(app)/+page/Second-Tablet-expected.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Tablet-chromium/routes/(app)/+page/Second-Tablet-actual.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Tablet-chromium/routes/(app)/+page/Second-Tablet-diff.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Tablet-chromium/routes/(app)/+page/Second-Tablet-expected.png'
