<script lang="ts">
  import { onMount } from 'svelte';
  import type { Folder } from './pages';
  import Page from './Page.svelte';

  export let folder: Folder;
  export let activeURL: string;
  export let root = "/";
  export let expanded = true;

  onMount(() => {
    if (activeURL.indexOf(folder.url) !== -1) {
      expanded = true;
    }
  });

  $: active = activeURL.indexOf(folder.url) !== -1;
</script>

{#if folder.name !== '.'}
  <div
    class="hover:text-blue-700 capitalize pr-3 font-semibold cursor-pointer flex"
    class:text-blue-800={active}
    style="padding-left: calc(0.75rem * {folder.depth - 1}"
    on:click={() => (expanded = !expanded)}
  >
    <span
      class="border-l border-gray-300 hover:border-blue-700 pr-3"
      class:border-dotted={!active}
    />
    <span class="py-2">
      {folder.name}
    </span>
  </div>
{/if}

{#if expanded}
  {#each folder.pages as page}
    {#if page.url !== '/'}
      <Page {page} {activeURL} {root} depth={folder.depth} />
    {/if}
  {/each}
  {#each folder.folders as subfolder}
    <svelte:self folder={subfolder} {activeURL} />
  {/each}
{/if}
