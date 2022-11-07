<script lang="ts">
  // import { Button } from 'svelte-pieces';
  export let showSidebar = false;
  export let githubURL: string = undefined;
  export let activeURL: string;
  export let root: string;
</script>

<header class="top-0 z-10 sticky flex p-1 bg-white border-b border-gray-300">
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
    <slot name="title" />
  </a>
  <div class="flex-1" />
  <!-- <Button form="menu">Dark mode</Button> -->

  {#if githubURL}
    <a
      class="hover:bg-gray-100 p-2 text-lg font-semibold flex items-center rounded"
      href={githubURL}
      target="_blank"
      rel="noopener noreferrer"
      title="View GitHub Repo"
    >
      <span class="i-mdi-github" />
    </a>
  {/if}
</header>
