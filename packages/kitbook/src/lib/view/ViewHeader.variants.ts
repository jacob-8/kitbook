import type { Variant, VariantMeta } from 'kitbook'
import { tick } from 'svelte'
import type Component from './ViewHeader.svelte'

export const shared_meta: VariantMeta = {
  viewports: [
    { width: 700, height: 100 },
    { width: 200, height: 100 },
  ],
}

const shared = {
  csr: null,
  ssr: null,
  languageCode: null,
  src: '/sandbox/lib/viewer/focused/DocumentInPicture?compositionName=default',
  resetDimensions: () => alert('resetDimensions'),
  refresh: async () => {
    await tick()
    alert('refresh')
  },
  blockScripts: false,
  hovered: false,
  hasCode: false,
  width: 400,
  height: 200,
} satisfies Partial<Variant<Component>>

export const Basic: Variant<Component> = {
  ...shared,
}

export const Has_Code: Variant<Component> = {
  ...shared,
  hasCode: true,
}

export const Has_Language: Variant<Component> = {
  ...shared,
  languageCode: 'es',
}

export const SSR: Variant<Component> = {
  ...shared,
  ssr: false,
}
