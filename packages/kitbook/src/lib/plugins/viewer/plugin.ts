import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'
import type { KitbookPluginContext } from '../vite.js'

const LOAD_VIEWER_ID = 'virtual:kitbook-load-viewer.js'
const RESOLVED_LOAD_VIEWER_ID = `\0${LOAD_VIEWER_ID}`

export function ViewerPlugin({ settings }: KitbookPluginContext): Plugin {
  return {
    name: 'vite-plugin-kitbook:viewer',
    apply: 'serve',
    enforce: 'pre',

    resolveId(id) {
      if (id === LOAD_VIEWER_ID)
        return RESOLVED_LOAD_VIEWER_ID
    },

    load(id) {
      if (id === RESOLVED_LOAD_VIEWER_ID)
        return `import { loadViewer } from 'kitbook/viewer/load-viewer';loadViewer(${JSON.stringify(settings)})`
    },

    transform(code, id) {
      if (id.includes('vite/dist/client/client.mjs'))
        return { code: `${componentListenerCode()}\n${code}\nimport('${LOAD_VIEWER_ID}')` }
    },

    configureServer(server) {
      server.ws.on('kitbook:to-server:tools:request-component-details', (data) => {
        server.ws.send('kitbook:to-client:tools:request-component-details', data)
      })
      server.ws.on('kitbook:to-server:tools:send-component-details', (data) => {
        server.ws.send('kitbook:to-client:tools:send-component-details', data)
      })
      server.ws.on('kitbook:to-server:tools:change-state', (data) => {
        server.ws.send('kitbook:to-client:tools:change-state', data)
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
