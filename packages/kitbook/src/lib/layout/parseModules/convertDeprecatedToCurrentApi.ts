import type { CompositionModule, DeprecatedCompositionModule, DeprecatedVariantsModule, Variant, VariantsModule } from '$lib/kitbook-types'

function isDeprecatedVariantsModule(module: VariantsModule | DeprecatedVariantsModule): module is DeprecatedVariantsModule {
  return 'variants' in module && Array.isArray(module.variants)
}

export function convertDeprecatedVariantsToCurrentApi(module: VariantsModule | DeprecatedVariantsModule): VariantsModule {
  if (!isDeprecatedVariantsModule(module))
    return module

  const current: VariantsModule = {
    shared_meta: {
      ...module.viewports ? { viewports: module.viewports } : {},
      ...module.languages ? { languages: module.languages } : {},
    },
  }

  let no_name_index = 0

  module.variants.forEach((variant) => {
    let variantKey: string
    if (variant.name) {
      variantKey = variant.name.replaceAll(' ', '_')
    }
    else {
      variantKey = `No_Name_${no_name_index}`
      no_name_index++
    }
    const variantData: Variant<any> = {
      ...variant.props,
      _meta: {
        description: variant.description,
        viewports: variant.viewports,
        languages: variant.languages,
        contexts: variant.contexts,
        defaultSlot: variant.slots?.default,
        tests: variant.tests
          ? {
              skip: variant.tests.skip,
              additional: variant.tests.additional,
              clientSideRendered: variant.tests.clientSideRendered,
            }
          : undefined,
      },
    }

    // Remove undefined _meta fields to clean up output
    Object.keys(variantData._meta).forEach((key) => {
      if (variantData._meta[key] === undefined)
        delete variantData._meta[key]
    })

    if (Object.keys(variantData._meta).length === 0)
      delete variantData._meta

    current[variantKey] = variantData
  })

  return current
}

if (import.meta.vitest) {
  describe(convertDeprecatedVariantsToCurrentApi, () => {
    test('ignores variants using current api', () => {
      const variantsModule: VariantsModule = {
        shared_meta: {
          viewports: [{ height: 200, width: 800 }],
        },
        inactive: {
          kitbookPath: '',
        },
      }
      expect(convertDeprecatedVariantsToCurrentApi(variantsModule)).toEqual(variantsModule)
    })

    test('moves config values into shared_meta and expands variants array into individual objects at the root level', () => {
      const deprecatedVariantsModule: DeprecatedVariantsModule = {
        viewports: [
          { height: 200, width: 800 },
          { height: 200, width: 200 },
        ],
        variants: [
          {
            name: 'inactive',
            props: {
              kitbookPath: '',
              activePath: '/foo',
            },
          },
          {
            description: 'should be blue',
            props: {
              kitbookPath: '',
              activePath: '/index',
            },
          },
          {
            name: 'with slots',
            props: {
              kitbookPath: '',
              activePath: '/foo',
            },
            slots: {
              default: 'My Workbench',
            },
          },
        ],
      }
      const expectedVariantsModule: VariantsModule = {
        shared_meta: {
          viewports: [
            { height: 200, width: 800 },
            { height: 200, width: 200 },
          ],
        },
        inactive: {
          kitbookPath: '',
          activePath: '/foo',
        },
        No_Name_0: {
          kitbookPath: '',
          activePath: '/index',
          _meta: {
            description: 'should be blue',
          },
        },
        with_slots: {
          kitbookPath: '',
          activePath: '/foo',
          _meta: {
            defaultSlot: 'My Workbench',
          },
        },
      }
      expect(convertDeprecatedVariantsToCurrentApi(deprecatedVariantsModule)).toEqual(expectedVariantsModule)
    })
  })
}

function isDeprecatedCompositionModule(module: CompositionModule | DeprecatedCompositionModule): module is DeprecatedCompositionModule {
  return 'viewports' in module || 'languages' in module || 'csr' in module || 'ssr' in module
}

export function convertDeprecatedCompositionToCurrentApi(module: CompositionModule | DeprecatedCompositionModule): CompositionModule {
  if (!isDeprecatedCompositionModule(module))
    return module

  const { default: defaultComponent, inlined, code, ...config } = module
  return {
    default: defaultComponent,
    inlined,
    code,
    config,
  }
}

if (import.meta.vitest) {
  describe(convertDeprecatedVariantsToCurrentApi, () => {
    test('ignores composition using current api', () => {
      const compositionModule: CompositionModule = {
        default: null,
        inlined: true,
        code: 'Component code',
        config: {
          viewports: [{ height: 1024 }],
          languages: [],
          ssr: false,
        },
      }
      expect(convertDeprecatedCompositionToCurrentApi(compositionModule)).toEqual(compositionModule)
    })

    test('moves config values into config property', () => {
      const deprecatedCompositionModule: DeprecatedCompositionModule = {
        default: null,
        inlined: true,
        code: 'Some code',
        viewports: [{ height: 1200 }],
        languages: [],
        csr: false,
      }
      const expectedCompositionModule: CompositionModule = {
        default: null,
        inlined: true,
        code: 'Some code',
        config: {
          viewports: [{ height: 1200 }],
          languages: [],
          csr: false,
        },
      }
      expect(convertDeprecatedCompositionToCurrentApi(deprecatedCompositionModule)).toEqual(expectedCompositionModule)
    })
  })
}
