<script lang="ts">
  import type { VariantsModule, Viewport } from 'kitbook'
  import DisplayVariants from './DisplayVariants.svelte'

  export let languageInsertedKitbookRoute: string
  export let viewports: Viewport[]
  export let filename: string
  export let openVariantsFn: () => void

  let variantsModule: VariantsModule
  let loading = true

  $: localFilenameWithLeadingSlash = filename.split('/src').pop().replace('.svelte', '')
  $: load_variants(`/src${localFilenameWithLeadingSlash}.variants.ts`)

  async function load_variants(filename: string) {
    variantsModule = null
    loading = true

    const variants_files = import.meta.glob(['/src/**/*.variants.ts'])
    const variants_loader = variants_files[filename] as () => Promise<VariantsModule>
    if (variants_loader)
      variantsModule = await variants_loader()

    loading = false
  }
</script>

{#if variantsModule}
  {#if variantsModule.variants?.length}
    <DisplayVariants variants={variantsModule.variants} fileViewports={variantsModule.viewports || viewports} {languageInsertedKitbookRoute} {localFilenameWithLeadingSlash} />
  {:else}
    <button type="button" on:click={openVariantsFn}><span class="i-system-uicons-versions align--3px text-xl" /> Add Variant</button>
  {/if}
{:else if loading}
  <div class="p-2">
    Loading variants...
  </div>
{:else}
  <button type="button" on:click={openVariantsFn}><span class="i-system-uicons-versions align--3px text-xl" /> Add Variant From Current State</button>
{/if}

<style>
  button {
    --at-apply: p-2 hover:bg-gray-200;
  }
</style>
