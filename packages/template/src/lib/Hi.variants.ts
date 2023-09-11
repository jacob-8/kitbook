import type { Variants } from 'kitbook';
import type Component from './Hi.svelte';

export const variants: Variants<Component> = [
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
