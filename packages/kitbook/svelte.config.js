import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

import UnoCSS from 'temp-s-p-u';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    preprocess(),
    UnoCSS({ options: { classPrefix: 'kb-' } }),
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

if (process.env.KITBOOK) {
  config.extensions = ['.svelte', ...mdsvexConfig.extensions];
  config.preprocess = [
    preprocess(),
    mdsvex(mdsvexConfig),
    UnoCSS({ options: { classPrefix: 'kb-' } }),
  ];
  config.kit.files = {
    routes: 'src/lib/kitbook-routes'
  }
  // config.kit.outDir = '.svelte-kit-kitbook' // turn on if running both normal dev and kitbook dev at same time (just for developing kitbook)
}

export default config;
