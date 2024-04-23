import type { Variant, VariantMeta } from 'kitbook'
import type Component from './+page.svelte'

export const shared_meta: VariantMeta = {
  // viewports: [
  //   { width: 500, height: 200 }
  // ]
}

const shared = {
  image_seeds: [
    'prototype',
  ],
  save_to_db: args => console.info(args),
} satisfies Partial<Variant<Component>['data']>

export const First: Variant<Component> = {
  data: {
    ...shared,
    name: 'Robin',
  },
}

export const Multiple_Seeds: Variant<Component> = {
  data: {
    ...shared,
    name: 'Jim',
    image_seeds: [
      'svelte-5',
      'runes',
      'svelte-dx',
    ],
  },
  _meta: {
    description: 'Obviously the mobile version here needs some work... well that is what Kitbook is for: finding these sorts of problems easily!',
  },
}
