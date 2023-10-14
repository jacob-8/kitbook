import { access, constants, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'
import type { KitbookSettings } from 'kitbook'
import { DEFAULT_VIEWER_OPTIONS } from './options.js'

const LOAD_VIEWER_ID = 'virtual:kitbook-load-viewer.js'
const RESOLVED_LOAD_VIEWER_ID = `\0${LOAD_VIEWER_ID}`

export function kitbookViewer(userSettings: KitbookSettings): Plugin {
  const settings: KitbookSettings = {
    ...userSettings,
    viewer: {
      ...DEFAULT_VIEWER_OPTIONS,
      ...userSettings.viewer || {},
    },
  }

  return {
    name: 'vite-plugin-kitbook:viewer',
    apply: 'serve',
    enforce: 'pre',

    configResolved(config) {
      settings.viewer.__internal = {
        viteBase: config.base?.replace(/\/$/, '') || '',
      }
    },

    async resolveId(id) {
      if (id === LOAD_VIEWER_ID)
        return RESOLVED_LOAD_VIEWER_ID
    },

    async load(id) {
      if (id === RESOLVED_LOAD_VIEWER_ID)
        return `import { loadViewer } from 'kitbook/viewer/load-viewer';loadViewer(${JSON.stringify(settings)})`
    },

    transform(code, id) {
      if (id.includes('vite/dist/client/client.mjs'))
        return { code: `${componentListenerCode()}\n${code}\nimport('${LOAD_VIEWER_ID}')` }
    },

    configureServer(server) {
      server.ws.on('kitbook:ensure-file-exists', ({ filename, template }, client) => {
        access(filename, constants.F_OK, (err) => {
          if (err)
            writeFileSync(filename, template)

          client.send('kitbook:open-file', { filename })
        })
      })
    },
  }
}

// script must be inlined to guarantee it runs before any Svelte components are registered
function componentListenerCode(): string {
  const _dirname = dirname(fileURLToPath(import.meta.url))
  const filepath = resolve(_dirname, './listenForComponentsElements.js')
  return readFileSync(filepath, 'utf-8')
}
