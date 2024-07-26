import type { Variant, VariantMeta } from 'kitbook'
import type Component from './Routes.svelte'

export const shared_meta: VariantMeta = {
  viewports: [{ width: 400, height: 400 }],
}

const shared = {
  svelte_modules: {
    '/routes/+layout': {
    },
    '/routes/+page': {
      parents: ['/routes/another/[id]/+page'],
      children: ['/lib/Button', '/lib/LunchMenu'],
    },
    '/routes/another/+page': {
    },
    'lib/Button': {
      parents: ['/routes/+page'],
    },
  },
  kitbookPath: '/kitbook',
} satisfies Partial<Variant<Component>>

export const Normal: Variant<Component> = {
  ...shared,
}

export const KitbookItself: Variant<Component> = {
  ...shared,
  kitbookPath: '',
  svelte_modules: {
    '/lib/routes/[...file]/+page': {},
    '/lib/routes/sandbox/[...file]/+page': {},
    '/lib/routes/tools/+page': {},
    '/lib/routes/[...file]/MainPage': {},
    '/lib/routes/sandbox/[...file]/SandboxPage': {},
    '/lib/routes/tools/ToolsPage': {},
  },
  _meta: {
    description: 'The links will work in this one because you are in Kitbook.',
  },
}
