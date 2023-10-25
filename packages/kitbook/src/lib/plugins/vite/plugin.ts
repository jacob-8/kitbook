import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'
import type { KitbookSettings } from '../../kitbook-types'
import { serializeSettings } from '../../open/serialize.js'
import { initKitbook } from './initKitbook.js'
import { modifyViteConfigForKitbook } from './modifyViteConfigForKitbook.js'
import { DEFAULT_IMPORT_MODULE_GLOBS, DEFAULT_KITBOOK_ROUTE, DEFAULT_ROUTES_DIR, DEFAULT_VIEWPORTS, UNSET_LANGUAGE } from './constants.js'
import { writeModuleGlobsIntoVirtualModuleCode } from './writeModuleGlobsIntoVirtualModuleCode.js'
import { kitbookViewer } from './viewer/index.js'
import { DEFAULT_VIEWER_OPTIONS } from './viewer/options.js'
import { markdownToHtml } from './markdown/markdownToHtml'

const LOAD_MODULES_ID = 'virtual:kitbook'

/**
 * Vite plugin to add a Kitbook to SvelteKit projects. Will automatically add Kitbook routes to `src/routes/kitbook` unless you update the `routesDirectory` and `kitbookRoute` settings.
 */
export function kitbook(userSettings: Partial<KitbookSettings> = {}): Plugin[] {
  checkLanguageSetup(userSettings)
  const settings: KitbookSettings = {
    title: 'Kitbook',
    description: 'Component workbench',
    viewports: DEFAULT_VIEWPORTS,
    routesDirectory: DEFAULT_ROUTES_DIR,
    kitbookRoute: DEFAULT_KITBOOK_ROUTE,
    languages: [UNSET_LANGUAGE],
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

    transform(code, id) {
      if (id.endsWith('.md'))
        return { code: `export const html = "${markdownToHtml(code)}"` }
    },

    resolveId(id) {
      if (id === LOAD_MODULES_ID)
        return addVirtualFilePrefix(LOAD_MODULES_ID)
    },

    load(id) {
      if (id === addVirtualFilePrefix(LOAD_MODULES_ID)) {
        const _dirname = dirname(fileURLToPath(import.meta.url))
        const filepath = resolve(_dirname, './virtual/importModules.js')
        const content = readFileSync(filepath, 'utf-8')
        const pageModulesCode = writeModuleGlobsIntoVirtualModuleCode(content, settings.importModuleGlobs || DEFAULT_IMPORT_MODULE_GLOBS)

        return `${pageModulesCode}
        export const settings = ${serializeSettings(settings)}
        `
      }
    },
  }

  return [plugin, kitbookViewer(settings)]
}

function addVirtualFilePrefix(id: string): string {
  return `\0${id}`
}

function checkLanguageSetup({ languages, addLanguageToUrl }: Partial<KitbookSettings>) {
  if (languages?.length === 0)
    throw new Error('Kitbook: Do not pass an empty `languages` array in your config.')

  const hasLanguages = languages?.length
  const hasLanguageFunction = addLanguageToUrl && typeof addLanguageToUrl === 'function'

  if (!hasLanguages && hasLanguageFunction)
    throw new Error('Kitbook config is missing `languages`. You must provide a `languages` array to be used by the `addLanguageToUrl`.')

  if (hasLanguages && !hasLanguageFunction)
    throw new Error('Kitbook config is missing `addLanguageToUrl` function. You must provide a `addLanguageToUrl` function for Kitbook to know how to add your `languages` to each sandboxed url.')
}
