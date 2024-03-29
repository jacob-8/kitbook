export function makeComment({
  uploadResults,
  prNumber,
  bucketName,
  projectName,
  deploymentUrl,
  kitbookRoute,
}: {
  uploadResults: string
  prNumber: string
  bucketName: string
  projectName: string
  deploymentUrl: string
  kitbookRoute: string
}) {
  const bucket = `https://storage.googleapis.com/${bucketName}`
  const playwrightReportUrl = `${bucket}/${projectName}/pr/${prNumber}/playwright-report/index.html`
  const testResults = splitResultsByTest(uploadResults)

  let comment = `<p><a href="https://kitbook.vercel.app/">
<img src="https://storage.googleapis.com/component-snapshots/kitbook-logo.svg" height="22"></a> <b>Visual Regression Report</b></p>`

  comment += `
<details><summary>${Object.keys(testResults).length} changed snapshots for ${projectName}</summary>
`

  comment += `
<div style="overflow-x: auto;">
  
| new | old | diff |
| - | - | - |`

  for (const { imageUrls: { actual, expected, diff }, path, testName } of Object.values(testResults)) {
    const link = formatUrl({ path, deploymentUrl, kitbookRoute })
    const actualImage = `![actual-img](${bucket}/${actual})`
    const expectedImage = expected ? `![expected-img](${bucket}/${expected})` : ''
    const diffImage = diff ? `![diff-img](${bucket}/${diff})` : ''

    comment += `
| [${path}](${link}) - ${testName} | | |
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

const trailingSlash = /\/$/

export function formatUrl({ path, deploymentUrl, kitbookRoute }: { path: string; deploymentUrl: string; kitbookRoute: string }) {
  if (!kitbookRoute || kitbookRoute === '/')
    return `${deploymentUrl.replace(trailingSlash, '')}/${path}`

  return `${deploymentUrl.replace(trailingSlash, '')}/${kitbookRoute.replace(trailingSlash, '')}/${path}`
}
