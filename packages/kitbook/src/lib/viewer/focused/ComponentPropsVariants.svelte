<script lang="ts">
  import type { KitbookSettings } from 'kitbook'
  import { openComponent, openComposition, openMarkdown, openVariants } from '../../open/openFiles'
  import { getLocalFileLocation } from './filename'
  import Tabs from './Tabs.svelte'
  import LoadVariants from './LoadVariants.svelte'
  import Props from './Props.svelte'

  export let resizeTo: (width: number, height: number) => void
  export let selectedComponent: ComponentWithChildren
  export let settings: KitbookSettings
  $: ({ viewports, languageInsertedKitbookRoute, viewer: { __internal: { viteBase } } } = settings)

  $: filename = getLocalFileLocation(selectedComponent)?.file
  $: variantsFilename = filename?.replace('.svelte', '.variants.ts')
  $: svxFilename = filename?.replace('.svelte', '.md')
</script>

{#if selectedComponent}
  {#if filename}
    <div class="flex font-semibold items-center border-b border-gray-300 text-lg">
      <button class="mr-auto" type="button" on:click={() => openComponent(filename, viteBase)} title="Edit Component: {filename.split('src/').pop()}">
        <span class="i-vscode-icons-file-type-svelte align--2px" /> {selectedComponent.componentDetail.tagName}
      </button>
      <button type="button" on:click={() => openVariants(filename, selectedComponent.componentDetail)} title="Edit Variants: {variantsFilename.split('src/').pop()}"><span class="i-system-uicons-versions align--3px text-xl" /></button>
      <button type="button" on:click={() => openMarkdown(svxFilename)} title="Edit Documentation: {svxFilename.split('src/').pop()}"><span class="i-vscode-icons-file-type-markdown align--4px text-2xl" /></button>
      <button type="button" on:click={() => openComposition({ filepath: filename })} title="New Composition"><span class="i-carbon-chart-treemap align--2px" /></button>
      <a href="{languageInsertedKitbookRoute}/{filename.split('src/').pop().replace('.svelte', '')}" target="_blank" title="Open in Kitbook"><span class="i-tabler-external-link align--2px text-xl" /></a>
    </div>
    <Tabs>
      <svelte:fragment slot="first">
        <div class="grow-1">
          <Props {selectedComponent} {resizeTo} />
        </div>
      </svelte:fragment>
      <svelte:fragment slot="second">
        <LoadVariants {languageInsertedKitbookRoute} {filename} {viewports} openVariantsFn={() => openVariants(filename, selectedComponent.componentDetail)} {resizeTo} />
      </svelte:fragment>
    </Tabs>
  {:else}
    <div class="text-sm p-2 text-red-600">
      No elements in component so Kitbook doesn't yet have the ability to know which Svelte file this is and create files for it. This could be fixed by using the Vite module graph in the the future. Try selecting a component with dom elements.
    </div>
  {/if}
{/if}

<style>
  button, a {
    --at-apply: p-2 hover:bg-gray-200;
  }
</style>
