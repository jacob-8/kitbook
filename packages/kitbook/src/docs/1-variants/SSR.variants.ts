import type { Variant, VariantMeta } from 'kitbook'
import type Component from './SSR.svelte'

export const shared_meta: VariantMeta = {
  viewports: [
    { width: 400, height: 100 },
  ],
}

export const Test_SSR: Variant<Component> = {
  _meta: {
    description: 'This is the default for Visual Regression Tests (components are only server rendered).',
    csr: false,
  },
}

export const Test_CSR: Variant<Component> = {
  _meta: {
    description: 'but this will be client side rendered before being snapshotted because of `_meta.tests.clientSideRendered` set to true',
    tests: {
      clientSideRendered: true,
    },
  },
}
