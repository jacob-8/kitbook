import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import ScopedUno from 'svelte-preprocess-unocss';

import { MDSVEX_EXTENSIONS } from '@kitbook/vite-plugin-kitbook';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...MDSVEX_EXTENSIONS],
  preprocess: [
    vitePreprocess(),
    ScopedUno({
      classPrefix: 'kb-',
    }),
  ],

  kit: {
    adapter: adapter(),
    files: {
      appTemplate: 'src/lib/app.html',
      routes: 'src/lib/routes',
      assets: 'src/lib/assets',
    }
  },

  vitePlugin: {
    experimental: {
      inspector: {
        holdMode: true,
      }
    }
  },

  onwarn: (warning, handler) => {
    if (warning.code.startsWith('a11y-')) return
    handler(warning)
  },
};

export default config;
// cancel: augmentSvelteConfigForKitbook - not using in the Kitbook package itself because svelte.config.js does not support importing typescript files. As well this package only has a Kitbook and not a regular app.
