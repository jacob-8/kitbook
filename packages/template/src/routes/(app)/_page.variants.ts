import type { Variant } from 'kitbook'
import type Component from './+page.svelte'

export const variants: Variant<Component>[] = [
  {
    name: 'First',
    props: {
      data: {
        name: 'Jimmy',
      },
    },
  },
  {
    name: 'Second',
    props: {
      data: {
        name: 'James Little',
      },
    },
  },
]
