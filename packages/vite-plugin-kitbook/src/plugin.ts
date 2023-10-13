import type { Plugin } from 'vite'
import { initKitbook } from './initKitbook'
import { modifyViteConfigForKitbook } from './modifyViteConfigForKitbook'
import virtualImportModulesContent from './virtual/importModulesStringified'
import { DEFAULT_IMPORT_MODULE_GLOBS, DEFAULT_KITBOOK_ROUTE, DEFAULT_ROUTES_DIR, DEFAULT_VIEWPORTS, RESOLVED_VIRTUAL_MODULES_IMPORT_ID, RESOLVED_VIRTUAL_SETTINGS_IMPORT_ID, VIRTUAL_MODULES_IMPORT_ID, VIRTUAL_SETTINGS_IMPORT_ID } from './constants'
import { writeModuleGlobsIntoVirtualModuleCode } from './writeModuleGlobsIntoVirtualModuleCode'
import type { KitbookSettings } from './types'
import { kitbookViewer } from './viewer'

/**
 * Vite plugin to add a Kitbook to SvelteKit projects. Will automatically add Kitbook routes to `src/routes/kitbook` unless you update the `routesDirectory` and `kitbookRoute` settings.
 */
export function kitbookPlugin(userSettings: KitbookSettings): Plugin[] {
  const settings: KitbookSettings = {
    title: 'Kitbook',
    description: 'Component workbench',
    viewports: DEFAULT_VIEWPORTS,
    routesDirectory: DEFAULT_ROUTES_DIR,
    kitbookRoute: DEFAULT_KITBOOK_ROUTE,
    ...userSettings,
  }
  initKitbook(settings)

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
        return `export const settings = ${JSON.stringify(settings)}`

      if (id === RESOLVED_VIRTUAL_MODULES_IMPORT_ID)
        return writeModuleGlobsIntoVirtualModuleCode(virtualImportModulesContent, settings.importModuleGlobs || DEFAULT_IMPORT_MODULE_GLOBS)
    },
  }

  return [plugin, kitbookViewer(settings)]
}
