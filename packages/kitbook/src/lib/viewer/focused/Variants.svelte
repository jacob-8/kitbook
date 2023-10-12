<script lang="ts">
  import { pages } from 'virtual:kitbook-modules'
  import Iframe from '$lib/view/Iframe.svelte'

  export let kitbookRoot: string
  export let filename: string

  $: localFilenameWithLeadingSlash = filename.split('/src').pop().replace('.svelte', '')
  $: page = pages[localFilenameWithLeadingSlash]
</script>

{#if page?.loadVariants?.loadModule}
  {#await page.loadVariants.loadModule()}
    Loading variants...
  {:then module}
    {#if module.variants?.length}
      {#each module.variants as variant, index}
        <div
          style="
            width: {variant.viewports?.[0]?.width || 400}px;
              height: {variant.viewports?.[0]?.height || 400}px;">
          <Iframe src="{kitbookRoot}/sandbox{localFilenameWithLeadingSlash}?variantIdx={index}" />
        </div>
      {/each}
    {:else}
      <slot />
    {/if}
  {:catch error}
    Error loading variants: {error}
  {/await}
{:else}
  <slot />
{/if}
