import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
	preprocess: vitePreprocess(),

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
  config.preprocess = [vitePreprocess(), mdsvex(mdsvexConfig)];
  config.kit.files = {
    routes: 'src/kitbook'
  }
  config.kit.outDir = '.svelte-kit-kitbook'
}

export default config;
