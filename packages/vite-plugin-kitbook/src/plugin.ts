import type { Plugin, UserConfig } from 'vite';

import { mdsvex, type MdsvexOptions } from 'mdsvex';
import defaultKitbookMdsvexConfig from './mdsvex/mdsvex.config';

import { initKitbook } from './initKitbook';
import { modifyViteConfigForKitbook } from './modifyViteConfigForKitbook';
import virtualImportModulesContent from './virtual/importModulesStringified';
import { RESOLVED_VIRTUAL_MODULES_IMPORT_ID, VIRTUAL_MODULES_IMPORT_ID } from './constants';

export function kitbookPlugin({ userSpecifiedViteConfigAdjustments, mdsvexConfig }: {
  userSpecifiedViteConfigAdjustments?: UserConfig;
  mdsvexConfig?: MdsvexOptions;
} = {}): Plugin {
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
      if (id === VIRTUAL_MODULES_IMPORT_ID) {
        return RESOLVED_VIRTUAL_MODULES_IMPORT_ID
      }
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULES_IMPORT_ID) {
        return virtualImportModulesContent;
      }
    },

    // transform(src, id) {
    //   console.log(id)
    //   return {
    //     code: src,
    //   }
    // }
  }
}

