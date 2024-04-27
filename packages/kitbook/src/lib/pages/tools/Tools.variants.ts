import type { Variant, VariantMeta } from 'kitbook'
import type Component from './Tools.svelte'

export const shared_meta: VariantMeta = {
  // viewports: [
  //   { width: 500, height: 200 }
  // ]
}

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

// export const Second_Situation: Variant<Component> = {
//   ...shared,
// }
