import { settings } from 'virtual:kitbook-settings'
import { variants as variantsTemplate } from 'virtual:kitbook-templates'
import { removeQuotesFromSerializedFunctions, serialize } from './serialize'

// import { generateCode, parseModule } from 'magicast'

export function openComponent(filename: string) {
  const file_loc = `${filename}:1:1`
  fetch(`${settings.viewer.__internal.viteBase}/__open-in-editor?file=${encodeURIComponent(file_loc)}`)
}

export function openVariantsWithoutProps(path: string) {
  const modifiedTemplate = variantsTemplate.replace('Template.svelte', path.split('/').pop())
  const variantsPath = path.replace('.svelte', '.variants.ts')
  ensureFileExists(variantsPath, modifiedTemplate)
}

export function openVariants(filename: string, variantsFilename: string, componentDetail: SvelteComponentDetail) {
  const { props } = componentDetail.options
  const state = componentDetail.component.$capture_state()
  const serializedState = serialize(props, state)

  // magicast breaks the build - need to debug
  // const module = parseModule(VariantsTemplate)
  // module.exports.variants[0].props = serializedState
  // const { code } = generateCode(module)

  const code = variantsTemplate.replace('props: {}', `props: ${JSON.stringify(serializedState, null, 2)}`)
  const modifiedTemplate = removeQuotesFromSerializedFunctions(code.replace('Template.svelte', filename.split('/').pop()))
  ensureFileExists(variantsFilename, modifiedTemplate)
}

export function openSvx(filename: string) {
  const markdownTemplate = 'You can write some documentation for your component here using Markdown. Feel free to also change the extension to .svx and use Svelte in your Markdown if you\'ve installed MDSvex.'
  ensureFileExists(filename, markdownTemplate)
}

function ensureFileExists(filename: string, template: string) {
  if (!import.meta.hot)
    return alert('Dev server must be running with HMR enabled to use this feature.')

  import.meta.hot.send('kitbook:ensure-file-exists', { filename, template })
}

if (import.meta.hot) {
  import.meta.hot.on('kitbook:open-file', ({ filename }) => {
    const file_loc = `${filename}:1:1`
    fetch(`${settings.viewer.__internal.viteBase}/__open-in-editor?file=${encodeURIComponent(file_loc)}`)
  })
}

// function createComposition() {
//   const compositionName = prompt('Enter a name for the composition file:')
//   if (!compositionName)
//     return
//   const compositionFilename = filename.replace('.svelte', `${compositionName}.composition.svelte`)
//   ensureFileExists(compositionFilename, 'TODO')
// }
