<script lang="ts">
  import Folder from './Folder.svelte';
  import type { Folder as FolderType } from './pages';
  export let folder: FolderType;
  export let activeURL: string;
  export let githubURL: string = undefined;

  export let showSidebar = false;
</script>

<div
  class:-translate-x-full={!showSidebar}
  class="md:translate-x-0 fixed left-0 transform duration-200 md:sticky bg-white flex flex-col w-50 flex-shrink-0 h-[calc(100vh-52px)] top-0 md:top-52px overflow-auto z-3"
>
  <Folder {folder} {activeURL} expanded />

  {#if githubURL}
    <div class="p-3 text-sm font-semibold">
      <a class="hover:underline" href={githubURL} target="_blank">
        <span class="i-mdi-github mb-1 mr-1" />View GitHub Repo<span
          class="i-tabler-external-link mb-1 ml-1 opacity-25"
        />
      </a>
    </div>
  {/if}
  <slot name="footer" />
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
