<script lang="ts">
  import type { Folder } from 'kitbook';
  import Page from './Page.svelte';

  export let folder: Folder;
  export let kitbookPath: string;
  export let activePath: string;
  export let expanded = false;

  const isRootFolder = folder.name === '.';
  let actualExpandedState = activePath.includes(folder.url) || expanded;
  $: active = activePath.includes(folder.url);
</script>

{#if folder.name !== 'kitbook'}
  {#if !isRootFolder}
    <button
      type="button"
      class="hover:text-blue-700 capitalize pr-3 font-semibold cursor-pointer flex text-sm text-left"
      class:text-blue-800={active}
      style="padding-left: calc(0.75rem * {folder.depth - 1}"
      on:click={() => (actualExpandedState = !actualExpandedState)}
    >
      <span
        class="border-l border-gray-300 hover:border-blue-700 pr-3"
        class:border-dotted={!active}
      />
      <span class="py-1">
        {folder.name}
      </span>
    </button>
  {/if}

  {#if isRootFolder || actualExpandedState}
    {#each folder.pages as page}
      {#if page.url !== '/README' && page.url !== '/index'}
        <Page {page} {kitbookPath} {activePath} depth={folder.depth} />
      {/if}
    {/each}
    {#each folder.folders as subfolder}
      <svelte:self folder={subfolder} {expanded} {kitbookPath} {activePath} />
    {/each}
  {/if}
{/if}
