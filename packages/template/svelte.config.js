import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex, KITBOOK_MDSVEX_CONFIG } from 'kitbook/plugins/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
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
