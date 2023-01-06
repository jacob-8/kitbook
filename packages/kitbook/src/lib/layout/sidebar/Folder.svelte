<script lang="ts">
  import type { Folder } from 'kitbook';
  import Page from './Page.svelte';

  export let folder: Folder;
  export let activeURL: string;
  export let expanded = false;

  const isRootFolder = folder.name === '.';
  let actualExpandedState = activeURL.indexOf(folder.url) !== -1 || expanded;
  $: active = activeURL.indexOf(folder.url) !== -1;

  const internalHiddenFolder = folder.name === 'routes for copying';
</script>

{#if !internalHiddenFolder}
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
        <Page {page} {activeURL} depth={folder.depth} />
      {/if}
    {/each}
    {#each folder.folders as subfolder}
      <svelte:self folder={subfolder} {expanded} {activeURL} />
    {/each}
  {/if}
{/if}
