import type { GroupedPage, Variant, VariantMeta } from 'kitbook'
import type Component from './+page.svelte'

import { All_Languages, Single_Language } from './mockComponents/Hi.variants'

export const shared_meta: VariantMeta = {}

const shared = {
} satisfies Partial<Variant<Component>>

const page: GroupedPage = {
  name: 'get started',
  url: '/docs/1-get-started',
  path: '/src/docs/1-get-started.md',
  extensions: [
    'md',
  ],
}

export const i18n: Variant<Component> = {
  ...shared,
  data: {
    settings: {
      title: 'i18n Kitbook',
      description: '',
      expandTree: true,
      viewports: [{
        width: 300,
        height: 300,
      }],
      languages: [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
      ],
    },
    loadedModules: {
      variantsModule: { All_Languages, Single_Language },
    },
    pages: {
      '/docs/1-get-started': page,
    },
    page,
    pageKey: '/docs/1-get-started',
    pagesStore: null,
  },
  _meta: {
    description: 'Has three languages, which can be toggled between or both can be selected. Variants will will 500 error because they are a sandbox in a sandbox. That is ok as they are just here to show the current language. Try changing the language in the sidebar and use the multi-select feature.',
    viewports: [{ width: 1000, height: 600 }],
  },
}
