import type { Variant } from 'kitbook'
import type Component from './SearchModal.svelte'

export const Basic: Variant<Component> = {
  _meta: {
    description: 'Hit Ctrl+K or Meta+K to open modal. Urls should start with `/search` since that is passed in as the kitbookPath',
    tests: {
      skip: true,
    },
    viewports: [
      { name: 'Desktop', width: 800, height: 600 },
      { name: 'Mobile', width: 320, height: 600 },
    ],
  },
  kitbookPath: '/search',
}
