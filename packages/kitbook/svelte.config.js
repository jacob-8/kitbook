// @ts-check
import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/kit/vite'
import UnoCSS from '@unocss/svelte-scoped/preprocess'
import { KITBOOK_MDSVEX_CONFIG, MDSVEX_EXTENSIONS, mdsvex } from './src/lib/plugins/mdsvex.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.composition', ...MDSVEX_EXTENSIONS],
  preprocess: [
    mdsvex(KITBOOK_MDSVEX_CONFIG),
    UnoCSS({
      classPrefix: 'kb-',
    }),
    vitePreprocess(),
  ],

  kit: {
    adapter: adapter(),
    files: {
      routes: 'src/lib/routes',
    },
  },
  // https://github.com/sveltejs/language-tools/issues/650#issuecomment-1337317336
  onwarn: (warning, handler) => {
    if (warning.code.startsWith('a11y-'))
      return
    handler(warning)
  },

  vitePlugin: {
    inspector: {
      holdMode: true,
    },
  },
}

export default config
