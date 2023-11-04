import type { Variant, Viewport } from 'kitbook'
import type Component from './SSR.svelte'

export const viewports: Viewport[] = [
  { width: 400, height: 200 },
]

export const variants: Variant<Component>[] = [
  {
    name: 'Test SSR',
    description: 'This is the default for Visual Regression Tests.',
  },
  {
    name: 'Test CSR',
    tests: {
      clientSideRendered: true,
    },
  },
]
