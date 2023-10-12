import { access, constants, writeFileSync } from 'node:fs'
import type { Plugin } from 'vite'
import type { ViewerOptions } from './options'
import { DEFAULT_VIEWER_OPTIONS } from './options'

const LOAD_VIEWER_ID = 'virtual:kitbook-load-viewer.js'
const RESOLVED_LOAD_VIEWER_ID = `\0${LOAD_VIEWER_ID}`

export function kitbookViewer(userChosenOptions: ViewerOptions, isKitbookItself: boolean): Plugin {
  const viewerOptions: ViewerOptions = {
    ...DEFAULT_VIEWER_OPTIONS,
    ...userChosenOptions || {},
  }

  return {
    name: 'vite-plugin-kitbook-viewer',
    apply: 'serve',
    enforce: 'pre',

    configResolved(config) {
      viewerOptions.__internal = {
        viteBase: config.base?.replace(/\/$/, '') || '',
        kitbookRoot: isKitbookItself ? '' : '/kitbook',
      }
    },

    async resolveId(id) {
      if (id === LOAD_VIEWER_ID)
        return RESOLVED_LOAD_VIEWER_ID
    },

    async load(id) {
      if (id === RESOLVED_LOAD_VIEWER_ID)
        return `import { loadViewer } from 'kitbook/viewer/load-viewer';loadViewer(${JSON.stringify(viewerOptions)})`
    },

    transform(code, id) {
      if (id.includes('vite/dist/client/client.mjs'))
        return { code: `${code}\nimport('${LOAD_VIEWER_ID}')` }
    },

    configureServer(server) {
      server.ws.on('kitbook:ensure-file-exists', ({ filename, template }, client) => {
        access(filename, constants.F_OK, (err) => {
          if (err) {
            console.log({ creating: filename })
            writeFileSync(filename, template)
          }
          client.send('kitbook:open-file', { filename })
        })
      })
    },
  }
}
