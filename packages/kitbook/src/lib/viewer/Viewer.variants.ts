import type { Variant, VariantMeta } from 'kitbook'
import type Component from './Viewer.svelte'

export const shared_meta: VariantMeta = {
  viewports: [
    { width: 500, height: 200 },
  ],
  ssr: false,
}

const shared_settings = {
  title: 'foo',
  description: 'foo',
  kitbookRoute: '/kitbook',
  _languageInsertedKitbookRoute: '/kitbook',
  viewer: {
    showToggleButton: 'always',
    __internal: {
      viteBase: '',
    },
  },
} satisfies Partial<Variant<Component>['settings']>

export const Only_Kitbook: Variant<Component> = {
  settings: {
    ...shared_settings,
    kitbookRoute: '',
    _languageInsertedKitbookRoute: '',
  },
}

export const In_An_App: Variant<Component> = {
  settings: {
    ...shared_settings,
  },
  _meta: {
    description: 'tools route will be broken because we are pretending to have an app apart from Kitbook which we do not have.',
  },
}
