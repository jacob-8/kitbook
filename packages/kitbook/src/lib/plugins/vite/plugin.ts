import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'
import type { KitbookSettings } from '../../kitbook-types'
import { initKitbook } from './initKitbook.js'
import { modifyViteConfigForKitbook } from './modifyViteConfigForKitbook.js'
import { DEFAULT_IMPORT_MODULE_GLOBS, DEFAULT_KITBOOK_ROUTE, DEFAULT_ROUTES_DIR, DEFAULT_VIEWPORTS, VirtualModules } from './constants.js'
import { writeModuleGlobsIntoVirtualModuleCode } from './writeModuleGlobsIntoVirtualModuleCode.js'
import { kitbookViewer } from './viewer/index.js'
import { DEFAULT_VIEWER_OPTIONS } from './viewer/options'

/**
 * Vite plugin to add a Kitbook to SvelteKit projects. Will automatically add Kitbook routes to `src/routes/kitbook` unless you update the `routesDirectory` and `kitbookRoute` settings.
 */
export function kitbook(userSettings: Partial<KitbookSettings> = {}): Plugin[] {
  const settings: KitbookSettings = {
    title: 'Kitbook',
    description: 'Component workbench',
    viewports: DEFAULT_VIEWPORTS,
    routesDirectory: DEFAULT_ROUTES_DIR,
    kitbookRoute: DEFAULT_KITBOOK_ROUTE,
    ...userSettings,
    viewer: {
      ...DEFAULT_VIEWER_OPTIONS,
      ...userSettings.viewer || {},
    },
  }
  initKitbook(settings)

  const plugin: Plugin = {
    name: 'vite-plugin-kitbook',
    enforce: 'pre',

    configResolved(config) {
      settings.viewer.__internal = {
        viteBase: config.base?.replace(/\/$/, '') || '',
      }
    },

    config: modifyViteConfigForKitbook,

    resolveId(id) {
      if (Object.values(VirtualModules).includes(id as VirtualModules))
        return addVirtualFilePrefix(id)
    },

    load(id) {
      if (id === addVirtualFilePrefix(VirtualModules.KITBOOK_SETTINGS))
        return `export const settings = ${JSON.stringify(settings)}`

      if (id === addVirtualFilePrefix(VirtualModules.KITBOOK_MODULES)) {
        const _dirname = dirname(fileURLToPath(import.meta.url))
        const filepath = resolve(_dirname, './virtual/importModules.js')
        const content = readFileSync(filepath, 'utf-8')
        return writeModuleGlobsIntoVirtualModuleCode(content, settings.importModuleGlobs || DEFAULT_IMPORT_MODULE_GLOBS)
      }

      if (id === addVirtualFilePrefix(VirtualModules.KITBOOK_TEMPLATES))
        return `export const variants = \`${getVariantsTemplate()}\``
    },
  }

  return [plugin, kitbookViewer(settings)]
}

function addVirtualFilePrefix(id: string): string {
  return `\0${id}`
}

function getVariantsTemplate() {
  const _dirname = dirname(fileURLToPath(import.meta.url))
  try {
    const filepath = resolve(_dirname, './virtual/Template.variants.js')
    return readFileSync(filepath, 'utf-8')
  }
  catch {
    const filepath = resolve(_dirname, './virtual/Template.variants.ts') // for when developing on Kitbook itself
    return readFileSync(filepath, 'utf-8')
  }
}
