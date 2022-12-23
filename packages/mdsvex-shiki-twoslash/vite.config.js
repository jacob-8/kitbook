/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
		includeSource: ['src/**/*.ts'],
    globals: true,
  },
})
