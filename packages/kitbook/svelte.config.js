import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

import UnoCSS from 'temp-s-p-u';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [
    vitePreprocess(),
    mdsvex(mdsvexConfig),
    UnoCSS({ options: { classPrefix: 'kb-' } }),
  ],

  kit: {
    adapter: adapter(),
  },

  package: {
    files: (filename) => !(filename.endsWith('.svx') || filename.endsWith('.md'))
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
