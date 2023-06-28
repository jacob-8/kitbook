import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    name: 'remark-story-code-preview:unit',
    globals: true,
  },
})


