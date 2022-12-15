import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import UnoCSS from 'temp-s-p-u';

/** @type {import('@sveltejs/kit').Config} */
const config = {
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

// import { augmentSvelteConfigForKitbook } from 'kitbook/plugins/vite'; 
export default augmentSvelteConfigForKitbook(config);;

// placed a simplified version of augmentSvelteConfigForKitbook only in this Kitbook package and not anywhere else that uses Kitbook because svelte.config.js is not allowing importing from a non-package. As well this package only has a Kitbook and not a regular app.
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './src/lib/plugins/vite/mdsvex.config.js';
function augmentSvelteConfigForKitbook(config) {
  if (process.env.KITBOOK_ROUTES) {
    config.extensions = ['.svelte', ...mdsvexConfig.extensions];
    config.preprocess.unshift(mdsvex(mdsvexConfig));
  }
  return config;
}
