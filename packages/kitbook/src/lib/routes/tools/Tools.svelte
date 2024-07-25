<script lang="ts">
  import type { LayoutLoadResult } from '../../layout/layoutLoad'
  import type { ToolsChangeState, ToolsComponentDetails } from '$lib/server-events'
  import { openComponent, openComposition, openMarkdown, sendOpenVariantsRequest } from '$lib/open/openFiles'
  import LoadVariants from '$lib/viewer/focused/LoadVariants.svelte'
  import Props from '$lib/viewer/focused/Props.svelte'
  import Tabs from '$lib/viewer/focused/Tabs.svelte'

  export let data: LayoutLoadResult
  export let detailsForTools: ToolsComponentDetails
  export let changeState: (data: ToolsChangeState) => void

  $: ({ viewports, _languageInsertedKitbookRoute, viewer: { __internal: { viteBase } } } = data.settings)
  $: ({ filename, tagName, serializedState } = detailsForTools)
  $: variantsFilename = filename?.replace('.svelte', '.variants.ts')
  $: svxFilename = filename?.replace('.svelte', '.md')
</script>

<div class="h-vh flex flex-col">
  {#if filename}
    <div class="flex font-semibold items-center border-b border-gray-300 text-lg">
      <button class="mr-auto" type="button" on:click={() => openComponent(filename, viteBase)} title="Edit Component: {filename.split('src/').pop()}">
        <span class="i-vscode-icons-file-type-svelte align--2px" /> {tagName}
      </button>
      <button type="button" on:click={() => sendOpenVariantsRequest(filename, serializedState)} title="Edit Variants: {variantsFilename.split('src/').pop()}"><span class="i-system-uicons-versions align--3px text-xl" /></button>
      <button type="button" on:click={() => openMarkdown(svxFilename)} title="Edit Documentation: {svxFilename.split('src/').pop()}"><span class="i-vscode-icons-file-type-markdown align--4px text-2xl" /></button>
      <button type="button" on:click={() => openComposition({ filepath: filename })} title="New Composition"><span class="i-carbon-chart-treemap align--2px" /></button>
      <a href="{_languageInsertedKitbookRoute}/{filename.split('src/').pop().replace('.svelte', '')}" target="_blank" title="Open in Kitbook"><span class="i-tabler-external-link align--2px text-xl" /></a>
    </div>
    <Tabs>
      <svelte:fragment slot="first">
        <div class="grow-1">
          <div class="text-xs bg-black text-white p-1">Editing props is new and experimental. Right now, nothing will happen if you edit functions.</div>
          <Props state={serializedState} {changeState} {filename} />
        </div>
      </svelte:fragment>
      <svelte:fragment slot="second">
        <LoadVariants {_languageInsertedKitbookRoute} {filename} {viewports} openVariantsFn={() => sendOpenVariantsRequest(filename, serializedState)} {resizeTo} />
      </svelte:fragment>
    </Tabs>
  {:else}
    <div class="text-sm p-2 text-red-600">
      No elements in component so Kitbook doesn't yet have the ability to know which Svelte file this is and create files for it. This could be fixed by using the Vite module graph in the the future. Try selecting a component with dom elements.
    </div>
  {/if}
</div>

<style>
  button, a {
    --at-apply: p-2 hover:bg-gray-200;
  }
</style>
