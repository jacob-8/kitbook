<script lang="ts">
  import { clamp } from 'svelte-pieces';
  import { drag } from './dragLayoutPanes';
  import { createPersistedStore } from 'svelte-pieces';

  let dragging = false;
  let innerWidth: number;
  const treeDesktopPixels = createPersistedStore('treeWidth', 200);
  const showTreeDesktop = createPersistedStore('showTreeDesktop', true);
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === 's') $showTreeDesktop = !$showTreeDesktop;
  }}
  bind:innerWidth
/>

<div class="h-full flex flex-col md:flex-row">
  {#if $showTreeDesktop && $treeDesktopPixels > 50}
    <nav
    class="bg-gray-100 sticky top-0 z-1 flex flex-col md:h-100vh md:w-[var(--desktopWidth)]"
    style="--desktopWidth: {$treeDesktopPixels}px"
      >
      <slot name="leftside" />
    </nav>
  {/if}

  <div
    class="hidden md:flex md:h-100vh w-8px shrink-0 group cursor-ew-resize"
    use:drag
    on:startdragging={() => (dragging = true)}
    on:stopdragging={() => (dragging = false)}
    on:updatewidth={({ detail: { pixels } }) => {
      $treeDesktopPixels = clamp(pixels, 0, innerWidth);
    }}
  >
    <div
      class="w-4px bg-gray-100 group-hover:bg-blue-300"
      class:!bg-blue-300={dragging}
    />
    <div class="w-4px group-hover:bg-blue-300" class:bg-blue-300={dragging} />
  </div>

  <main
    class="bg-white grow-1 md:w-[var(--desktopWidth)]"
    style="--desktopWidth: {innerWidth - $treeDesktopPixels}px"
  >
    <div class="m-3">
      <slot />
    </div>
  </main>
</div>

{#if dragging}
  <div class="absolute inset-0" />
{/if}
