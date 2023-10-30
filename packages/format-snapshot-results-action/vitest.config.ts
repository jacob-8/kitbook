import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    name: 'format-snapshot-results-action:unit',
    globals: true,
  },
})
