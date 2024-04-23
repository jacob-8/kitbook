import type { Variant } from 'kitbook'
import type Component from './Folder.svelte'

export const First: Variant<Component> = {
  folder: {
    name: 'stories',
    url: '/docs/1-stories',
    depth: 2,
    folders: [],
    pages: [{
      name: 'complex example',
      url: '/docs/1-stories/complex-example',
      path: '/src/docs/1-stories/complex-example.md',
      extensions: ['md'],
    }],
  },
  expanded: true,
  kitbookPath: '',
  activePath: '',
  _meta: {
    viewports: [
      { width: 200, height: 200 },
    ],
  },
}
