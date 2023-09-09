import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import UnoCSS from '@unocss/svelte-scoped/preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    UnoCSS({
      classPrefix: 'kb-',
    }),
    vitePreprocess(),
  ],

  kit: {
    adapter: adapter(),
  },

  // https://github.com/sveltejs/language-tools/issues/650#issuecomment-1337317336
  onwarn: (warning, handler) => {
    if (warning.code.startsWith('a11y-')) return
    handler(warning)
  },

  vitePlugin: {
    inspector: {
      holdMode: true,
    }
  },
};

export default config;
