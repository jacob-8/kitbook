<script lang="ts">
  import { generateCode, parseModule } from 'magicast'
  import VariantsTemplate from '../templates/Foo.variants?raw'
  import SvxTemplate from '../templates/Foo.svx?raw'
  import { selectedComponent } from './active'
  import { getLocalFilename } from './filename'
  import { serialize } from './serialize'
  import Tabs from './Tabs.svelte'
  import LoadVariants from './LoadVariants.svelte'

  export let viteBase: string
  export let kitbookRoot: string

  $: filename = getLocalFilename($selectedComponent)

  function openComponent() {
    const file_loc = `${filename}:1:1`
    fetch(`${viteBase}/__open-in-editor?file=${encodeURIComponent(file_loc)}`)
  }

  $: variantsFilename = filename.replace('.svelte', '.variants.ts')
  function openVariants() {
    const state = $selectedComponent.componentDetail.component.$capture_state()
    const serializedState = serialize($selectedComponent.componentDetail.options.props, state)

    const module = parseModule(VariantsTemplate)
    module.exports.variants[0].props = serializedState
    const { code } = generateCode(module)

    const modifiedTemplate = code
      .replace('Foo.svelte', filename.split('/').pop())
      .replace(/["']REMOVEQUOTE_/g, '')
      .replace(/_REMOVEQUOTE["']/g, '')

    ensureFileExists(variantsFilename, modifiedTemplate)
  }

  $: currentPropsState = (() => {
    const state = $selectedComponent.componentDetail.component.$capture_state()
    const { props } = $selectedComponent.componentDetail.options
    const serializedState = serialize(props, state)
    return JSON.stringify(serializedState, null, 2).replace(/["']REMOVEQUOTE_/g, '')
      .replace(/_REMOVEQUOTE["']/g, '')
  })()

  $: svxFilename = filename.replace('.svelte', '.svx')
  function openSvx() {
    ensureFileExists(svxFilename, SvxTemplate)
  }

  // function createComposition() {
  //   const compositionName = prompt('Enter a name for the composition file:')
  //   if (!compositionName)
  //     return
  //   const compositionFilename = filename.replace('.svelte', `${compositionName}.composition.svelte`)
  //   ensureFileExists(compositionFilename, 'TODO')
  // }

  function ensureFileExists(filename: string, template: string) {
    if (!import.meta.hot)
      return alert('Dev server must be running with HMR enabled to use this feature.')

    import.meta.hot.send('kitbook:ensure-file-exists', { filename, template })
  }

  if (import.meta.hot) {
    import.meta.hot.on('kitbook:open-file', ({ filename }) => {
      const file_loc = `${filename}:1:1`
      fetch(`${viteBase}/__open-in-editor?file=${encodeURIComponent(file_loc)}`)
    })
  }
</script>

<div class="flex font-semibold items-center border-b border-gray-300 text-lg">
  <button type="button" on:click={() => $selectedComponent = null}><span class="i-material-symbols-arrow-back align--3px" /></button>
  <button class="mr-auto" type="button" on:click={openComponent} title="Edit Component: {filename.split('src/').pop()}">
    <span class="i-vscode-icons-file-type-svelte align--2px" /> {$selectedComponent.componentDetail.tagName}
  </button>
  <button type="button" on:click={openVariants} title="Edit Variants: {variantsFilename.split('src/').pop()}"><span class="i-system-uicons-versions align--3px text-xl" /></button>
  <button type="button" on:click={openSvx} title="Edit Documentation: {svxFilename.split('src/').pop()}"><span class="i-vscode-icons-file-type-markdown align--4px text-2xl" /></button>
  <!-- <button type="button" on:click={() => {}} title="New Composition"><span class="i-carbon-chart-treemap align--2px" /></button> -->
  <a href="{kitbookRoot}/{filename.split('src/').pop().replace('.svelte', '')}" target="_blank" title="Open in Kitbook"><span class="i-tabler-external-link align--2px text-xl" /></a>
</div>

<Tabs>
  <svelte:fragment slot="first">
    <pre>{currentPropsState}</pre>
  </svelte:fragment>
  <svelte:fragment slot="second">
    <LoadVariants {kitbookRoot} {filename}>
      <button type="button" on:click={openVariants} title={variantsFilename.split('src/').pop()}><span class="i-system-uicons-versions align--3px text-xl" /> Add Variant</button>
    </LoadVariants>
  </svelte:fragment>
</Tabs>

<style>
  button, a {
    --at-apply: p-2 hover:bg-gray-200;
  }
</style>
