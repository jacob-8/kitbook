<script lang="ts">
  import { fly } from 'svelte/transition';
  export let top = 8;
  export let right = 8;
  export let portal = (node: HTMLElement) => {};
</script>

<div
  use:portal
  transition:fly={{ y: -10, duration: 150 }}
  class="absolute z-30 w-48 rounded-md
shadow-lg"
style="top: {top}px; right: {right}px;">
  <div class="sv-menu">
    <slot />
  </div>
</div>

<style>
  .sv-menu {
    @apply py-1 rounded-md bg-white flex flex-col;
  }
  :global(.sv-menu a),
  :global(.sv-menu label),
  :global(.sv-menu button) {
    @apply text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
      transition ease-in-out duration-150;
  }
</style>
