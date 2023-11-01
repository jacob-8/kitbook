export function makeComment({ uploadResults, prNumber, bucketName, projectName }: { uploadResults: string; prNumber: string; bucketName: string; projectName: string }) {
  const bucket = `https://storage.googleapis.com/${bucketName}`
  const playwrightReportUrl = `${bucket}/${projectName}/pr/${prNumber}/playwright-report/index.html`
  const testResults = splitResultsByTest(uploadResults)

  let comment = `<a href="https://kitbook.vercel.app/">
<img src="https://raw.githubusercontent.com/jacob-8/kitbook/b96f77da81309a6ccd06693beb0f06ba8fdc0a2b/packages/kitbook/static/kitbook.svg" height="22"></a> <b>Visual Regression Report</b>`

  comment += `
<details><summary>${Object.keys(testResults).length} changed snapshots for ${projectName}</summary>
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
  </details>
  
  View detailed <a href="${playwrightReportUrl}" target="_blank">Playwright Report</a>`

  return comment
}

interface TestResult {
  path: string
  testName: string
  imageUrls: ImageUrls
}

interface ImageUrls {
  actual?: string
  diff?: string
  expected?: string
}

export function splitResultsByTest(results: string): Record<string, TestResult> {
  const testResult: Record<string, TestResult> = {}

  for (const result of results.split(',')) {
    const [, resultPath] = result.split('test-results/')
    const [, ...filepath] = resultPath.split('/')
    const [testNameAndType, ...reversedPath] = filepath.reverse()
    const path = reversedPath.reverse().join('/')

    const [type, ...reversedTestName] = testNameAndType
      .replace('.png', '')
      .split('-')
      .reverse() as ['actual' | 'expected' | 'diff', ...string[]]
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
