<script lang="ts">
  import Folder from './Folder.svelte';
  import type { Folder as FolderType } from './pages';
  export let folder: FolderType;
  export let activeURL: string;
  export let root = '/';
  export let showSidebar = false;
</script>

<div
  class:-translate-x-full={!showSidebar}
  class="md:translate-x-0 fixed left-0 transform duration-200 md:sticky bg-white flex flex-col w-50 flex-shrink-0 h-100vh md:h-[calc(100vh-52px)] top-0 md:top-52px overflow-auto z-3"
>
  <Folder {folder} {activeURL} {root} expanded />
  <slot name="footer" />

  <a href="https://github.com/jacob-8/kitbook" target="_blank" class="ml-3 my-4 block">
    <span class="text-sm text-gray-400 block mb-1"> Created with </span>
    <img
      alt="Kitbook"
      src="https://raw.githubusercontent.com/jacob-8/kitbook/b96f77da81309a6ccd06693beb0f06ba8fdc0a2b/packages/kitbook/static/kitbook.svg"
      style="height: 20px;"
    />
  </a>
</div>

{#if showSidebar}
  <div class="fixed inset-0 bg-black opacity-30 z-2" on:click={() => (showSidebar = false)} />
{/if}

<style global>
  @media only screen and (min-width: 768px) {
    ::-webkit-scrollbar {
      width: 1rem;
    }

    ::-webkit-scrollbar-track {
      background: 0 0;
    }

    ::-webkit-scrollbar-thumb {
      background: hsl(240, 26%, 91%);
      border-radius: 1rem;
      border: 0.25rem solid #ffffff;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: hsl(240, 9%, 71%);
    }
  }
</style>
