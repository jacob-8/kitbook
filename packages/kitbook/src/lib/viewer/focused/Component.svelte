<script lang="ts">
  import type { KitbookSettings } from 'kitbook'
  import { removeQuotesFromSerializedFunctions, serializeIntersection } from '../../open/serialize'
  import { openComponent, openComposition, openMarkdown, openVariants } from '../../open/openFiles'
  import { selectedComponent } from './active'
  import { getLocalFilename } from './filename'
  import Tabs from './Tabs.svelte'
  import LoadVariants from './LoadVariants.svelte'

  export let settings: KitbookSettings
  $: ({ viewports, languageInsertedKitbookRoute, viewer: { __internal: { viteBase } } } = settings)

  $: filename = getLocalFilename($selectedComponent)
  $: variantsFilename = filename?.replace('.svelte', '.variants.ts')
  $: svxFilename = filename?.replace('.svelte', '.md')

  $: currentPropsState = (() => {
    if (!$selectedComponent)
      return null
    const { props } = $selectedComponent.componentDetail.options
    const state = $selectedComponent.componentDetail.component.$capture_state()
    const serializedState = serializeIntersection(props, state)
    return removeQuotesFromSerializedFunctions(JSON.stringify(serializedState, null, 2))
  })()
</script>

{#if filename && $selectedComponent}
  <div class="flex font-semibold items-center border-b border-gray-300 text-lg">
    <button type="button" on:click={() => $selectedComponent = null}><span class="i-material-symbols-arrow-back align--3px" /></button>
    <button class="mr-auto" type="button" on:click={() => openComponent(filename, viteBase)} title="Edit Component: {filename.split('src/').pop()}">
      <span class="i-vscode-icons-file-type-svelte align--2px" /> {$selectedComponent.componentDetail.tagName}
    </button>
    <button type="button" on:click={() => openVariants(filename, $selectedComponent.componentDetail)} title="Edit Variants: {variantsFilename.split('src/').pop()}"><span class="i-system-uicons-versions align--3px text-xl" /></button>
    <button type="button" on:click={() => openMarkdown(svxFilename)} title="Edit Documentation: {svxFilename.split('src/').pop()}"><span class="i-vscode-icons-file-type-markdown align--4px text-2xl" /></button>
    <button type="button" on:click={() => openComposition({ filepath: filename })} title="New Composition"><span class="i-carbon-chart-treemap align--2px" /></button>
    <a href="{languageInsertedKitbookRoute}/{filename.split('src/').pop().replace('.svelte', '')}" target="_blank" title="Open in Kitbook"><span class="i-tabler-external-link align--2px text-xl" /></a>
  </div>
{:else}
  <div class="text-sm p-2 text-red border-b">
    <button type="button" on:click={() => $selectedComponent = null}><span class="i-material-symbols-arrow-back align--3px" /></button>
    No elements in component so Kitbook doesn't yet have the ability to know which Svelte file this is and create files for it. This could be fixed by using the Vite module graph in the the future.
  </div>
{/if}

<Tabs>
  <svelte:fragment slot="first">
    <pre>{currentPropsState}</pre>
  </svelte:fragment>
  <svelte:fragment slot="second">
    {#if filename}
      <LoadVariants {languageInsertedKitbookRoute} {filename} {viewports} openVariantsFn={() => openVariants(filename, $selectedComponent.componentDetail)} />
    {/if}
  </svelte:fragment>
</Tabs>

<style>
  button, a {
    --at-apply: p-2 hover:bg-gray-200;
  }
</style>
