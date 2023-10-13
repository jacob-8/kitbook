<script lang="ts">
  import { type Variant, pagesStore } from 'kitbook'
  import type { Viewport } from '@kitbook/vite-plugin-kitbook'
  import DisplayVariants from './DisplayVariants.svelte'

  export let kitbookRoute: string
  export let viewports: Viewport[]
  export let filename: string

  $: localFilenameWithLeadingSlash = filename.split('/src').pop().replace('.svelte', '')
  $: page = $pagesStore[localFilenameWithLeadingSlash]

  let variantsModule: { 'variants': Variant<any>[]; 'viewports': Viewport[] }
  $: if (page?.loadVariants?.loadModule) {
    page.loadVariants.loadModule().then((module) => {
      variantsModule = module
    }).catch((error) => {
      console.error(error)
    })
  }
</script>

{#if variantsModule}
  {#if variantsModule.variants?.length}
    <DisplayVariants variants={variantsModule.variants} fileViewports={variantsModule.viewports || viewports} {kitbookRoute} {localFilenameWithLeadingSlash} />
  {:else}
    <slot />
  {/if}
{:else}
  <div class="p-2">
    Loading variants...
  </div>
{/if}
<!-- <div class="p-2 text-red">
      Error loading variants: {error}
    </div> -->
