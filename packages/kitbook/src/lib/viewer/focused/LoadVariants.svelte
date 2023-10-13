<script lang="ts">
  import { pages } from 'virtual:kitbook-modules'
  import DisplayVariants from './DisplayVariants.svelte'

  export let kitbookRoot: string
  export let filename: string

  $: localFilenameWithLeadingSlash = filename.split('/src').pop().replace('.svelte', '')
  $: page = pages[localFilenameWithLeadingSlash]
</script>

{#if page?.loadVariants?.loadModule}
  {#await page.loadVariants.loadModule()}
    <div class="p-2">
      Loading variants...
    </div>
  {:then module}
    {#if module.variants?.length}
      <DisplayVariants variants={module.variants} {kitbookRoot} {localFilenameWithLeadingSlash} />
    {:else}
      <slot />
    {/if}
  {:catch error}
    <div class="p-2 text-red">
      Error loading variants: {error}
    </div>
  {/await}
{:else}
  <slot />
{/if}
