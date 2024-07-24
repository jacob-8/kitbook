import type { GroupedPage, Variant, VariantMeta } from 'kitbook'
import { writable } from 'svelte/store'
import type { SvelteComponent } from 'svelte'
import type Component from './+page.svelte'

import { All_Languages, Single_Language } from './mockComponents/Hi.variants'
import Hi from './mockComponents/Hi.svelte'

export const shared_meta: VariantMeta = {}

const shared_data = {
  settings: {
    title: 'Demo Kitbook',
    description: '',
  },
  pagesStore: null,
  svelte_modules: null,
} satisfies Partial<Variant<Component>['data']>

const component_page: GroupedPage = {
  name: '+page',
  url: '/routes/+page',
  path: '/src/routes/+page.svelte',
  extensions: [
    'svelte',
  ],
}

export const Relatives: Variant<Component> = {
  data: {
    ...shared_data,
    loadedModules: {
      component: Hi as typeof SvelteComponent,
      componentRaw: 'hi',
      // variantsModule: { Single_Language },
    },
    pages: {
      '/routes/+page': component_page,
    },
    page: component_page,
    pageKey: '/routes/+page',
    svelte_modules: writable({
      '/routes/+page': {
        parents: ['/lib/routes/another/[id]/+page.svelte'],
        children: ['/lib/Button.svelte', '/lib/LunchMenu.svelte'],
      },
    }),
  },
  _meta: {
    viewports: [{ width: 1000, height: 400 }],
    description: 'A component with both parents and children components. The links will not work inside this sandbox.',
  },
}

const page: GroupedPage = {
  name: 'get started',
  url: '/docs/1-get-started',
  path: '/src/docs/1-get-started.md',
  extensions: [
    'md',
  ],
}

export const i18n: Variant<Component> = {
  data: {
    ...shared_data,
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
  },
  _meta: {
    description: 'Has three languages, which can be toggled between or both can be selected. Variants will will 500 error because they are a sandbox in a sandbox. That is ok as they are just here to show the current language. Try changing the language in the sidebar and use the multi-select feature.',
    viewports: [{ width: 1000, height: 600 }],
  },
}
