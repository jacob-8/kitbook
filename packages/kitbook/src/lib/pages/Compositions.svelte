<script lang="ts">
  import View from '../view/View.svelte'
  import { openComposition } from '../open/openFiles'
  import type { CompositionModule } from '$lib/kitbook-types'

  export let compositionModules: Record<string, CompositionModule>
  export let pathWithoutExtension: string

  let containerWidth = 1000
</script>

{#each Object.entries(compositionModules) as [compositionName, { width, height }]}
  <div class="font-semibold text-sm py-1">
    <button
      class="capitalize relative z-2"
      type="button"
      on:click={() => {
        const extension = compositionName === 'default' ? 'composition' : `${compositionName}.composition`
        openComposition(pathWithoutExtension, extension)
      }}
      title="Edit Composition">
      <span class="i-carbon-chart-treemap align--2px" />
      {compositionName === 'default' ? '' : compositionName} composition
    </button>
  </div>
  <div class="inline-block overflow-x-auto w-full pt-8 -mt-8" bind:clientWidth={containerWidth}>
    <div class="flex">
      <View
        width={width || Math.min(containerWidth, 1000)}
        {height}
        {compositionName}>
      </View>
    </div>
  </div>
{/each}
