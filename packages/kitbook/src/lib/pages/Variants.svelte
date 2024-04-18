<script lang="ts">
  import { tick } from 'svelte'
  import type { KitbookSettings, Language, VariantsModule, Viewport } from '../kitbook-types'
  import View from '../view/View.svelte'
  import { openVariants } from '../open/openFiles'

  export let variantsModule: VariantsModule
  export let pathWithoutExtension: string
  export let projectViewports: Viewport[]
  export let activeLanguages: Language[]
  export let addLanguageToUrl: KitbookSettings['addLanguageToUrl']
  export let darkMode: true

  $: ({ shared_meta, ...variants } = variantsModule)

  function getLanguages({ variantLanguages, activeLanguages }: { variantLanguages: Language[]; activeLanguages: Language[] }) {
    // can set individual language props to an empty array to opt-out
    if (variantLanguages?.length === 0)
      return activeLanguages.slice(0, 1)

    if (variantLanguages?.length)
      return variantLanguages
    if (activeLanguages?.length)
      return activeLanguages

    return [{ code: null }]
  }

  let showView = true
  async function reset_ssr_on_change(_modules) {
    showView = false
    await tick()
    showView = true
  }
</script>

{#each Object.entries(variants) as [name, { _meta }] (name)}
  {@const { description, viewports, languages: variantLanguages, csr, ssr } = { ...shared_meta, ..._meta }}
  {#if csr === false}
    <div class="hidden">
      {reset_ssr_on_change(variantsModule)}
    </div>
  {/if}

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
      {#each viewports || projectViewports as { name: _viewportName, width, height }}
        <div>
          {#each { length: darkMode ? 2 : 1 } as _, dark_index}
            {@const darkMode = dark_index === 1}
            {#each getLanguages({ variantLanguages, activeLanguages }) as { code: languageCode }}
              {#if showView}
                <View
                  {darkMode}
                  {csr}
                  {ssr}
                  blockScripts={csr === false}
                  {width}
                  {height}
                  {languageCode}
                  {addLanguageToUrl}
                  variantName={name}>
                </View>
              {/if}
            {/each}
          {/each}
        </div>
      {/each}
    </div>
  </div>
{/each}
