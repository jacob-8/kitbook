import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  'packages/kitbook/vitest.config.ts',
  'packages/mdsvex-shiki-twoslash/vitest.config.ts',
  'packages/rehype-display-link-titles/vitest.config.ts',
  'packages/format-snapshot-results-action/vitest.config.ts',
])
