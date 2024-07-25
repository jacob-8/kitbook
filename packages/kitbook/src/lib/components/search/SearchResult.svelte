<script lang="ts">
  import { Button } from 'svelte-pieces'
  import type { GroupedPage } from 'kitbook'

  export let kitbookPath: string
  export let page: GroupedPage
  export let active = false
</script>

{#if page}
  <Button form="menu" class="w-full !rounded-0" href={kitbookPath + page.url} {active}>
    <div class="text-left">
      <div class="capitalize">
        {page.name}
      </div>
      <div class="text-xs font-normal">
        {page.url} ({page.extensions})
      </div>
    </div>
  </Button>
{/if}
