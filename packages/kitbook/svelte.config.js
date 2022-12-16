import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import UnoCSS from 'temp-s-p-u';

import mdsvexConfig from './src/lib/plugins/vite/mdsvex.config.js';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [
    vitePreprocess(),
    UnoCSS({ options: { classPrefix: 'kb-' } }),
  ],

  kit: {
    adapter: adapter(),
  },

  package: {
    files: (filename) => {
      const isSvx = filename.endsWith('.svx') || filename.endsWith('.md');
      if (isSvx) return false;
      return true;
    }
  },

  vitePlugin: {
    experimental: {
      inspector: {
        holdMode: true,
      }
    }
  },
};

// not using augmentSvelteConfigForKitbook only in this Kitbook package because svelte.config.js does not support importing typescript files and this config would be referencing the not-yet compiled version. As well this package only has a Kitbook and not a regular app.
export default config;
