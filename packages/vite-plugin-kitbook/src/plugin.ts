import type { Plugin } from 'vite'
import { initKitbook } from './initKitbook'
import { modifyViteConfigForKitbook } from './modifyViteConfigForKitbook'
import virtualImportModulesContent from './virtual/importModulesStringified'
import { DEFAULT_IMPORT_MODULE_GLOBS, DEFAULT_VIEWPORTS, RESOLVED_VIRTUAL_MODULES_IMPORT_ID, RESOLVED_VIRTUAL_SETTINGS_IMPORT_ID, VIRTUAL_MODULES_IMPORT_ID, VIRTUAL_SETTINGS_IMPORT_ID } from './constants'
import { writeModuleGlobsIntoVirtualModuleCode } from './writeModuleGlobsIntoVirtualModuleCode'
import type { KitbookSettings } from './types'
import { kitbookViewer } from './viewer'

/**
 * Vite plugin to add a Kitbook to SvelteKit projects. Will automatically add Kitbook routes wherever you have a folder titled `kitbook` somewhere in your `src/routes` directory. If none exists, `src/routes/kitbook` will be used.
 */
export function kitbookPlugin(config: KitbookSettings = { title: 'Kitbook', description: 'Component workbench', viewports: DEFAULT_VIEWPORTS }): Plugin[] {
  initKitbook(config)

  const plugin: Plugin = {
    name: 'vite-plugin-svelte-kitbook',
    enforce: 'pre',

    config: modifyViteConfigForKitbook,

    resolveId(id) {
      if (id === VIRTUAL_MODULES_IMPORT_ID)
        return RESOLVED_VIRTUAL_MODULES_IMPORT_ID

      if (id === VIRTUAL_SETTINGS_IMPORT_ID)
        return RESOLVED_VIRTUAL_SETTINGS_IMPORT_ID
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_SETTINGS_IMPORT_ID)
        return `export const settings = ${JSON.stringify(config)}`

      if (id === RESOLVED_VIRTUAL_MODULES_IMPORT_ID)
        return writeModuleGlobsIntoVirtualModuleCode(virtualImportModulesContent, config.importModuleGlobs || DEFAULT_IMPORT_MODULE_GLOBS)
    },
  }

  return [plugin, kitbookViewer(config)]
}
