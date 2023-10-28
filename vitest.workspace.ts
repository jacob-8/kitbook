import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  'packages/kitbook/vitest.config.ts',
  'packages/mdsvex-shiki-twoslash/vitest.config.ts',
  'packages/rehype-display-link-titles/vitest.config.ts',
  'packages/visual-regression-action/vitest.config.ts',
])
