import type { Plugin } from 'vite'
import type { KitbookSettings } from '../../kitbook-types'
import { serializeSettings } from '../../open/serialize.js'
import { initKitbook } from './initKitbook.js'
import { modifyViteConfigForKitbook } from './modifyViteConfigForKitbook.js'
import { kitbookViewer } from './viewer/index.js'
import { markdownToHtml } from './markdown/markdownToHtml.js'
import { mergeUserSettingsWithDefaults } from './mergeUserSettingsWithDefaults.js'
import { bold, green, reset } from './colors.js'

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

    async transform(code, id) {
      if (id.endsWith('.md')) {
        if (id.endsWith('README.md'))
          code = code.replace(/<!-- Kitbook Skip -->[\s\S]*<!-- Kitbook Skip End -->/g, '')
        const html = await markdownToHtml(code)
        return { code: `export const html = \`${html}\`` }
      }
    },

    resolveId(id) {
      if (id === LOAD_MODULES_ID)
        return addVirtualFilePrefix(LOAD_MODULES_ID)
    },

    load(id) {
      if (id === addVirtualFilePrefix(LOAD_MODULES_ID)) {
        return `
        export const settings = ${serializeSettings(settings)}
        `
      }
    },

    configureServer(server) {
      const { kitbookRoute, addLanguageToUrl, languages } = settings
      if (kitbookRoute) {
        const languageAwareRoute = addLanguageToUrl ? addLanguageToUrl({ code: languages[0].code, url: kitbookRoute }) : kitbookRoute
        const originalPrint = server.printUrls
        server.printUrls = () => {
          originalPrint()
          console.info(`  ${green}➜${reset}  ${bold}Kitbook${reset}: ${green}${server.config.server.https ? 'https' : 'http'}://localhost:${bold}${server.config.server.port}${reset}${green}${languageAwareRoute}${reset}`)
        }
      }

      server.watcher.on('change', (filepath) => {
        server.hot.send('kitbook:route-to-edited-file', { filepath })
      })
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
