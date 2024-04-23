import type { Variant, VariantMeta } from 'kitbook'
import type Component from './DefaultSlot.svelte'
import PassIntoDefaultSlot from './PassIntoDefaultSlot.svelte'

export const shared_meta: VariantMeta = {
  viewports: [
    { width: 500, height: 200 },
  ],
}

export const Text: Variant<Component> = {
  _meta: {
    slot: 'Just a bit of plain text.',
  },
}
export const HTML: Variant<Component> = {
  _meta: {
    slot: 'Try some <i>italics</i>',
  },
}
export const Passed_Component: Variant<Component> = {
  _meta: {
    slot: PassIntoDefaultSlot,
  },
}
