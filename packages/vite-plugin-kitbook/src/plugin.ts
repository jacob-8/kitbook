import type { Plugin, UserConfig } from 'vite';

import { mdsvex, type MdsvexOptions } from 'mdsvex';
import DEFAULT_KITBOOK_MDSVEX_CONFIG from './mdsvex/mdsvex.config';

import { initKitbook } from './initKitbook';
import { modifyViteConfigForKitbook } from './modifyViteConfigForKitbook';
import virtualImportModulesContent from './virtual/importModulesStringified';
import { RESOLVED_VIRTUAL_MODULES_IMPORT_ID, VIRTUAL_MODULES_IMPORT_ID, DEFAULT_IMPORT_MODULE_GLOBS } from './constants';
import { writeModuleGlobsIntoVirtualModuleCode } from './writeModuleGlobsIntoVirtualModuleCode';

/**
 * Creates a Vite plugin that enables Kitbook mode for SvelteKit projects.
 * @param {string[]} [options.fileGlobs] - An array of Vite glob patterns for building your Kitbook. See https://vitejs.dev/guide/features.html#multiple-patterns. Defaults to ['/src/**_/*.{md,svx,svelte,variants.ts}', '/README.md']. Adjust this to be able to incrementally adopt Kitbook into your project. << ignore the underscore in the glob pattern, it's just there to make the JSDoc comment work.
 * @param {UserConfig} [options.viteConfigAdjustments] - Adjust the Vite Config when running Kitbook. Useful for changing settings like the port that you don't want changed in your regular app.
 * @param {MdsvexOptions} [options.mdsvexConfig] - Override the default Kitbook MdsvexConfig with your own.
*/
export function kitbookPlugin({
  fileGlobs: importModuleGlobs, viteConfigAdjustments, mdsvexConfig
}: {
  fileGlobs?: string[];
  viteConfigAdjustments?: UserConfig;
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
      if (mode === 'kitbook') return modifyViteConfigForKitbook(viteConfigAdjustments)
    },

    api: {
      sveltePreprocess: isKitbookMode && mdsvex(mdsvexConfig || DEFAULT_KITBOOK_MDSVEX_CONFIG),
    },

    resolveId(id) {
      if (id === VIRTUAL_MODULES_IMPORT_ID) {
        return RESOLVED_VIRTUAL_MODULES_IMPORT_ID
      }
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULES_IMPORT_ID) {
        return writeModuleGlobsIntoVirtualModuleCode(virtualImportModulesContent, importModuleGlobs || DEFAULT_IMPORT_MODULE_GLOBS);
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
