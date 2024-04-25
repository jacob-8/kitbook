<script lang="ts">
  import type { VariantsModule, Viewport } from 'kitbook'
  import DisplayVariants from './DisplayVariants.svelte'

  export let _languageInsertedKitbookRoute: string
  export let viewports: Viewport[]
  export let filename: string
  export let openVariantsFn: () => void
  export let resizeTo: (width: number, height: number) => void

  let loading = true
  let variantsModule: VariantsModule
  $: ({ shared_meta, ...variants } = variantsModule || {})

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
  <DisplayVariants {variants} fileViewports={shared_meta?.viewports || viewports} {_languageInsertedKitbookRoute} {localFilenameWithLeadingSlash} {resizeTo} />
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
