import { serialize } from './serialize'

export function openComponent(filepath: string, viteBase: string) {
  const file_loc = `${filepath}:1:1`
  fetch(`${viteBase}/__open-in-editor?file=${encodeURIComponent(file_loc)}`)
}

export function openVariants(filepath: string, componentDetail?: SvelteComponentDetail) {
  if (!import.meta.hot)
    return alert('Dev server must be running with HMR enabled to use this feature.')

  if (!componentDetail?.options)
    return import.meta.hot.send('kitbook:open-variants', { filepath, props: {} })

  const { props } = componentDetail.options
  const state = componentDetail.component.$capture_state()
  const serializedState = serialize(props, state)
  import.meta.hot.send('kitbook:open-variants', { filepath, props: serializedState })
}

export function openSvx(filepath: string) {
  const markdownTemplate = 'You can write some documentation for your component here using Markdown. Feel free to also change the extension to .svx and use Svelte in your Markdown if you\'ve installed MDSvex.'
  ensureFileExists(filepath, markdownTemplate)
}

export function openComposition(filepathWithoutExtension: string, extension: string) {
  const tag = filepathWithoutExtension.split('/').pop()
  const template = `<script context="module" lang="ts">
  // set dimensions for this composition
  export let width = 600
  export let height = 400
</script>

<script lang="ts">
  import ${tag} from './${tag}.svelte'
  // props will be added here automatically and also editable in the future, for the moment you need to add them and pass to your component.
</script>

<${tag}>
  <!-- add slot code here if needed -->
</${tag}>
`
  ensureFileExists(`${filepathWithoutExtension}.${extension}`, template)
}

function ensureFileExists(filepath: string, template: string) {
  if (!import.meta.hot)
    return alert('Dev server must be running with HMR enabled to use this feature.')

  import.meta.hot.send('kitbook:ensure-file-exists', { filepath, template })
}

if (import.meta.hot) {
  import.meta.hot.on('kitbook:open-file', ({ filepath, viteBase }) => {
    const file_loc = `${filepath}:1:1`
    fetch(`${viteBase}/__open-in-editor?file=${encodeURIComponent(file_loc)}`)
  })
}
