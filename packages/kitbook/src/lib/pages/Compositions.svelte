<script lang="ts">
  import View from '../view/View.svelte'
  import { openComposition } from '../open/openFiles'
  import type { CompositionModule, KitbookSettings, Language } from '../kitbook-types'

  export let compositionModules: Record<string, CompositionModule>
  export let pathWithoutExtension: string
  export let projectLanguages: Language[]
  export let addLanguageToUrl: KitbookSettings['addLanguageToUrl']

  let containerWidth = 1000
</script>

{#each Object.entries(compositionModules) as [compositionName, { viewports, languages: moduleLanguages }]}
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
      {#each moduleLanguages || projectLanguages as { code: languageCode }}
        <View
          width={viewports?.[0].width || Math.min(containerWidth, 1000)}
          height={viewports?.[0].height}
          {languageCode}
          {addLanguageToUrl}
          {compositionName}>
        </View>
      {/each}
    </div>
  </div>
{/each}
