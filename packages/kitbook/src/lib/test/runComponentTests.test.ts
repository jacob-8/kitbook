import type { KitbookSettings, VariantsModule } from '../kitbook-types'
import { type VariantToRun, prepareVariantsToRun } from './runComponentTests'

const oneViewport = [{ width: 100, height: 100 }]
const undefinedLanguage = [{ code: null, name: null }]

const variantModuleWithOneBoringVariant: [string, VariantsModule] = [
  '...src/lib/Foo.variants.ts',
  { No_Props: { } },
]

describe(prepareVariantsToRun, () => {
  describe('two project languages', () => {
    const twoLanguages = [
      { code: 'en', name: 'English' },
      { code: 'fr', name: 'French' },
    ]
    const [firstLanguage] = twoLanguages
    const twoLanguageKitbookConfig = { viewports: oneViewport, languages: twoLanguages } as KitbookSettings

    const expected: VariantToRun = {
      filepathWithoutExtension: 'lib/Foo',
      viewports: oneViewport,
      languages: twoLanguages,
      variantName: 'lib/Foo/No_Props',
      url: '/kitbook/sandbox/lib/Foo?variantName=No_Props',
    }

    test('standard', () => {
      expect(prepareVariantsToRun({
        kitbookConfig: twoLanguageKitbookConfig,
        variantModules: [variantModuleWithOneBoringVariant],
      })).toEqual([expected])
    })

    test('one variant modules language', () => {
      const variantModuleWithOneLanguage: [string, VariantsModule] = ['...src/lib/Foo.variants.ts', {
        No_Props: { _meta: { languages: [firstLanguage] } },
      }]

      expect(prepareVariantsToRun({
        kitbookConfig: twoLanguageKitbookConfig,
        variantModules: [variantModuleWithOneLanguage],
      })).toEqual([{ ...expected, languages: [firstLanguage] }])
    })

    test('empty language array in variant shared_meta', () => {
      const variantModuleWithEmptyLanguageArray: [string, VariantsModule] = ['...src/lib/Foo.variants.ts', {
        shared_meta: { languages: [] },
        No_Props: { },
      }]

      expect(prepareVariantsToRun({
        kitbookConfig: twoLanguageKitbookConfig,
        variantModules: [variantModuleWithEmptyLanguageArray],
      })).toEqual([{ ...expected, languages: [firstLanguage] }])
    })

    test('empty language array in variant', () => {
      const variantModuleWithEmptyLanguageArray: [string, VariantsModule] = ['...src/lib/Foo.variants.ts', {
        No_Props: { _meta: { languages: [] } },
      }]

      expect(prepareVariantsToRun({
        kitbookConfig: twoLanguageKitbookConfig,
        variantModules: [variantModuleWithEmptyLanguageArray],
      })).toEqual([{ ...expected, languages: [firstLanguage] }])
    })
  })

  test('root route', () => {
    expect(prepareVariantsToRun({
      kitbookConfig: { viewports: oneViewport, languages: undefinedLanguage, kitbookRoute: '' } as KitbookSettings,
      variantModules: [variantModuleWithOneBoringVariant],
    })).toEqual([{
      filepathWithoutExtension: 'lib/Foo',
      viewports: oneViewport,
      languages: undefinedLanguage,
      variantName: 'lib/Foo/No_Props',
      url: '/sandbox/lib/Foo?variantName=No_Props',
    }])
  })

  test('skipped test', () => {
    expect(prepareVariantsToRun({
      kitbookConfig: { viewports: oneViewport, languages: undefinedLanguage, kitbookRoute: '' } as KitbookSettings,
      variantModules: [[
        '...src/lib/Foo.variants.ts',
        { No_Props: { _meta: { tests: { skip: true } } } },
      ]],
    })).toEqual([{
      filepathWithoutExtension: 'lib/Foo',
      viewports: oneViewport,
      languages: undefinedLanguage,
      variantName: 'lib/Foo/No_Props',
      url: '/sandbox/lib/Foo?variantName=No_Props',
      userAdded: { skip: true },
    }])
  })

  test('different viewports defined in variants and variant names', () => {
    const kitbookConfig = {
      viewports: oneViewport,
      languages: undefinedLanguage,
    } as KitbookSettings

    const twoViewports = [
      { width: 200, height: 200 },
      { width: 500, height: 500 },
    ]
    const variantModules: [string, VariantsModule][] = [
      ['...src/lib/Foo.variants.ts', {
        One_Viewport: { _meta: { viewports: oneViewport } },
        Two_Viewports: { _meta: { viewports: twoViewports } },
      }],
    ] as [string, VariantsModule][]

    expect(prepareVariantsToRun({ kitbookConfig, variantModules })).toEqual(
      [
        {
          filepathWithoutExtension: 'lib/Foo',
          languages: undefinedLanguage,
          url: '/kitbook/sandbox/lib/Foo?variantName=One_Viewport',
          variantName: 'lib/Foo/One_Viewport',
          viewports: oneViewport,
        },
        {
          filepathWithoutExtension: 'lib/Foo',
          languages: undefinedLanguage,
          url: '/kitbook/sandbox/lib/Foo?variantName=Two_Viewports',
          variantName: 'lib/Foo/Two_Viewports',
          viewports: twoViewports,
        },
      ],
    )
  })
})
