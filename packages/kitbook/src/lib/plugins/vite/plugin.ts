// Learn from https://vitejs.dev/guide/api-plugin.html#simple-examples
import type { Plugin, ResolvedConfig, UserConfig } from 'vite'
import { initKitbook } from './initKitbook.js';

import { mdsvex, type MdsvexOptions } from 'mdsvex';
import defaultKitbookMdsvexConfig from './mdsvex.config.js';
import { DEFAULT_KITBOOK_ROUTES } from './constants.js';

export function kitbookPlugin({ routes, mdsvexConfig }: {
  routes?: string;
  mdsvexConfig?: MdsvexOptions;
} = {}): Plugin {
  initKitbook(routes || DEFAULT_KITBOOK_ROUTES);
  // let config: ResolvedConfig;

  return {
    name: 'vite-plugin-svelte-kitbook',
    enforce: 'pre',

    config: (config, { mode }) => {
      if (mode === 'kitbook') return kitbookModifications(config)
    },

    api: {
      sveltePreprocess: mdsvex(mdsvexConfig || defaultKitbookMdsvexConfig),
    },

    // configResolved(resolvedConfig) {
    //   config = resolvedConfig
    // },

    // transform(src, id) {
    //   if (config.mode === 'kitbook') {
    //     if (id.includes('+page'))
    //       console.log(id)
    //     return {
    //       code: src,
    //     }
    //   }
    // }
  }
}

function kitbookModifications(config: UserConfig): UserConfig {
  return {
    server: {
      port: config?.server?.port || 4321,
      fs: {
        allow: ['..'], // one level up from the project root for displaying README.md
      }
    }
  }
}