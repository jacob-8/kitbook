import type { Variants } from 'kitbook';
import type Component from './+page.svelte';

export const variants: Variants<Component> = [
  {
    name: 'First',
    props: {
      data: {
        name: 'Jimmy'
      },
    },
  },
  {
    name: 'Second',
    props: {
      data: {
        name: 'James'
      },
    },
  }
]