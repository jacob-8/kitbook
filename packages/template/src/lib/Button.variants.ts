import type { Variant } from 'kitbook'
import type Component from './Button.svelte'

export const variants: Variant<Component>[] = [
  {
    props: {
      href: '/foo',
    },
  },
  {
    name: 'With Custom Site',
    props: {
      href: '/foo',
      site: 'TypeScript',
    },
  },
]
