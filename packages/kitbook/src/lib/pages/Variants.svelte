<script lang="ts">
  import type { KitbookSettings, Language, Variant, Viewport } from '../kitbook-types'
  import View from '../view/View.svelte'
  import { openVariants } from '../open/openFiles'

  export let variants: Variant<any>[]
  export let pathWithoutExtension: string
  export let viewports: Viewport[]
  export let moduleLanguages: Language[]
  export let addLanguageToUrl: KitbookSettings['addLanguageToUrl']
</script>

{#each variants as { name, description, viewports: variantViewports, languages: variantLanguages }, index (index)}
  <div class="font-semibold text-sm pb-1">
    <button
      class="capitalize relative z-2"
      type="button"
      on:click={() => {
        openVariants(`${pathWithoutExtension}.svelte`)
      }}
      title="Edit Variant">
      <span class="i-system-uicons-versions align--2px" />
      {name || ''} variant
    </button>
  </div>
  {#if description}
    <div class="text-sm pb-1 max-w-1000px whitespace-normal">{description}</div>
  {/if}
  <div class="inline-block overflow-x-auto w-full pt-8 -mt-8">
    <div class="flex">
      {#each variantViewports || viewports as { name: _viewportName, width, height }}
        <div>
          {#each variantLanguages || moduleLanguages as { code: languageCode }}
            <View
              {width}
              {height}
              {languageCode}
              {addLanguageToUrl}
              variantIndex={index}>
            </View>
          {/each}
        </div>
      {/each}
    </div>
  </div>
{/each}
