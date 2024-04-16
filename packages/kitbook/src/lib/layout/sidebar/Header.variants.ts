import type { Variant, Viewport } from 'kitbook'
import type Component from './Header.svelte'

export const viewports: Viewport[] = [
  { height: 200, width: 800 },
  { height: 200, width: 200 },
]

export const variants: Variant<Component>[] = [
  {
    name: 'inactive',
    props: {
      kitbookPath: '',
      activePath: '/foo',
    },
  },
  {
    name: 'active',
    description: 'should be blue',
    props: {
      kitbookPath: '',
      activePath: '/index',
    },
  },
  {
    name: 'with slots',
    props: {
      kitbookPath: '',
      activePath: '/foo',
    },
    slots: {
      default: 'My Workbench',
    },
  },
]
