import type { Variant } from 'kitbook'
import type Component from './DefaultSlot.svelte'

import PassIntoDefaultSlot from './PassIntoDefaultSlot.svelte'

export const variants: Variant<Component>[] = [
  {
    name: 'Text',
    slots: {
      default: 'Just a bit of plain text.',
    },
  },
  {
    name: 'HTML',
    slots: {
      default: 'Try some <i>italics</i>',
    },
  },
  {
    name: 'Component',
    slots: {
      default: PassIntoDefaultSlot,
    },
  },
]
