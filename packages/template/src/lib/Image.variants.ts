import type { Variant, VariantMeta } from 'kitbook'
import type Component from './Image.svelte'

export const shared_meta: VariantMeta = {
  viewports: [
    { width: 440, height: 260 },
  ],
}

const shared = {
  width: 400,
  height: 250,
} satisfies Partial<Variant<Component>>

export const First: Variant<Component> = {
  ...shared,
  seed: 'runes', // svelte-dx is also a pretty seed to try
}

export const No_Seed: Variant<Component> = {
  ...shared,
  _meta: {
    description: 'This one has no seed, so it will be different every load.',
  },
}
