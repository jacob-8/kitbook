<script lang="ts">
  import type { VariantsModule, Viewport } from 'kitbook'
  import { pagesStore } from '../../modules/hmrUpdatedModules'
  import DisplayVariants from './DisplayVariants.svelte'

  export let kitbookRoute: string
  export let viewports: Viewport[]
  export let filename: string
  export let openVariantsFn: () => void

  $: localFilenameWithLeadingSlash = filename.split('/src').pop().replace('.svelte', '')
  $: page = $pagesStore[localFilenameWithLeadingSlash]

  let loading = true
  let variantsModule: VariantsModule
  $: if (page?.loadVariants?.loadModule) {
    page.loadVariants.loadModule().then((module) => {
      variantsModule = module
    }).catch((error) => {
      console.error(error)
    })
  }
  else {
    variantsModule = null
    loading = false
  }
</script>

{#if variantsModule}
  {#if variantsModule.variants?.length}
    <DisplayVariants variants={variantsModule.variants} fileViewports={variantsModule.viewports || viewports} {kitbookRoute} {localFilenameWithLeadingSlash} />
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
<!-- <div class="p-2 text-red">
      Error loading variants: {error}
    </div> -->

<style>
  button {
    --at-apply: p-2 hover:bg-gray-200;
  }
</style>
