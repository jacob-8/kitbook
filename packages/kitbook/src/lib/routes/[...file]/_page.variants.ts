import type { Variant } from 'kitbook'
import type Component from './+page.svelte'

import { variants as hiVariants } from './mockComponents/Hi.variants'

export const variants: Variant<Component>[] = [
  {
    name: 'i18n',
    description: 'Has three languages, which can be toggled between or both can be selected. Variants will will 500 error because they are a sandbox in a sandbox. That is ok as they are just here to show the current language. Try changing the language in the sidebar and use the multi-select feature.',
    props: {
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
          variantsModule: { variants: hiVariants },
        },
        pages: {
          '/docs/1-get-started': {
            name: 'get started',
            url: '/docs/1-get-started',
            path: '/src/docs/1-get-started.md',
            extensions: [
              'md',
            ],
          },
        },
        pagesStore: null,
      },
    },
    viewports: [{ width: 1000, height: 600 }],
  },
]
