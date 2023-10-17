import type { Variant } from 'kitbook'
import type Component from './SearchModal.svelte'

export const variants: Variant<Component>[] = [
  {
    props: {},
    viewports: [
      { name: 'Desktop', width: 800, height: 600 },
      { name: 'Mobile', width: 320, height: 600 },
    ],
  },
]
