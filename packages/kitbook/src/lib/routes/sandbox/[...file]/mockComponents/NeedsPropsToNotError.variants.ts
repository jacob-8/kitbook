import type { DeprecatedVariant } from 'kitbook'
import type Component from './NeedsPropsToNotError.svelte'

export const variants: DeprecatedVariant<Component>[] = [
  {
    name: 'Will error',
    description: 'Not passing needed prop to test that Error Boundary works',
    props: {
      name: null,
    },
  },
]
