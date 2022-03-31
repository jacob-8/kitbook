import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';

import { windi } from "svelte-windicss-preprocess";
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [...mdsvexConfig.extensions],
  preprocess: [
    preprocess(),
    mdsvex(mdsvexConfig),
    windi({
      // configPath: './windi.config.js',
      experimental: {
        icons: {
          prefix: 'i-',
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'middle',
          }
        }
      }
    }),
  ],

  kit: {
    adapter: adapter(),
    vite: {
      resolve: {
				alias: {
					$kitbook: path.resolve('./src/kitbook'),
				},
			},
      define: {
        'import.meta.vitest': false,
      },
    }
  },
};

export default config;
