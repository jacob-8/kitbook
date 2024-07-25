import type { Variant } from 'kitbook'
import type Component from './Page.svelte'

export const variants: Variant<Component> = {
  page: {
    name: 'get started',
    url: '/docs/1-get-started',
    path: '/src/docs/1-get-started.md',
    extensions: ['md'],
  },
  kitbookPath: '',
  activePath: '',
  depth: 1,
  _meta: {
    viewports: [
      { width: 300, height: 100 },
    ],
  },
}
