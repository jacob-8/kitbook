<script lang="ts">
  import { tick } from 'svelte'
  import View from '../view/View.svelte'
  import { openComposition } from '../open/openFiles'
  import type { CompositionModule, KitbookSettings, Language } from '../kitbook-types'

  export let compositionsModules: Record<string, CompositionModule>
  export let pathWithoutExtension: string
  export let activeLanguages: Language[]
  export let addLanguageToUrl: KitbookSettings['addLanguageToUrl']
  export let darkMode: true
  export let show_inlined = false

  function getLanguages({ moduleLanguages, activeLanguages }: { moduleLanguages: Language[]; activeLanguages: Language[] }) {
    // can set individual language props to an empty array to opt-out
    if (moduleLanguages?.length === 0)
      return activeLanguages.slice(0, 1)

    if (moduleLanguages?.length)
      return moduleLanguages
    if (activeLanguages?.length)
      return activeLanguages

    return [{ code: null }]
  }

  let containerWidth = 1000

  let showView = true
  async function reset_ssr_on_composition_change(_modules) {
    showView = false
    await tick()
    showView = true
  }
</script>

{#each Object.entries(compositionsModules) as [compositionName, { viewports: compositionViewports, languages: moduleLanguages, csr, ssr, inlined, code }]}
  {#if (show_inlined && inlined) || (!show_inlined && !inlined)}
    {#if csr === false}
      <div class="hidden">
        {reset_ssr_on_composition_change(compositionsModules)}
      </div>
    {/if}

    <div class="font-semibold text-sm py-1">
      <button
        class="capitalize relative z-2"
        type="button"
        on:click={() => openComposition({ filepath: `${pathWithoutExtension}.svelte`, compositionName })}
        title="Edit Composition">
        <span class="i-carbon-chart-treemap align--2px" />
        {compositionName === 'default' ? '' : compositionName} composition
      </button>
    </div>
    <div class="inline-block overflow-x-auto w-full pt-8 -mt-8" bind:clientWidth={containerWidth}>
      <div class="flex">
        {#each compositionViewports || [{ width: null, height: 250 }] as { width, height }}
          <div>
            {#each { length: darkMode ? 2 : 1 } as _, index}
              {@const darkMode = index === 1}
              {#each getLanguages({ moduleLanguages, activeLanguages }) as { code: languageCode }}
                {#if showView}
                  <View
                    {darkMode}
                    {csr}
                    {ssr}
                    width={width || Math.min(containerWidth, 1000 - 22)}
                    {height}
                    {languageCode}
                    {addLanguageToUrl}
                    {code}
                    blockScripts={csr === false}
                    {compositionName}>
                  </View>
                {/if}
              {/each}
            {/each}
          </div>
        {/each}
      </div>
    </div>
  {/if}
{/each}
