import type { Plugin, ResolvedConfig, UserConfig } from 'vite'
import { initKitbook } from './initKitbook';
import virtualImportModulesContent from './virtual/importModulesStringified';

// import { readFileSync } from 'fs';
// import { dirname, resolve } from 'path'
// import { fileURLToPath } from 'url'
// const _dirname = typeof __dirname !== 'undefined'
//   ? __dirname
//   : dirname(fileURLToPath(import.meta.url))

import { mdsvex, type MdsvexOptions } from 'mdsvex';
import defaultKitbookMdsvexConfig from './mdsvex/mdsvex.config';
import { modifyViteConfigForKitbook } from './modifyViteConfigForKitbook';

export function kitbookPlugin({ userSpecifiedViteConfigAdjustments, mdsvexConfig }: {
  userSpecifiedViteConfigAdjustments?: UserConfig;
  mdsvexConfig?: MdsvexOptions;
} = {}): Plugin {
  const virtualImportModulesId = 'virtual:kitbook-modules';
  const resolvedVirtualImportModulesId = '\0' + virtualImportModulesId;
  // const virtualImportModulesContentPath = resolve(_dirname, './importModules.mjs');
  // const virtualModuleContent = readFileSync(virtualImportModulesContentPath, 'utf-8');

  // let config: ResolvedConfig;

  const isKitbookMode = process.env.npm_lifecycle_script?.includes('--mode kitbook');
  if (isKitbookMode) initKitbook();

  return {
    name: 'vite-plugin-svelte-kitbook',
    enforce: 'pre',

    apply(config, { mode }) {
      return mode === 'kitbook';
    },

    config: (config, { mode }) => {
      if (mode === 'kitbook') return modifyViteConfigForKitbook(userSpecifiedViteConfigAdjustments)
    },

    api: {
      sveltePreprocess: isKitbookMode && mdsvex(mdsvexConfig || defaultKitbookMdsvexConfig),
    },

    resolveId(id) {
      if (id === virtualImportModulesId) {
        return resolvedVirtualImportModulesId
      }
    },
    load(id) {
      if (id === resolvedVirtualImportModulesId) {
        return virtualImportModulesContent;
      }
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

