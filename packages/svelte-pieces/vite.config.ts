import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

import WindiCSS from 'vite-plugin-windicss';
import UnoCss from 'unocss/vite';
import presetIcons from '@unocss/preset-icons';

// keeps using localhost https://github.com/vitejs/vite/issues/9195
import dns from 'dns';
dns.setDefaultResultOrder('verbatim');

const config: UserConfig = {
  plugins: [
    WindiCSS({
      config: './windi.config.ts'
    }),
		UnoCss({
      // transformCSS: 'pre',
      mode: 'svelte-scoped',
      presets: [
        presetIcons({
          prefix: 'i-',
          extraProperties: {
            display: 'inline-block',
            'vertical-align': 'middle',
          },
        }),
      ],
    }),
    sveltekit(),
  ],
  define: {
    'import.meta.vitest': false,
  },
  build: {
    target: 'es2015', //es6
  },
  test: {
    globals: true,
    includeSource: ['src/**/*.ts'],
  },
};

export default config;
