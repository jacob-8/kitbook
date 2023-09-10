<script lang="ts">
  import { clamp } from 'svelte-pieces';
  import { drag } from './dragLayoutPanes';
  import { createPersistedStore } from 'svelte-pieces';

  let dragging: 'left' | null;
  const treeDesktopPercent = createPersistedStore('treeWidth', 20);
  const showTreeDesktop = createPersistedStore('showTreeDesktop', true);
</script>

<svelte:window
  on:keydown|preventDefault={(e) => {
    if (e.key === 's') $showTreeDesktop = !$showTreeDesktop;
  }}
/>

<div class="h-full flex flex-col md:flex-row">
  {#if $showTreeDesktop && $treeDesktopPercent > 5}
    <nav
    class="bg-gray-100 sticky top-0 z-1 flex flex-col md:h-100vh md:w-[var(--desktopWidth)]"
    style="--desktopWidth: {$treeDesktopPercent}%"
      >
      <slot name="leftside" />
    </nav>
  {/if}

  <div
    class="hidden md:flex md:h-100vh w-8px shrink-0 group cursor-ew-resize"
    use:drag
    on:startdragging={() => (dragging = 'left')}
    on:stopdragging={() => (dragging = null)}
    on:updatewidth={({ detail: updatedWidthPercentage }) => {
      $treeDesktopPercent = clamp(updatedWidthPercentage, 0, 100);
    }}
  >
    <div
      class="w-4px bg-gray-100 group-hover:bg-blue-300"
      class:!bg-blue-300={dragging === 'left'}
    />
    <div class="w-4px group-hover:bg-blue-300" class:bg-blue-300={dragging === 'left'} />
  </div>

  <main
    class="bg-white grow-1 md:w-[var(--desktopWidth)]"
    style="--desktopWidth: {100 - $treeDesktopPercent}%"
  >
    <div class="m-3">
      <slot />
    </div>
  </main>
</div>

{#if dragging}
  <div class="absolute inset-0" />
{/if}
