import { access, constants, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'
import type { KitbookSettings } from 'kitbook'
import { removeQuotesFromSerializedFunctions } from '../../../open/serialize.js'

const LOAD_VIEWER_ID = 'virtual:kitbook-load-viewer.js'
const RESOLVED_LOAD_VIEWER_ID = `\0${LOAD_VIEWER_ID}`

export function kitbookViewer(settings: KitbookSettings): Plugin {
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
      server.ws.on('kitbook:ensure-file-exists', ({ filepath, template }, client) => {
        writeFileIfNeededThenOpen(filepath, template, settings.viewer.__internal.viteBase, client)
      })

      server.ws.on('kitbook:open-variants', ({ filepath, props }, client) => {
        const code = getVariantsTemplate().replace('props: {}', `props: ${JSON.stringify(props, null, 2)}`)
        const template = removeQuotesFromSerializedFunctions(code.replace('Template.svelte', filepath.split('/').pop()))

        const variantsPath = filepath
          .replace('.svelte', '.variants.ts')
          .replace('+page', '_page')
          .replace('+layout', '_layout')

        writeFileIfNeededThenOpen(variantsPath, template, settings.viewer.__internal.viteBase, client)
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

function writeFileIfNeededThenOpen(filepath: string, template: string, viteBase: string, client: any) {
  access(filepath, constants.F_OK, (err) => {
    if (err) {
      const directory = dirname(filepath)
      mkdirSync(directory, { recursive: true })
      writeFileSync(filepath, template)
      console.info(`added ${filepath}`)
    }

    client.send('kitbook:open-file', { filepath, viteBase })
  })
}

// import { generateCode, parseModule } from 'magicast'
// magicast breaks the build - need to debug
// const module = parseModule(VariantsTemplate)
// module.exports.variants[0].props = serializedState
// const { code } = generateCode(module)

function getVariantsTemplate() {
  const _dirname = dirname(fileURLToPath(import.meta.url))
  const filepath = resolve(_dirname, '../virtual/Template.variants.ts.txt')
  return readFileSync(filepath, 'utf-8')
}
