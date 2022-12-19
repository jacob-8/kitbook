import type { Variants } from 'kitbook';
import type Page from './+page.svelte';

export const variants: Variants<typeof Page> = [
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