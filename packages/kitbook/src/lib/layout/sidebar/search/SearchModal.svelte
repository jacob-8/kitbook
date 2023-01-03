<script lang="ts">
  import { Modal, Button } from 'svelte-pieces';
  import { page } from '$app/stores';
  import type { GroupedPageMap } from '../../../kitbook-types';
  // import { createEventDispatcher } from 'svelte';
  // const dispatch = createEventDispatcher<{ close: boolean }>();

  $: pages = $page.data?.pages && Object.values($page.data.pages as GroupedPageMap) || [];
</script>

<Modal on:close>
  <div slot="heading">Search</div>
  {#if pages}
    {#each pages as page}
      <Button href={page.url} title={JSON.stringify(page, null, 2)}>{page.name}</Button>
    {/each}
  {/if}
  <!-- <div class="modal-footer">
      <Button form="simple" onclick={toggle}>Close</Button>
      <Button form="filled" type="submit">Save</Button>
    </div> -->
</Modal>
