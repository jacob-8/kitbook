import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex, MDSVEX_EXTENSIONS, KITBOOK_MDSVEX_CONFIG } from 'kitbook/plugins/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...MDSVEX_EXTENSIONS],
  preprocess: [
    mdsvex(KITBOOK_MDSVEX_CONFIG),
    vitePreprocess(),
  ],

  kit: {
    adapter: adapter(),
  },

  vitePlugin: {
    inspector: {
      holdMode: true,
    }
  },
};

export default config;
