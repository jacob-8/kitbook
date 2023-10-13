<script lang="ts">
  import { type Variant, pagesStore } from 'kitbook'
  import type { Viewport } from '@kitbook/vite-plugin-kitbook'
  import DisplayVariants from './DisplayVariants.svelte'

  export let kitbookRoute: string
  export let viewports: Viewport[]
  export let filename: string

  $: localFilenameWithLeadingSlash = filename.split('/src').pop().replace('.svelte', '')
  $: page = $pagesStore[localFilenameWithLeadingSlash]

  let loading = true
  let variantsModule: { 'variants': Variant<any>[]; 'viewports': Viewport[] }
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
    <slot />
  {/if}
{:else if loading}
  <div class="p-2">
    Loading variants...
  </div>
{:else}
  <slot />
{/if}
<!-- <div class="p-2 text-red">
      Error loading variants: {error}
    </div> -->
