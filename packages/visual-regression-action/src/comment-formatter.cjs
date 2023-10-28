// @ts-check

/**
 * @param {object} params
 * @param {string} params.uploadResults
 * @param {string} params.prNumber
 * @param {string} params.bucketName
 */
function makeComment({ uploadResults, prNumber, bucketName }) {
  const bucket = `https://storage.googleapis.com/${bucketName}`
  const playwrightReportUrl = `${bucket}/kitbook-template/pr/${prNumber}/playwright-report/index.html`
  const testResults = splitResultsByTest(uploadResults)

  let comment = `<a href="https://kitbook.vercel.app/">
<img src="https://raw.githubusercontent.com/jacob-8/kitbook/b96f77da81309a6ccd06693beb0f06ba8fdc0a2b/packages/kitbook/static/kitbook.svg" height="20"></a> <b>Visual Regression Report</b>`

  comment += `
<details><summary>${Object.keys(testResults).length} changed snapshots (<a href="${playwrightReportUrl}" target="_blank">Playwright Report</a>)</summary>
`

  comment += `
<div style="overflow-x: auto;">
  
| new | old | diff |
| - | - | - |`

  for (const { imageUrls: { actual, expected, diff }, path, testName } of Object.values(testResults)) {
    const actualImage = `![actual-img](${bucket}/${actual})`
    const expectedImage = expected ? `![expected-img](${bucket}/${expected})` : ''
    const diffImage = diff ? `![diff-img](${bucket}/${diff})` : ''

    comment += `
| ${path} - ${testName} | | |
| ${actualImage} | ${expectedImage} | ${diffImage} |`
  }

  comment += `
</div>
`

  comment += `
  </details>`

  return comment
}

module.exports = ({ uploadResults, prNumber, bucketName }) => {
  return makeComment({ uploadResults, prNumber, bucketName })
}

/**
 * @typedef {object} TestResult
 * @property {string} path
 * @property {string} testName
 * @property {ImageUrls} imageUrls
 *
 * @typedef {object} ImageUrls
 * @property {string} [actual]
 * @property {string} [diff]
 * @property {string} [expected]
 */

/**
 * @param {string} results
 * @returns {Record<string, TestResult>}
 */
function splitResultsByTest(results) {
  /** @type {Record<string, TestResult>} */
  const testResult = {}

  for (const result of results.split(',')) {
    const [, resultPath] = result.split('test-results/')
    const [, ...filepath] = resultPath.split('/')
    const [testNameAndType, ...reversedPath] = filepath.reverse()
    const path = reversedPath.reverse().join('/')

    const [type, ...reversedTestName] = testNameAndType
      .replace('.png', '')
      .split('-')
      .reverse()
    const testName = reversedTestName.reverse().join('-')

    if (testResult[testName]) {
      testResult[testName].imageUrls[type] = result
    }
    else {
      testResult[testName] = {
        path,
        testName,
        imageUrls: {
          [type]: result,
        },
      }
    }
  }

  return testResult
}
