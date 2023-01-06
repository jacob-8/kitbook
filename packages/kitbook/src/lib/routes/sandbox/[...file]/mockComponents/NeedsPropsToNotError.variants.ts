import type { Variants } from 'kitbook';
import type Component from './NeedsPropsToNotError.svelte';

export const variants: Variants<typeof Component> = [
  {
    name: 'Will error',
    description: 'Not passing needed prop to test that Error Boundary works',
    props: {
      name: null
    },
  },
]