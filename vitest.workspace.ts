import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  'packages/kitbook/vitest.config.ts',
  'packages/svelte-pieces/vitest.config.ts',
])
