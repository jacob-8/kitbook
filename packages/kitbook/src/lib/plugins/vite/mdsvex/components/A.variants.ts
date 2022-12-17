import type { Variants } from 'kitbook';
import type Component from './A.svelte';

export const variants: Variants<typeof Component> = [
  {
    name: 'Regular',
    props: {
      href: 'https://svench-docs.vercel.app/',
    },
    slots: [
      {
        content: 'Svench',
      }
    ]
  },
  {
    name: 'With Title',
    props: {
      href: '8-examples',
      title: 'Examples',
    },
    slots: [
      {
        content: '[8-examples]',
      }
    ]
  },
  {
    name: 'Alias',
    props: {
      href: '/docs/9-why',
      title: 'Why not use an already existing alternative?',
    },
    slots: [
      {
        content: '[9-why|others]',
      }
    ]
  }
]
