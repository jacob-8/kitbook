import type { KitbookSettings, VariantsModule } from '../kitbook-types'
import { type VariantToRun, prepareVariantsToRun } from './runComponentTests'

const oneViewport = [{ width: 100, height: 100 }]
const undefinedLanguage = [{ code: null, name: null }]

const variantModuleWithOneBoringVariant: [string, VariantsModule] = [
  '...src/lib/Foo.variants.ts',
  { variants: [{ }] },
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
      variantName: 'lib/Foo/0',
      url: '/kitbook/sandbox/lib/Foo?variantIndex=0',
    }

    test('standard', () => {
      expect(prepareVariantsToRun({
        kitbookConfig: twoLanguageKitbookConfig,
        variantModules: [variantModuleWithOneBoringVariant],
      })).toEqual([expected])
    })

    test('one variant modules language', () => {
      const variantModuleWithOneLanguage: [string, VariantsModule] = ['...src/lib/Foo.variants.ts', {
        languages: [firstLanguage],
        variants: [{ }],
      }]

      expect(prepareVariantsToRun({
        kitbookConfig: twoLanguageKitbookConfig,
        variantModules: [variantModuleWithOneLanguage],
      })).toEqual([{ ...expected, languages: [firstLanguage] }])
    })

    test('empty language array in variant module', () => {
      const variantModuleWithEmptyLanguageArray: [string, VariantsModule] = ['...src/lib/Foo.variants.ts', {
        languages: [],
        variants: [{ }],
      }]

      expect(prepareVariantsToRun({
        kitbookConfig: twoLanguageKitbookConfig,
        variantModules: [variantModuleWithEmptyLanguageArray],
      })).toEqual([{ ...expected, languages: [firstLanguage] }])
    })

    test('empty language array in variant', () => {
      const variantModuleWithEmptyLanguageArray: [string, VariantsModule] = ['...src/lib/Foo.variants.ts', {
        variants: [{ languages: [] }],
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
      variantName: 'lib/Foo/0',
      url: '/sandbox/lib/Foo?variantIndex=0',
    }])
  })

  test('skipped test', () => {
    expect(prepareVariantsToRun({
      kitbookConfig: { viewports: oneViewport, languages: undefinedLanguage, kitbookRoute: '' } as KitbookSettings,
      variantModules: [[
        '...src/lib/Foo.variants.ts',
        { variants: [{ tests: { skip: true } }] },
      ]],
    })).toEqual([{
      filepathWithoutExtension: 'lib/Foo',
      viewports: oneViewport,
      languages: undefinedLanguage,
      variantName: 'lib/Foo/0',
      url: '/sandbox/lib/Foo?variantIndex=0',
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
        variants: [
          {
            name: 'one viewport',
            viewports: oneViewport,
          },
          {
            name: 'two viewports',
            viewports: twoViewports,
          },
        ],
      }],
    ] as [string, VariantsModule][]

    expect(prepareVariantsToRun({ kitbookConfig, variantModules })).toEqual(
      [
        {
          filepathWithoutExtension: 'lib/Foo',
          languages: undefinedLanguage,
          url: '/kitbook/sandbox/lib/Foo?variantIndex=0',
          variantName: 'lib/Foo/one_viewport',
          viewports: oneViewport,
        },
        {
          filepathWithoutExtension: 'lib/Foo',
          languages: undefinedLanguage,
          url: '/kitbook/sandbox/lib/Foo?variantIndex=1',
          variantName: 'lib/Foo/two_viewports',
          viewports: twoViewports,
        },
      ],
    )
  })
})
