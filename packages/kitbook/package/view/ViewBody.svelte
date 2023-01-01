<script>import { dragElement } from "./dragElement";
export let width = void 0;
export let height = void 0;
export let hovered = false;
let frameWidth;
let frameHeight;
let userAdjustedWidth;
let userAdjustedHeight;
$:
  widthToDisplay = userAdjustedWidth || width;
$:
  heightToDisplay = userAdjustedHeight || height;
let dragging = false;
</script>

<svelte:window on:mouseup={() => (dragging = false)} />

<div bind:clientWidth={frameWidth} bind:clientHeight={frameHeight} class="kb-2as389">
  <div
    style="height: {heightToDisplay ? `${heightToDisplay}px` : 'unset'}; width: {widthToDisplay
      ? `${widthToDisplay}px`
      : 'unset'}; transition: all 300ms"
    class:kb-12j8sv={hovered}
    class="kb-tn5nzz checkerboard"
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
      on:dblclick={() => (userAdjustedWidth = null)}
      class="kb-xoquy3 flex-column"
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
      on:dblclick={() => (userAdjustedHeight = null)}
      class="kb-seh91f"
      style="line-height: 0;"
    />
    <div class="kb-sxs717">
      <slot />
      {#if dragging}
        <div class="kb-q59zl7" />
      {/if}
    </div>
  </div>
</div>

<style>:global(.kb-q59zl7){position:absolute;inset:0rem;}:global(.kb-seh91f){position:absolute;bottom:0rem;left:0rem;right:0rem;height:0.75rem;cursor:ns-resize;text-align:center;}:global(.kb-sxs717){position:relative;height:100%;--un-bg-opacity:1;background-color:rgba(255,255,255,var(--un-bg-opacity));}:global(.kb-tn5nzz){position:relative;overflow:hidden;border-width:1px;--un-border-opacity:0.5 !important;border-radius:0.25rem;padding:0.75rem;}:global(.kb-xoquy3){position:absolute;bottom:0rem;right:0rem;top:0rem;width:0.75rem;display:flex;cursor:ew-resize;align-items:center;}:global(.kb-2as389){overflow-x:auto;}:global(.kb-12j8sv){--un-border-opacity:1;border-color:rgba(30,58,138,var(--un-border-opacity));}:global(.kb-seh91f:hover,.kb-xoquy3:hover){--un-bg-opacity:1;background-color:rgba(191,219,254,var(--un-bg-opacity));--un-bg-opacity:0.75;}
  .checkerboard {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA4SURBVHgB7dOxDQBACAJA/b1Y54dyHRZzBQoLY6Am1xCS5A8hAErpvRiOQYMbwFSL6qM8isGTYAOhNQbW5Q4iGwAAAABJRU5ErkJggg==');
  }
</style>
