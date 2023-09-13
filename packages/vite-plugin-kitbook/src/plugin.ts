import type { Plugin } from 'vite';
import { initKitbook } from './initKitbook';
import { modifyViteConfigForKitbook } from './modifyViteConfigForKitbook';
import virtualImportModulesContent from './virtual/importModulesStringified';
import { RESOLVED_VIRTUAL_MODULES_IMPORT_ID, VIRTUAL_MODULES_IMPORT_ID, DEFAULT_IMPORT_MODULE_GLOBS, VIRTUAL_SETTINGS_IMPORT_ID, RESOLVED_VIRTUAL_SETTINGS_IMPORT_ID } from './constants';
import { writeModuleGlobsIntoVirtualModuleCode } from './writeModuleGlobsIntoVirtualModuleCode';
import { KitbookSettings } from './types';

/**
 * Vite plugin to add a Kitbook to SvelteKit projects. Will automatically add Kitbook routes wherever you have a folder titled `kitbook` somewhere in your `src/routes` directory. If none exists, `src/routes/kitbook` will be used.
*/
export function kitbookPlugin(config: KitbookSettings): Plugin {
  initKitbook(config.isKitbookItself);

  // const ready = loadKitbookConfig(config);

  return {
    name: 'vite-plugin-svelte-kitbook',
    enforce: 'pre',

    config: modifyViteConfigForKitbook,

    resolveId(id) {
      if (id === VIRTUAL_MODULES_IMPORT_ID) {
        return RESOLVED_VIRTUAL_MODULES_IMPORT_ID
      }
      if (id === VIRTUAL_SETTINGS_IMPORT_ID) {
        return RESOLVED_VIRTUAL_SETTINGS_IMPORT_ID
      }
    },

    load(id) {
      // const { config } = await ready;
      if (id === RESOLVED_VIRTUAL_SETTINGS_IMPORT_ID) {
        return `export const settings = ${JSON.stringify(config)}`
      }

      if (id === RESOLVED_VIRTUAL_MODULES_IMPORT_ID) {
        return writeModuleGlobsIntoVirtualModuleCode(virtualImportModulesContent, config.importModuleGlobs || DEFAULT_IMPORT_MODULE_GLOBS);
      }
    },
  }
}

// function loadKitbookConfig(_config?: KitbookSettings): Promise<{ config: KitbookSettings, sources: string[] }> {
//   if (_config) {
//     return Promise.resolve({
//       config: _config,
//       sources: [],
//     })
//   }

//   return loadConfig({
//     sources: [
//       {
//         files: 'kitbook.config',
//         extensions: ['ts', 'js'],
//       },
//       // {
//       //   files: 'vite.config',
//       //   async rewrite(config) {
//       //     const resolved = await (typeof config === 'function' ? config() : config)
//       //     return resolved?.kitbook
//       //   },
//       // },
//     ],
//     merge: false,
//   }) as Promise<{ config: KitbookSettings, sources: string[] }>;
// }
