import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite';
import { kitbook } from 'kitbook/plugins/vite';

export default defineConfig({
  plugins: [
    kitbook(),
    sveltekit(),
  ],
  define: {
    'import.meta.vitest': false,
  },
  build: {
    target: 'es2015', //es6
  },
});
