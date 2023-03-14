import type { Variants } from 'kitbook';
import type Component from './Button.svelte';

export const variants: Variants<typeof Component> = [
  {
    // name: 'First',
    props: {
      href: 'foo',
    },
  },
  {
    name: 'With Custom Site',
    props: {
      href: 'foo',
      site: 'TypeScript',
    },
  },
]
