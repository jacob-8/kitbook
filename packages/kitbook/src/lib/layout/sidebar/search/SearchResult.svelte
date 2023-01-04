<script lang="ts">
  import { Button } from 'svelte-pieces';
  import type { GroupedPage } from '../../../kitbook-types';
  export let page: GroupedPage;
  export let active = false;
</script>

<Button form="menu" class="w-full !rounded-0" href={page.url} {active} title={JSON.stringify(page, null, 2)}>
  <div class="text-left">
    <div class="capitalize">
      {page.name}
    </div>
    <div class="text-xs font-normal">
      {page.url} ({page.extensions})
    </div>
  </div>
</Button>
