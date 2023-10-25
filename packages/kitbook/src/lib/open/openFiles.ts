import { serializeIntersection } from './serialize'

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
  const serializedState = serializeIntersection(props, state)
  import.meta.hot.send('kitbook:open-variants', { filepath, props: serializedState })
}

export function openSvx(filepath: string) {
  const markdownTemplate = 'You can write some documentation for your component here using markdown.'
  ensureFileExists(filepath, markdownTemplate)
}

export function openComposition(filepathWithoutExtension: string, extension: string) {
  const tag = filepathWithoutExtension.split('/').pop()
  const template = `<script context="module" lang="ts">
  // import type { Viewport } from 'kitbook'
  // override default full-width composition viewport (set width as null for it to be auto-adjusting full-width)
  // export const viewports: Viewport[] = [
  //   { width: 600, height: 400 },
  // ]
  // at the moment only the first viewport will be shown - updates are coming to show all viewports
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
  // TODO: could jump to GitHub instead of error if no dev server - use githubURL + filepath
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
