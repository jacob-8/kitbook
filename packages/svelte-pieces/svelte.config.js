import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

import deepWind from 'svelte-deep-wind-preprocess';
import { windi } from 'svelte-windicss-preprocess';

import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // experimental: {
  //   inspector: true
  // },
  
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [
    preprocess(),
    mdsvex(mdsvexConfig),
    deepWind({ globalPrefix: true }),
    windi({
      configPath: './windi.config.js',
      experimental: {
        icons: {
          prefix: 'i-',
          extraProperties: {
            display: 'inline-block',
            'vertical-align': 'middle',
          },
        },
      },
    }),
  ],

  kit: {
    adapter: adapter(),
  },
};

export default config;
