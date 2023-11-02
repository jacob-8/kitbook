import { formatUrl, makeComment, splitResultsByTest } from './makeComment'

const results = 'kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Mobile-chromium/routes/(app)/+page/Second-Mobile-actual.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Mobile-chromium/routes/(app)/+page/Second-Mobile-diff.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Mobile-chromium/routes/(app)/+page/Second-Mobile-expected.png,kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Tablet-chromium/routes/(app)/+page/Second-Tablet-actual.png'

describe(makeComment, () => {
  const comment = makeComment({
    uploadResults: results,
    prNumber: '30',
    bucketName: 'component-snapshots',
    projectName: 'kitbook-template',
    deploymentUrl: 'https://kitbook-template-git-visual-regression-comparison-polylingual.vercel.app',
    kitbookRoute: 'kitbook',
  })
  test('basic', () => {
    expect(comment).toMatchFileSnapshot('./makeComment.snap.md')
  })
})

test(splitResultsByTest, () => {
  expect(splitResultsByTest(results)).toEqual(
    {
      'Second-Mobile': {
        imageUrls: {
          actual: 'kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Mobile-chromium/routes/(app)/+page/Second-Mobile-actual.png',
          diff: 'kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Mobile-chromium/routes/(app)/+page/Second-Mobile-diff.png',
          expected: 'kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Mobile-chromium/routes/(app)/+page/Second-Mobile-expected.png',
        },
        path: 'routes/(app)/+page',
        testName: 'Second-Mobile',
      },
      'Second-Tablet': {
        imageUrls: {
          actual: 'kitbook-template/pr/30/test-results/kitbook-routes-app-page-Second-Tablet-chromium/routes/(app)/+page/Second-Tablet-actual.png',
        },
        path: 'routes/(app)/+page',
        testName: 'Second-Tablet',
      },
    },
  )
})

describe(formatUrl, () => {
  test('without trailing slashes', () => {
    expect(formatUrl({
      deploymentUrl: 'https://kitbook.vercel.app',
      kitbookRoute: 'kitbook',
      path: 'routes/+page',
    })).toEqual('https://kitbook.vercel.app/kitbook/routes/+page')
  })

  test('with trailing slashes', () => {
    expect(formatUrl({
      deploymentUrl: 'https://kitbook.vercel.app/',
      kitbookRoute: 'kitbook/',
      path: 'routes/+page',
    })).toEqual('https://kitbook.vercel.app/kitbook/routes/+page')
  })

  test('with root level kitbookRoute', () => {
    expect(formatUrl({
      deploymentUrl: 'https://kitbook.vercel.app/',
      kitbookRoute: '/',
      path: 'routes/+page',
    })).toEqual('https://kitbook.vercel.app/routes/+page')
  })

  test('with no kitbookRoute (indicates root level)', () => {
    expect(formatUrl({
      deploymentUrl: 'https://kitbook.vercel.app',
      kitbookRoute: '',
      path: 'routes/+page',
    })).toEqual('https://kitbook.vercel.app/routes/+page')
  })
})
