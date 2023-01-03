<script lang="ts">
  // import { Button } from 'svelte-pieces';
  export let showSidebar = false;
  export let githubURL: string = undefined;
  export let activeURL: string;
  let root = '/';
</script>

<header class="top-0 z-10 sticky flex p-1">
  <button
    class="p-2 text-2xl font-semibold flex items-center md:hidden"
    on:click={() => (showSidebar = !showSidebar)}
  >
    <i class="i-ic-round-menu" />
  </button>
  <a
    href={root}
    class:text-blue-600={activeURL === root}
    class="hover:text-blue-700 p-2 text-lg font-semibold flex items-center underline-blue-800"
  >
    <slot>Kitbook</slot>
  </a>
  <div class="flex-1" />
  <!-- <Button form="menu">Dark mode</Button> -->

  {#if githubURL}
    <a
      class="hover:bg-gray-200 p-2 text-lg font-semibold flex items-center rounded"
      href={githubURL}
      target="_blank"
      rel="noopener noreferrer"
      title="View GitHub Repo"
    >
      <span class="i-mdi-github" />
    </a>
  {/if}
</header>

<style>
  @supports not (
    (backdrop-filter: saturate(50%) blur(8px)) or (-webkit-backdrop-filter: saturate(50%) blur(8px))
  ) {
    header {
      --at-apply: bg-gray-100;
    }
  }
  @supports (
    (backdrop-filter: saturate(50%) blur(8px)) or (-webkit-backdrop-filter: saturate(50%) blur(8px))
  ) {
    header {
      -webkit-backdrop-filter: saturate(50%) blur(8px);
      backdrop-filter: saturate(50%) blur(8px);
    }
  }
</style>
