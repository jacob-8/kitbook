import { makeComment, splitResultsByTest } from './makeComment'

const results = 'kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Mobile-chromium/routes/(app)/+page/Second-Mobile-actual.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Mobile-chromium/routes/(app)/+page/Second-Mobile-diff.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Mobile-chromium/routes/(app)/+page/Second-Mobile-expected.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Tablet-chromium/routes/(app)/+page/Second-Tablet-actual.png'

describe(makeComment, () => {
  const comment = makeComment({ uploadResults: results, prNumber: '30', bucketName: 'component-snapshots', projectName: 'kitbook-template' })
  test('basic', () => {
    expect(comment).toMatchFileSnapshot('./makeComment.snap.md')
  })
})

test(splitResultsByTest, () => {
  expect(splitResultsByTest(results)).toMatchInlineSnapshot(`
    {
      "Second-Mobile": {
        "imageUrls": {
          "actual": "kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Mobile-chromium/routes/(app)/+page/Second-Mobile-actual.png",
          "diff": "kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Mobile-chromium/routes/(app)/+page/Second-Mobile-diff.png",
          "expected": "kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Mobile-chromium/routes/(app)/+page/Second-Mobile-expected.png",
        },
        "path": "routes/(app)/+page",
        "testName": "Second-Mobile",
      },
      "Second-Tablet": {
        "imageUrls": {
          "actual": "kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Tablet-chromium/routes/(app)/+page/Second-Tablet-actual.png",
        },
        "path": "routes/(app)/+page",
        "testName": "Second-Tablet",
      },
    }
  `)
})
