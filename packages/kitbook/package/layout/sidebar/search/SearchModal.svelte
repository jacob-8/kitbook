<script>import { Modal, Button } from "svelte-pieces";
import { page } from "$app/stores";
$:
  pages = $page.data?.pages && Object.values($page.data.pages) || [];
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
