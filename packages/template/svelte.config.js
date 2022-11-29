import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [preprocess()],

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
  config.preprocess = [preprocess(), mdsvex(mdsvexConfig)];
  config.kit.files = {
    routes: 'node_modules/kitbook/routes'
  }
  config.kit.outDir = '.svelte-kit-kitbook'
}

export default config;
