import type { Variant } from 'kitbook';
import type Component from './Hi.svelte';

export const variants: Variant<Component>[] = [
  {
    props: {
      name: 'Bob',
    },
  },
  {
    props: {
      name: 'James',
    },
  },
]
