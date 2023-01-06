// Learn from https://vitejs.dev/guide/api-plugin.html#simple-examples
import type { Plugin, ResolvedConfig, UserConfig } from 'vite'
import { initKitbook } from './initKitbook';

import { mdsvex, type MdsvexOptions } from 'mdsvex';
import defaultKitbookMdsvexConfig from './mdsvex/mdsvex.config';
import { DEFAULT_KITBOOK_ROUTES } from './constants';

export function kitbookPlugin({ routes, mdsvexConfig }: {
  routes?: string;
  mdsvexConfig?: MdsvexOptions;
} = {}): Plugin {
  // let config: ResolvedConfig;
  const routesDirectory = routes || DEFAULT_KITBOOK_ROUTES;
  const isKitbookMode = process.env.npm_lifecycle_script?.includes('--mode kitbook');
  if (isKitbookMode) initKitbook(routesDirectory);

  return {
    name: 'vite-plugin-svelte-kitbook',
    enforce: 'pre',

    // apply(config, { mode }) {
    //   return mode === 'kitbook';
    // },

    config: (config, { mode }) => {
      if (mode === 'kitbook') return kitbookModifications(config, routesDirectory)
    },

    api: {
      sveltePreprocess: isKitbookMode && mdsvex(mdsvexConfig || defaultKitbookMdsvexConfig),
    },

    // configResolved(resolvedConfig) {
      // config = resolvedConfig
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

function kitbookModifications(config: UserConfig, routesDirectory: string): UserConfig {
  return {
    server: {
      port: config?.server?.port || 4321,
      fs: {
        allow: ['..'], // one level up from the project root for displaying README.md
      }
    },
    define: {
      __KitbookRoutes__: JSON.stringify(routesDirectory),
    }
  }
}