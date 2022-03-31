<script lang="ts">
  import Folder from './Folder.svelte';
  import type { Folder as FolderType } from './pages';
  export let folder: FolderType;
  export let activeURL: string;
  export let githubURL: string = undefined;

  let showSidebar = false;
</script>

<button
  class="fixed bg-white border top-0 left-0 p-2 text-3xl flex md:hidden"
  on:click={() => (showSidebar = !showSidebar)}>
  <i class="i-ic-round-menu" />
</button>

<div
  class:-translate-x-full={!showSidebar}
  class="md:translate-x-0 fixed left-0 transform duration-200 md:sticky bg-white flex flex-col w-50 flex-shrink-0 border-r h-[100vh] top-0 overflow-auto">
  <slot name="header" />

  <a
    href="/"
    class:bg-gray-200={activeURL === '/'}
    class="hover:bg-gray-300 bg-gray-200 px-3 py-2 text-lg font-semibold flex items-center">
    <slot name="index" />
  </a>

  <Folder {folder} {activeURL} expanded />

  {#if githubURL}
    <div class="p-3 text-sm font-semibold">
      <a class="hover:underline" href={githubURL} target="_blank">
        <span class="i-mdi-github mb-1 mr-1" />View GitHub Repo<span
          class="i-tabler-external-link mb-1 ml-1 opacity-25" />
      </a>
    </div>
  {/if}
  <slot name="footer" />

  <button on:click={() => (showSidebar = false)} class="p-3 md:hidden">
    <span class="i-ic-round-close text-gray-500" /></button>
</div>
