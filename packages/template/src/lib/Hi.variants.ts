import type { Variant, Viewport } from 'kitbook'
import type Component from './Hi.svelte'

export const viewports: Viewport[] = [{
  height: 100,
  width: 200,
}]

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
