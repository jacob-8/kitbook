// Learn from https://vitejs.dev/guide/api-plugin.html#simple-examples
import type { Plugin, ResolvedConfig, UserConfig } from 'vite'
import { initKitbook } from './initKitbook.js';

const viteConfigModications: UserConfig = {
  server: {
    port: 4321,
    fs: {
      allow: ['..'], // one level up from the project root for displaying README.md
    }
  }
}

export function kitbookPlugin(): Plugin {
  initKitbook();
  // let config: ResolvedConfig;

  return {
    name: 'vite-plugin-svelte-kitbook',
    enforce: 'pre',

    config: (config, { mode }) => {
      if (mode === 'kitbook') return viteConfigModications
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
