import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
// import { vitePreprocess } from '@sveltejs/kit/vite'; // use after removing global style attribute needed by UnoCSS svelte-scoped

import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

import UnoCSS from 'temp-s-p-u';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [
    preprocess(),
    // vitePreprocess(),
    mdsvex(mdsvexConfig),
    UnoCSS({ options: { classPrefix: 'sp-' } }),
  ],

  kit: {
    adapter: adapter(),
  },

  vitePlugin: {
    experimental: {
      inspector: {
        holdMode: true,
      }
    }
  },
};

export default config;
