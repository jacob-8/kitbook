import type { Variants } from 'kitbook';
import type NeedsPropsToNotError from './NeedsPropsToNotError.svelte';

export const variants: Variants<typeof NeedsPropsToNotError> = [
  {
    name: 'Will error',
    description: 'Not passing needed prop to test that Error Boundary works',
    props: {
      name: null
    },
  },
]