import path from 'node:path'
import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import Inspect from 'vite-plugin-inspect'
import { kitbook } from './src/lib/plugins/vite'
import kitbookConfig from './kitbook.config'

export default defineConfig({
  plugins: [
    Inspect(),
    kitbook(kitbookConfig),
    sveltekit(),
  ],
  define: {
    'import.meta.vitest': false,
  },
  resolve: {
    alias: {
      kitbook: path.resolve('./src/lib'),
    },
  },
  server: {
    port: 3212,
    strictPort: true,
  },
  build: {
    target: 'es2015', // es6
  },
})
