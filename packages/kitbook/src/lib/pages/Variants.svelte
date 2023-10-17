<script lang="ts">
  import type { Language, Variant, Viewport } from 'kitbook'
  import View from '../view/View.svelte'

  export let variants: Variant<any>[]
  export let viewports: Viewport[]
  export let languages: Language[]
</script>

<div class="text-2xl mb-4">
  Variants
</div>

{#each variants as { name, description, viewports: variantViewports }, index (index)}
  <div class="inline-block whitespace-nowrap overflow-x-auto w-full">
    <div class="flex">
      {#each variantViewports || viewports as { name: _viewportName, width, height }}
        {#each languages || [{ name: null, code: null }] as { name: _languageName, code: languageCode }}
          <View
            title={name}
            description={description}
            {width}
            {height}
            {languageCode}
            queryParams="variantIdx={index}">
          </View>
        {/each}
      {/each}
    </div>
  </div>
{/each}
