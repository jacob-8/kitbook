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
<details><summary>[Playwright Report](${playwrightReportUrl})</summary>
`

  // (![diff-img](https://storage.googleapis.com/component-snapshots/kitbook-template/branch/${prNumber}/image-paths))
  comment += `
${uploadResults}
`

  comment += `
</details>`

  return comment
}

module.exports = ({ uploadResults, prNumber }) => {
  return makeComment({ uploadResults, prNumber })
}

// ignore __-expected.png
// show __-actual.png
// link to __-diff.png
