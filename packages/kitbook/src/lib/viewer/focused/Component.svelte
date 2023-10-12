<script lang="ts">
  import { generateCode, parseModule } from 'magicast'
  import VariantsTemplate from '../templates/Foo.variants?raw'
  import SvxTemplate from '../templates/Foo.svx?raw'
  import { selectedComponent } from './active'
  import { getFirstElementFilename } from './filename'
  import { serialize } from './serialize'

  export let viteBase: string
  export let kitbookRoot = '/kitbook'

  $: filename = getFirstElementFilename($selectedComponent)

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

    console.log({ state, modifiedTemplate })
    ensureFileExists(variantsFilename, modifiedTemplate)
  }

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

<div class="flex flex-col text-sm font-semibold">
  {#if $selectedComponent}
    <button type="button" on:click={openComponent} title={filename.split('src/').pop()}>Edit Component</button>
    <button type="button" on:click={openVariants} title={variantsFilename.split('src/').pop()}>Edit Variants</button>
    <button type="button" on:click={openSvx} title={svxFilename.split('src/').pop()}>Edit Documentation (.svx)</button>
    <!-- <button type="button" on:click={createComposition}>New Composition</button> -->
    <hr class="border-gray">
    <a href="{kitbookRoot}/{filename.split('src/').pop().replace('.svelte', '')}" target="_blank">Open in Kitbook</a>
  {:else}
    <div>
      Select a component to view
    </div>
  {/if}
</div>

<style>
  button, a {
    --at-apply: text-left p-1 hover:bg-gray-100;
  }
</style>
