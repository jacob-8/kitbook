import type { Variant, VariantMeta } from 'kitbook'
import type Component from './ViewBody.svelte'

export const shared_meta: VariantMeta = {
  viewports: [
    { width: 400, height: 300 },
  ],
}

const shared = {
  hovered: true,
  width: 300,
  height: 200,
} satisfies Partial<Variant<Component>>

export const First: Variant<Component> = {
  ...shared,
}
