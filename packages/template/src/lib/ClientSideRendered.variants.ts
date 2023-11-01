import type { Variant, Viewport } from 'kitbook'
import type Component from './ClientSideRendered.svelte'

export const viewports: Viewport[] = [{
  height: 100,
  width: 200,
}]

export const variants: Variant<Component>[] = [
  {
    name: 'CSR',
    description: 'My visual regression screenshot will wait for at least 500ms after network requests stop so I will be client-side rendered',
    props: {
      name: 'Bob',
    },
    tests: {
      clientSideRendered: true,
    },
  },
  {
    name: 'SSR',
    description: 'Visual regression screenshot will be server-side rendered',
    props: {
      name: 'James',
    },
  },
]
