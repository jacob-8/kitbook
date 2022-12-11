import type { Variants } from 'kitbook';
import type ComponentNeedsPropsToNotError from './ComponentNeedsPropsToNotError.svelte';

export const variants: Variants<typeof ComponentNeedsPropsToNotError> = [
  {
    name: 'Will error',
    description: 'Not passing needed prop to test that Error Boundary works',
    props: {
      name: null
    },
  },
]