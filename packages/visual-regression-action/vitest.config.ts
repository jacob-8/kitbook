import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    name: 'visual-regression-action:unit',
    globals: true,
  },
})
