import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/kit/vite'
import { KITBOOK_MDSVEX_CONFIG, MDSVEX_EXTENSIONS, mdsvex } from 'kitbook/plugins/mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...MDSVEX_EXTENSIONS],
  preprocess: [
    mdsvex(KITBOOK_MDSVEX_CONFIG),
    vitePreprocess(),
  ],

  kit: {
    adapter: adapter(),
  },

  vitePlugin: {
    inspector: {
      holdMode: true,
    },
  },
}

export default config
