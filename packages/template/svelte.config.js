import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.composition'],
  preprocess: [
    vitePreprocess(),
  ],

  kit: {
    adapter: adapter(),
  },
  onwarn: (warning, handler) => {
    if (warning.code.startsWith('a11y-'))
      return
    handler(warning)
  },
}

export default config
