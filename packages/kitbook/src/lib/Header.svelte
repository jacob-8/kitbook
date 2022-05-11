<script lang="ts">
  // import { Button } from 'svelte-pieces';
  export let showSidebar = false;
  export let githubURL: string = undefined;
  export let root = "/";
  console.log({root})
</script>

<header
  class="top-0 z-1 sticky flex p-1"
  style="background: linear-gradient(0deg, #f9f9fa00 0%, #f9f9fad9 40%, #f9f9fa 100%);"
>
  <button
    class="p-2 text-2xl font-semibold flex items-center md:hidden"
    on:click={() => (showSidebar = !showSidebar)}
  >
    <i class="i-ic-round-menu" />
  </button>
  <a href={root} class="hover:bg-gray-100 p-2 text-lg font-semibold flex items-center rounded">
    <slot name="title" />
  </a>
  <div class="flex-1" />
  <!-- <Button form="menu">Dark mode</Button> -->

  {#if githubURL}
    <a
      class="hover:bg-gray-100 p-2 text-lg font-semibold flex items-center rounded"
      href={githubURL}
      target="_blank"
      title="View GitHub Repo"
    >
      <span class="i-mdi-github" />
    </a>
  {/if}
</header>
