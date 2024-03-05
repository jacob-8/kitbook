<script lang="ts">
  import type { KitbookSettings, Language, Variant, Viewport } from '../kitbook-types'
  import View from '../view/View.svelte'
  import { openVariants } from '../open/openFiles'

  export let variants: Variant<any>[]
  export let pathWithoutExtension: string
  export let viewports: Viewport[]
  export let activeLanguages: Language[]
  export let moduleLanguages: Language[]
  export let addLanguageToUrl: KitbookSettings['addLanguageToUrl']
  export let darkMode: true

  function getLanguages({ variantLanguages, moduleLanguages, activeLanguages }: { variantLanguages: Language[]; moduleLanguages: Language[]; activeLanguages: Language[] }) {
    // can set individual language props to an empty array to opt-out
    if (variantLanguages?.length === 0)
      return activeLanguages.slice(0, 1)
    if (moduleLanguages?.length === 0)
      return activeLanguages.slice(0, 1)

    if (variantLanguages?.length)
      return variantLanguages
    if (moduleLanguages?.length)
      return moduleLanguages
    if (activeLanguages?.length)
      return activeLanguages

    return [{ code: null }]
  }
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
          {#each { length: darkMode ? 2 : 1 } as _, index}
            {@const darkMode = index === 1}
            {#each getLanguages({ variantLanguages, moduleLanguages, activeLanguages }) as { code: languageCode }}
              <View
                {darkMode}
                {width}
                {height}
                {languageCode}
                {addLanguageToUrl}
                variantIndex={index}>
              </View>
            {/each}
          {/each}
        </div>
      {/each}
    </div>
  </div>
{/each}
