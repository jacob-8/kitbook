<script lang="ts">
  import { dragElement } from './dragElement';

  export let width: number = undefined;
  export let height: number = undefined;

  let frameWidth: number;
  let frameHeight: number;

  let userAdjustedWidth: number;
  let userAdjustedHeight: number;

  $: widthToDisplay = userAdjustedWidth || width;
  $: heightToDisplay = userAdjustedHeight || height;

  let dragging = false;
</script>

<svelte:window on:mouseup={() => (dragging = false)} />

<div bind:clientWidth={frameWidth} bind:clientHeight={frameHeight} class="overflow-x-auto">
  <div
    style="height: {heightToDisplay ? `${heightToDisplay}px` : 'unset'}; width: {widthToDisplay
      ? `${widthToDisplay}px`
      : 'unset'}"
    class="checkerboard overflow-hidden p-3 relative"
  >
    <div
      use:dragElement
      on:movementx={({ detail: movementX }) => {
        if (!userAdjustedWidth) {
          userAdjustedWidth = frameWidth;
        }
        userAdjustedWidth += movementX;
      }}
      on:mousedown={() => (dragging = true)}
      class="absolute right-0 top-0 bottom-0 w-3 cursor-ew-resize hover:bg-blue-200 flex flex-column items-center"
    />
    <div
      use:dragElement
      on:movementy={({ detail: movementY }) => {
        if (!userAdjustedWidth) {
          userAdjustedHeight = frameHeight;
        }
        userAdjustedHeight += movementY;
      }}
      on:mousedown={() => (dragging = true)}
      class="absolute right-0 left-0 bottom-0 h-3 cursor-ns-resize hover:bg-blue-200 text-center"
      style="line-height: 0;"
    />
    <div class="bg-white h-full">
      <!-- p-4 bleed marks option -->
      <!-- <div class="absolute top-1 left-4 h-2 w-px bg-gray-400/50" />
    <div class="absolute top-1 right-4 h-2 w-px bg-gray-400/50" />
    <div class="absolute bottom-1 left-4 h-2 w-px bg-gray-400/50" />
    <div class="absolute bottom-1 right-4 h-2 w-px bg-gray-400/50" />
    
    <div class="absolute left-1 top-4 w-2 h-px bg-gray-400/50" />
    <div class="absolute left-1 bottom-4 w-2 h-px bg-gray-400/50" />
    <div class="absolute right-1 top-4 w-2 h-px bg-gray-400/50" />
    <div class="absolute right-1 bottom-4 w-2 h-px bg-gray-400/50" /> -->
      <slot />
      {#if dragging}
        <div class="absolute inset-0" />
      {/if}
    </div>
  </div>
</div>

<style>
  .checkerboard {
    background: white;
  }
  .checkerboard:hover {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA4SURBVHgB7dOxDQBACAJA/b1Y54dyHRZzBQoLY6Am1xCS5A8hAErpvRiOQYMbwFSL6qM8isGTYAOhNQbW5Q4iGwAAAABJRU5ErkJggg==');
  }
</style>