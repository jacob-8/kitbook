import type { Plugin } from 'vite';
import { initKitbook } from './initKitbook';
import { modifyViteConfigForKitbook } from './modifyViteConfigForKitbook';
import virtualImportModulesContent from './virtual/importModulesStringified';
import { RESOLVED_VIRTUAL_MODULES_IMPORT_ID, VIRTUAL_MODULES_IMPORT_ID, DEFAULT_IMPORT_MODULE_GLOBS } from './constants';
import { writeModuleGlobsIntoVirtualModuleCode } from './writeModuleGlobsIntoVirtualModuleCode';

/**
 * Vite plugin to add a Kitbook to SvelteKit projects. Requires you to have a folder titled `kitbook` somewhere in your `src/routes` directory. We recommend `src/routes/kitbook`.
 * @param {string[]} [options.importModuleGlobs] - An array of Vite glob patterns for building your Kitbook. See https://vitejs.dev/guide/features.html#multiple-patterns. Defaults to ['/src/**_/*.{md,svx,svelte,variants.ts}', '/README.md']. Adjust this to be able to incrementally adopt Kitbook into your project. << ignore the underscore in the glob pattern, it's just there to make the JSDoc comment work.
 * @param {boolean} [options.isKitbookItself] - Don't Use - Only for internal use in the original Kitbook package
*/
export function kitbookPlugin({
  importModuleGlobs, isKitbookItself
}: {
  importModuleGlobs?: string[];
  isKitbookItself?: boolean;
} = {}): Plugin {
  initKitbook(isKitbookItself);

  return {
    name: 'vite-plugin-svelte-kitbook',
    enforce: 'pre',

    config: modifyViteConfigForKitbook,

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
  }
}
