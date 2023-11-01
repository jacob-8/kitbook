import type { KitbookSettings, VariantsModule } from '../kitbook-types'
import { prepareTestsToRun } from './runComponentTests'

function addLanguageToUrl({ code, url }) {
  const [path, search] = url.split('?')
  const params = new URLSearchParams(search)
  params.set('lang', code)
  return `${path}?${params.toString()}`
}

const oneViewport = [{ width: 100, height: 100 }]
const undefinedLanguage = [{ code: null, name: null }]

const variantModuleWithOneBoringVariant: [string, VariantsModule] = [
  '...src/lib/Foo.variants.ts',
  { variants: [
    { props: { foo: 'no name, no viewports, no languages' } },
  ] },
]

describe(prepareTestsToRun, () => {
  describe('two project languages', () => {
    const twoLanguages = [
      { code: 'en', name: 'English' },
      { code: 'fr', name: 'French' },
    ]
    test('standard', () => {
      expect(prepareTestsToRun({
        kitbookConfig: { viewports: oneViewport, languages: twoLanguages, addLanguageToUrl } as KitbookSettings,
        variantModules: [variantModuleWithOneBoringVariant],
      })).toEqual([
        {
          filepathWithoutExtension: 'lib/Foo',
          height: 100,
          testName: 'lib/Foo/0-100x100-en',
          url: '/kitbook/sandbox/lib/Foo?variantIndex=0&lang=en',
          width: 100,
        },
        {
          filepathWithoutExtension: 'lib/Foo',
          height: 100,
          testName: 'lib/Foo/0-100x100-fr',
          url: '/kitbook/sandbox/lib/Foo?variantIndex=0&lang=fr',
          width: 100,
        },
      ])
    })

    test('one viewport language', () => {
      const variantModuleWithOneOneLanguage: [string, VariantsModule] = ['...src/lib/Foo.variants.ts', {
        languages: [{ code: 'en', name: 'English' }],
        variants: [{ props: { foo: 'no name, no viewports, no languages' } }],
      }]

      expect(prepareTestsToRun({
        kitbookConfig: { viewports: oneViewport, languages: twoLanguages, addLanguageToUrl } as KitbookSettings,
        variantModules: [variantModuleWithOneOneLanguage],
      })).toEqual([
        {
          filepathWithoutExtension: 'lib/Foo',
          height: 100,
          testName: 'lib/Foo/0-100x100-en',
          url: '/kitbook/sandbox/lib/Foo?variantIndex=0&lang=en',
          width: 100,
        },
      ])
    })
  })

  test('root route', () => {
    expect(prepareTestsToRun({
      kitbookConfig: { viewports: oneViewport, languages: undefinedLanguage, kitbookRoute: '' } as KitbookSettings,
      variantModules: [variantModuleWithOneBoringVariant],
    })).toEqual([{
      filepathWithoutExtension: 'lib/Foo',
      height: 100,
      testName: 'lib/Foo/0-100x100',
      url: '/sandbox/lib/Foo?variantIndex=0',
      width: 100,
    }])
  })

  test('works', () => {
    const kitbookConfig = {
      viewports: oneViewport,
      languages: undefinedLanguage,
    } as KitbookSettings

    const variantModules: [string, VariantsModule][] = [
      ['...src/lib/Foo.variants.ts', {
        variants: [
          {
            name: 'one named viewport',
            viewports: [{ name: 'mobile', width: 300, height: 600 }],
          },
          {
            name: 'two unnamed viewports',
            viewports: [
              { width: 200, height: 200 },
              { width: 500, height: 500 },
            ],
          },
          {
            props: { foo: 'no name, no viewports' },
          },
        ],
      }],
    ] as [string, VariantsModule][]

    expect(prepareTestsToRun({ kitbookConfig, variantModules })).toEqual(
      [
        {
          filepathWithoutExtension: 'lib/Foo',
          height: 600,
          testName: 'lib/Foo/one_named_viewport-mobile',
          url: '/kitbook/sandbox/lib/Foo?variantIndex=0',
          width: 300,
        },
        {
          filepathWithoutExtension: 'lib/Foo',
          height: 200,
          testName: 'lib/Foo/two_unnamed_viewports-200x200',
          url: '/kitbook/sandbox/lib/Foo?variantIndex=1',
          width: 200,
        },
        {
          filepathWithoutExtension: 'lib/Foo',
          height: 500,
          testName: 'lib/Foo/two_unnamed_viewports-500x500',
          url: '/kitbook/sandbox/lib/Foo?variantIndex=1',
          width: 500,
        },
        {
          filepathWithoutExtension: 'lib/Foo',
          height: 100,
          testName: 'lib/Foo/2-100x100',
          url: '/kitbook/sandbox/lib/Foo?variantIndex=2',
          width: 100,
        },
      ],
    )
  })
})
