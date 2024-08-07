import type { Plugin } from 'vite'
import type { KitbookSettings } from '../../kitbook-types'
import { serializeSettings } from '../../open/serialize.js'
import { bold, green, reset } from '../utils/colors.js'
import { modifyViteConfigForKitbook } from './modifyViteConfigForKitbook.js'
import { markdownToHtml } from './markdown/markdownToHtml.js'

const LOAD_MODULES_ID = 'virtual:kitbook' // only has serialized settings

export function MainPlugin(settings: KitbookSettings): Plugin {
  return {
    name: 'vite-plugin-kitbook:main',
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
      if (id === addVirtualFilePrefix(LOAD_MODULES_ID))
        return `export const settings = ${serializeSettings(settings)}`
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
    },
  }
}

function addVirtualFilePrefix(id: string): string {
  return `\0${id}`
}
