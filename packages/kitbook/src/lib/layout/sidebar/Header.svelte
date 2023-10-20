<script lang="ts">
  import { Button } from 'svelte-pieces'
  import LaunchSearch from './search/LaunchSearch.svelte'

  export let showSidebar = false
  export let githubURL: string = undefined
  export let kitbookPath: string
  export let activePath: string
</script>

<header class="flex flex-wrap py-1 pl-1 w-full">
  <button
    type="button"
    class="p-2 text-2xl font-semibold flex items-center md:hidden"
    on:click={() => (showSidebar = !showSidebar)}>
    <i class="i-ic-round-menu" />
  </button>
  <a
    href={kitbookPath || '/'}
    class:text-blue-600={!activePath}
    class="hover:text-blue-700 p-2 text-lg font-semibold flex items-center underline-blue-800 overflow-x-hidden">
    <slot>Kitbook</slot>
  </a>
  <div class="flex-1" />

  <LaunchSearch {kitbookPath} />

  {#if githubURL}
    <Button
      form="menu"
      size="sm"
      href={githubURL}
      target="_blank"
      title="View GitHub Repo"
      class="!flex items-center">
      <span class="i-mdi-github text-lg" />
    </Button>
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
