import type { Variants } from 'kitbook';
import type Component from './DefaultSlot.svelte';
import PassIntoDefaultSlot from './PassIntoDefaultSlot.svelte';

export const variants: Variants<typeof Component> = [
  {
    name: 'Text',
    slots: [
      {
        content: 'Just a bit of plain text.',
      }
    ]
  },
  {
    name: 'HTML',
    slots: [
      {
        content: 'Try some <i>italics</i>',
      }
    ]
  },
  {
    name: 'Component',
    slots: [
      {
        content: PassIntoDefaultSlot,
      }
    ]
  }
]
