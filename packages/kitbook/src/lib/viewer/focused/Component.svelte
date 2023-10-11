<script lang="ts">
  import { selectedComponent } from './active'
  import { getFirstElementFilename } from './filename'

  export let viteBase: string
  export let kitbookRoot = '/kitbook'

  $: filename = getFirstElementFilename($selectedComponent)

  function openComponent() {
    const file_loc = `${filename}:1:1`
    fetch(`${viteBase}/__open-in-editor?file=${encodeURIComponent(file_loc)}`)
  }

  $: variantsFilename = filename.replace('.svelte', '.variants.ts')
  function openVariants() {
    const file_loc = `${variantsFilename}:1:1`
    fetch(`${viteBase}/__open-in-editor?file=${encodeURIComponent(file_loc)}`)
  // TODO: create endpoint that will create a default file if it doesn't exist
  }

  $: svxFilename = filename.replace('.svelte', '.svx')
  function openSvx() {
    const file_loc = `${svxFilename}:1:1`
    fetch(`${viteBase}/__open-in-editor?file=${encodeURIComponent(file_loc)}`)
  // TODO: create endpoint that will create a default file if it doesn't exist
  }
</script>

<div class="flex flex-col text-sm font-semibold">
  {#if $selectedComponent}
    <button type="button" on:click={openComponent} title={filename.split('src/').pop()}>Edit Component</button>
    <button type="button" on:click={openVariants} title={variantsFilename.split('src/').pop()}>Edit Variants</button>
    <button type="button" on:click={openSvx} title={svxFilename.split('src/').pop()}>Edit Documentation (.svx)</button>
    <!-- <button type="button">Create a new .story.svelte file</button> -->
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
