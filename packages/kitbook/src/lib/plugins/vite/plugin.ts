import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'
import type { KitbookSettings } from '../../kitbook-types'
import { serializeSettings } from '../../open/serialize.js'
import { initKitbook } from './initKitbook.js'
import { modifyViteConfigForKitbook } from './modifyViteConfigForKitbook.js'
import { DEFAULT_IMPORT_MODULE_GLOBS } from './constants.js'
import { writeModuleGlobsIntoVirtualModuleCode } from './writeModuleGlobsIntoVirtualModuleCode.js'
import { kitbookViewer } from './viewer/index.js'
import { markdownToHtml } from './markdown/markdownToHtml.js'
import { mergeUserSettingsWithDefaults } from './mergeUserSettingsWithDefaults.js'
import { bold, green, reset } from './colors'

const LOAD_MODULES_ID = 'virtual:kitbook'

/**
 * Vite plugin to add a Kitbook to SvelteKit projects. Will automatically add Kitbook routes to `src/routes/kitbook` unless you update the `routesDirectory` and `kitbookRoute` settings.
 */
export function kitbook(userSettings: Partial<KitbookSettings> = {}): Plugin[] {
  const settings = mergeUserSettingsWithDefaults(userSettings)
  initKitbook(settings)

  const kitbookMain: Plugin = {
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
        return { code: `export const html = \`${markdownToHtml(code)}\`` }
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

    configureServer(server) {
      if (settings.kitbookRoute) {
        const originalPrint = server.printUrls
        server.printUrls = () => {
          originalPrint()
          console.info(`  ${green}➜${reset}  ${bold}Kitbook${reset}: ${green}${server.config.server.https ? 'https' : 'http'}://localhost:${bold}${server.config.server.port}${reset}${green}${settings.kitbookRoute}${reset}`)
        }
      }
    },
  }

  return [
    kitbookMain,
    kitbookViewer(settings),
  ]
}

function addVirtualFilePrefix(id: string): string {
  return `\0${id}`
}
