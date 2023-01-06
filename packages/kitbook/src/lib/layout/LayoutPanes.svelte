<script lang="ts">
  import { clamp } from 'svelte-pieces';
  import { drag } from './dragLayoutPanes';

  export let mobileShowInstruments = false; // TODO: turn true when a single view is focusable

  let treeDesktopPercent = 20;
  let instrumentsDesktopPercent = 25;
  let instrumentsMobilePercentFromTop = 70;
  let dragging: 'left' | 'right' | null;
</script>

<div class="h-full flex flex-col md:flex-row">
  <nav
    class="bg-gray-100 sticky top-0 z-1 flex flex-col md:h-100vh md:w-[var(--desktopWidth)]"
    style="--desktopWidth: {treeDesktopPercent}%"
  >
    <slot name="leftside" />
  </nav>

  <div
    class="hidden md:flex w-8px shrink-0 group cursor-ew-resize"
    use:drag
    on:startdragging={() => (dragging = 'left')}
    on:stopdragging={() => (dragging = null)}
    on:updatewidth={({ detail: updatedWidthPercentage }) => {
      treeDesktopPercent = clamp(updatedWidthPercentage, 0, 100 - instrumentsDesktopPercent);
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
    style="--desktopWidth: {100 - treeDesktopPercent - instrumentsDesktopPercent}%"
  >
    <div class="m-3">
      <slot />
    </div>
    {#if mobileShowInstruments}
      <div class="md:hidden" style="height: {100 - instrumentsMobilePercentFromTop}vh" />
    {/if}
  </main>

  <div
    class="hidden md:flex w-8px shrink-0 hover:bg-blue-300 transition-500 cursor-ew-resize"
    class:bg-blue-300={dragging === 'right'}
    use:drag
    on:startdragging={() => (dragging = 'right')}
    on:stopdragging={() => (dragging = null)}
    on:updatewidth={({ detail: updatedWidthPercentage }) => {
      instrumentsDesktopPercent = clamp(100 - updatedWidthPercentage, 0, 100 - treeDesktopPercent);
    }}
  >
    <div class="w-4px border-r border-gray-300 hover:border-blue-300" />
  </div>

  <section
    class:lt-md:!hidden={!mobileShowInstruments}
    class="bg-white w-full flex flex-col lt-md:fixed lt-md:bottom-0 lt-md:top-[var(--mobileTop)] md:sticky md:top-0 md:h-100vh lt-md:border-t border-gray-300 md:w-[var(--desktopWidth)]"
    style="--mobileTop: {instrumentsMobilePercentFromTop}vh; 
    --desktopWidth: {instrumentsDesktopPercent}%"
  >
    <div class="overflow-y-auto m-3 md:grow-1">
      <slot name="instruments" />
    </div>
  </section>

  <div
    class="md:hidden h-16px cursor-ns-resize fixed w-full"
    style="top: calc({instrumentsMobilePercentFromTop}vh - 8px)"
    use:drag
    on:startdragging={() => (dragging = 'right')}
    on:stopdragging={() => (dragging = null)}
    on:updateheight={({ detail: updatedHeightPercentage }) => {
      instrumentsMobilePercentFromTop = updatedHeightPercentage;
    }}
  />
</div>

{#if dragging}
  <div class="absolute inset-0" />
{/if}
