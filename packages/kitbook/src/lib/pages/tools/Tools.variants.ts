import type { Variant } from 'kitbook'
import type Component from './Tools.svelte'

const shared = {
  changeState: data => console.info({ changeState: data }),
  data: {
    settings: {
      description: 'This is a description',
      title: 'This is a title',
      viewports: [{ width: 500, height: 200 }],
      _languageInsertedKitbookRoute: '/kitbook',
      viewer: {
        __internal: {
          viteBase: '',
        },
      },
    },
    pages: null,
    pagesStore: null,
    svelte_modules: null,
  },
} satisfies Partial<Variant<Component>>

export const First: Variant<Component> = {
  ...shared,
  detailsForTools: {
    filename: 'src/lib/pages/tools/Tools.svelte',
    tagName: 'Tools',
    serializedState: {
      foo: 'bar',
    },
  },
}
