<script lang="ts">
  import { ResponsiveSlideover } from 'svelte-pieces';
  import Folder from './Folder.svelte';
  import type { Folder as FolderType } from 'kitbook';
  import { afterNavigate } from '$app/navigation';
  
  export let folder: FolderType;
  export let kitbookPath: string;
  export let activePath: string;
  export let showSidebar = false;
  export let title = 'Kitbook';
  export let expanded = false;

  afterNavigate(() => {
    showSidebar = false;
  });
</script>

<ResponsiveSlideover showWidth="md" side="left" bind:open={showSidebar}>
  <div slot="mobileHeading" class="flex items-start justify-between border-b border-gray-300">
    <a
      href={kitbookPath || '/'}
      class:border-l-2={!activePath}
      class:border-blue-700={!activePath}
      class:text-blue-800={!activePath}
      class="hover:text-blue-700 p-3 text-lg font-medium text-gray-900"
      id="modal-headline"
    >
      {title}
    </a>
    <button
      on:click={() => (showSidebar = false)}
      type="button"
      class="text-gray-400 px-3 py-4 flex hover:text-gray-500 focus:outline-none
focus:text-gray-500 transition ease-in-out duration-150"
      aria-label="Close"
    >
      <span class="i-fa-solid-times text-lg" /></button
    >
  </div>

  <Folder {folder} {kitbookPath} {activePath} {expanded} />
  <slot name="footer" />

  <a
    href="https://github.com/jacob-8/kitbook"
    target="_blank"
    rel="noopener noreferrer"
    class="ml-3 my-4 block"
  >
    <span class="text-sm text-gray-400 block mb-1"> Created with </span>
    <img
      alt="Kitbook"
      src="https://raw.githubusercontent.com/jacob-8/kitbook/b96f77da81309a6ccd06693beb0f06ba8fdc0a2b/packages/kitbook/static/kitbook.svg"
      style="height: 20px;"
    />
  </a>
</ResponsiveSlideover>
