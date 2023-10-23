import type { Variant, Viewport } from 'kitbook'
import type Component from './Button.svelte'

export const viewports: Viewport[] = [{
  height: 100,
  width: 200,
}]

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
