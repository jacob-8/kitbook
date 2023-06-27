import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    name: 'mdsvex-shiki-twoslash:unit',
    globals: true,
		includeSource: ['src/**/*.ts'],
  },
})


