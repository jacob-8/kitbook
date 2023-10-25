<script lang="ts">
  import { resizeElement } from './resizeElement'

  export let hovered = false
  export let width: number = undefined
  export let height: number = undefined

  let userAdjustedWidth: number
  let userAdjustedHeight: number

  $: widthToDisplay = userAdjustedWidth || width
  $: heightToDisplay = userAdjustedHeight || height

  let container: HTMLDivElement
  let dragging: 'width' | 'height' | 'both'
  // may need to also listen for touchdown to give a touchcatcher like in the Layout

  export function resetDimensions() {
    userAdjustedWidth = null
    userAdjustedHeight = null
  }

  const mouseOffset = 6 // should be half width of handles
</script>

<div bind:this={container}>
  <div
    style="height: {heightToDisplay ? `${heightToDisplay}px` : 'unset'};
      width: {widthToDisplay
        ? `${widthToDisplay}px`
        : 'unset'};"
    class:border-gray-700={hovered}
    class:checkerboard={hovered}
    class="relative border !border-opacity-50 p-2">
    {#if container}
      <div
        role="button"
        tabindex="0"
        use:resizeElement={container}
        on:updatewidth={({ detail: { pixels } }) => {
          userAdjustedWidth = pixels + mouseOffset
        }}
        on:mousedown={() => (dragging = 'width')}
        on:dblclick={() => (userAdjustedWidth = null)}
        class="absolute z-1 right-0 top-0 bottom-0 w-3 cursor-ew-resize hover:bg-gray-200/75"
        class:bg-gray-200={dragging === 'width'} />
      <div
        role="button"
        tabindex="0"
        use:resizeElement={container}
        on:updateheight={({ detail: { pixels } }) => {
          userAdjustedHeight = pixels + mouseOffset
        }}
        on:mousedown={() => (dragging = 'height')}
        on:dblclick={() => (userAdjustedHeight = null)}
        class="absolute z-1 right-0 left-0 bottom-0 h-3 cursor-ns-resize hover:bg-gray-200/75"
        class:bg-gray-200={dragging === 'height'} />
      <div
        role="button"
        tabindex="0"
        use:resizeElement={container}
        on:updatewidth={({ detail: { pixels } }) => {
          userAdjustedWidth = pixels + mouseOffset
        }}
        on:updateheight={({ detail: { pixels } }) => {
          userAdjustedHeight = pixels + mouseOffset
        }}
        on:mousedown={() => (dragging = 'both')}
        on:dblclick={() => {
          userAdjustedWidth = null
          userAdjustedHeight = null
        }}
        class="absolute z-1 right-0 bottom-0 w-3 h-3 cursor-nwse-resize hover:bg-gray-200/75"
        class:bg-gray-200={dragging === 'both'} />
    {/if}
    {#if dragging}
      <div class="bg-white px-1 absolute bottom-3 right-3 z-1 shadow-lg border rounded">
        {(widthToDisplay || container.clientWidth).toFixed()} x
        {(heightToDisplay || container.clientHeight).toFixed()}
      </div>
    {/if}
    <div class="bg-white h-full relative">
      <slot />
    </div>
  </div>
</div>

{#if dragging}
  <div class="absolute inset-0 z-1" />
{/if}

<svelte:window on:mouseup={() => (dragging = null)} />

<style>
  .checkerboard {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA4SURBVHgB7dOxDQBACAJA/b1Y54dyHRZzBQoLY6Am1xCS5A8hAErpvRiOQYMbwFSL6qM8isGTYAOhNQbW5Q4iGwAAAABJRU5ErkJggg==');
  }
</style>
