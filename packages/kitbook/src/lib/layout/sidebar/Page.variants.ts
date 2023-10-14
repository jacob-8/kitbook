import type { Variants } from 'kitbook'
import type Component from './Page.svelte'

export const variants: Variants<Component> = [
  {
    props: {
      page: {
        name: 'get started',
        url: '/docs/1-get-started',
        path: '/src/docs/1-get-started.md',
        extensions: ['md'],
      },
      kitbookPath: '',
      activePath: '',
      depth: 1,
    },
    viewports: [
      { width: 300, height: 100 },
    ],
  },
]
