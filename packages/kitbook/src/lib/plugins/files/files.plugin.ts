import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { access, constants, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import type { Plugin } from 'vite'
import type { KitbookPluginContext } from '../vite.js'
import { removeQuotesFromSerializedFunctions } from '../../open/serialize.js'

export function FilesPlugin({ rpc_functions, settings }: KitbookPluginContext): Plugin {
  function writeFileIfNeededThenOpen(filepath: string, template: string) {
    access(filepath, constants.F_OK, (err) => {
      if (err) {
        const directory = dirname(filepath)
        mkdirSync(directory, { recursive: true })
        writeFileSync(filepath, template)
        console.info(`added ${filepath}`)
      }

      const file_location = `${filepath}:1:1`
      const open_in_editor_url = `${settings.viewer.__internal.viteBase}/__open-in-editor?file=${encodeURIComponent(file_location)}`
      rpc_functions.open_in_editor(open_in_editor_url)
    })
  }

  rpc_functions.open_or_create_variant = ({ filepath, props }) => {
    const props_without_newlines_tabs = JSON.stringify(props || {}, null, 2)
      .replace(/\\n/g, '').replace(/\\t/g, '')
    const code = getVariantsTemplate().replace('shared = {}', `shared = ${props_without_newlines_tabs}`)
    const code_with_component_reference = code.replace('Template.svelte', filepath.split('/').pop())
    const template = removeQuotesFromSerializedFunctions(code_with_component_reference)

    const variantsPath = filepath
      .replace('.svelte', '.variants.ts')
      .replace('+page', '_page')
      .replace('+layout', '_layout')

    writeFileIfNeededThenOpen(variantsPath, template)
  }

  rpc_functions.open_or_create_file = ({ filepath, template }) => {
    writeFileIfNeededThenOpen(filepath, template)
  }

  return {
    name: 'vite-plugin-kitbook:files',
    enforce: 'pre',
    apply: 'serve',
  }
}

function getVariantsTemplate() {
  const _dirname = dirname(fileURLToPath(import.meta.url))
  const filepath = resolve(_dirname, '../virtual/Template.variants.ts.txt')
  return readFileSync(filepath, 'utf-8')
}
