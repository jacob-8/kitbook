import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    name: 'vite-plugin-kitbook:unit',
    globals: true,
    includeSource: ['src/**/*.ts'],
  },
})


