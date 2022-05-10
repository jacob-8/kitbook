<script lang="ts">
  import type { Folder } from './pages';
  import Page from './Page.svelte';

  export let folder: Folder;
  export let activeURL: string;
  export let expanded = true;

  $: if (activeURL.indexOf(folder.url) !== -1) {
    expanded = true;
  }
</script>

{#if folder.name !== '.'}
  <div
    class="hover:bg-gray-300 capitalize pr-3 py-2 font-semibold cursor-pointer"
    style="padding-left: calc(0.75rem * {folder.depth}"
    on:click={() => (expanded = !expanded)}
  >
    {folder.name}
  </div>
{/if}

{#if expanded}
  {#each folder.pages as page}
    {#if page.url !== '/'}
      <Page {page} {activeURL} depth={folder.depth} />
    {/if}
  {/each}
  {#each folder.folders as subfolder}
    <svelte:self folder={subfolder} {activeURL} />
  {/each}
{/if}
