<script lang="ts">
  import type { SvelteComponent } from 'svelte'
  import View from '../view/View.svelte'
  import { openComposition } from '../open/openFiles'

  // max width - see how much space there is
  export let compositions: Record<string, typeof SvelteComponent>
  export let pathWithoutExtension: string
  export let width: number = undefined
  export let height: number = undefined

  let containerWidth = 1000
// May need .not-prose when hoisted into documentation
</script>

{#each Object.entries(compositions) as [compositionName, _composition]}
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
