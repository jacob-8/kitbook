import { defaultExclude, defineProject } from 'vitest/config'

export default defineProject({
  test: {
    name: 'kitbook:unit',
    globals: true,
    includeSource: ['src/**/*.ts'],
    exclude: [...defaultExclude, 'dist', 'e2e/*.spec.ts'],
  },
})
