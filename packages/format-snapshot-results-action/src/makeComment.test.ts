import { formatUrl, makeComment, splitResultsByTest } from './makeComment'

const mobileActual = 'kitbook-template/pr/30/test-results/kitbook-routes-app-page-First-Mobile-chromium/routes/(app)/+page/First-Mobile-actual.png'
const mobileDiff = 'kitbook-template/pr/30/test-results/kitbook-routes-app-page-First-Mobile-chromium/routes/(app)/+page/First-Mobile-diff.png'
const mobileExpected = 'kitbook-template/pr/30/test-results/kitbook-routes-app-page-First-Mobile-chromium/routes/(app)/+page/First-Mobile-expected.png'
const tabletActual = 'kitbook-template/pr/30/test-results/kitbook-routes-app-page-First-Tablet-chromium/routes/(app)/+page/First-Tablet-actual.png'
const results = [mobileActual, mobileDiff, mobileExpected, tabletActual].join(',')

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
      'First-Mobile': {
        imageUrls: {
          actual: mobileActual,
          diff: mobileDiff,
          expected: mobileExpected,
        },
        path: 'routes/(app)/+page',
        testName: 'First-Mobile',
      },
      'First-Tablet': {
        imageUrls: {
          actual: tabletActual,
        },
        path: 'routes/(app)/+page',
        testName: 'First-Tablet',
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
