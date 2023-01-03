<script>import { resizeElement } from "./resizeElement";
export let hovered = false;
export let width = void 0;
export let height = void 0;
let userAdjustedWidth;
let userAdjustedHeight;
$:
  widthToDisplay = userAdjustedWidth || width;
$:
  heightToDisplay = userAdjustedHeight || height;
let container;
let dragging;
const PADDING_TWICE = 24;
</script>

{#if dragging}
  <div class="kb-q59zl7" />
{/if}

<div bind:this={container} class="kb-2as389">
  <div
    style="height: {heightToDisplay ? `${heightToDisplay}px` : 'unset'}; width: {widthToDisplay
      ? `${widthToDisplay}px`
      : 'unset'};"
    class:kb-12j8sv={hovered}
    class:checkerboard={hovered}
    class="kb-tn5nzz"
  >
    {#if container}
      <div
        use:resizeElement={container}
        on:updatewidth={({ detail: updatedWidth }) => {
          userAdjustedWidth = updatedWidth;
        }}
        on:mousedown={() => (dragging = 'width')}
        on:dblclick={() => (userAdjustedWidth = null)}
        class="kb-mwf5xy"
        class:kb-0au689={dragging === 'width'}
      />
      <div
        use:resizeElement={container}
        on:updateheight={({ detail: updatedHeight }) => {
          userAdjustedHeight = updatedHeight;
        }}
        on:mousedown={() => (dragging = 'height')}
        on:dblclick={() => (userAdjustedHeight = null)}
        class="kb-e7pza4"
        class:kb-0au689={dragging === 'height'}
      />
      <div
        use:resizeElement={container}
        on:updatewidth={({ detail: updatedWidth }) => {
          userAdjustedWidth = updatedWidth;
        }}
        on:updateheight={({ detail: updatedHeight }) => {
          userAdjustedHeight = updatedHeight;
        }}
        on:mousedown={() => (dragging = 'both')}
        on:dblclick={() => {
          userAdjustedWidth = null;
          userAdjustedHeight = null;
        }}
        class="kb-n8njn9"
        class:kb-0au689={dragging === 'both'}
      />
    {/if}
    {#if dragging}
      <div class="kb-csm762">
        {((widthToDisplay || container.clientWidth) - PADDING_TWICE).toFixed()} x {(
          (heightToDisplay || container.clientHeight) - PADDING_TWICE
        ).toFixed()}
      </div>
    {/if}
    <div class="kb-sxs717">
      <slot />
    </div>
  </div>
</div>

<svelte:window on:mouseup={() => (dragging = null)} />

<style>:global(.kb-csm762){position:absolute;bottom:0.75rem;right:0.75rem;z-index:1;border-width:1px;border-radius:0.25rem;--un-bg-opacity:1;background-color:rgba(255,255,255,var(--un-bg-opacity));padding-left:0.25rem;padding-right:0.25rem;--un-shadow:var(--un-shadow-inset) 0 10px 15px -3px var(--un-shadow-color, rgba(0,0,0,0.1)),var(--un-shadow-inset) 0 4px 6px -4px var(--un-shadow-color, rgba(0,0,0,0.1));box-shadow:var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);}:global(.kb-e7pza4){position:absolute;bottom:0rem;left:0rem;right:0rem;height:0.75rem;cursor:ns-resize;}:global(.kb-mwf5xy){position:absolute;bottom:0rem;right:0rem;top:0rem;width:0.75rem;cursor:ew-resize;}:global(.kb-n8njn9){position:absolute;bottom:0rem;right:0rem;height:0.75rem;width:0.75rem;cursor:nwse-resize;}:global(.kb-q59zl7){position:absolute;inset:0rem;}:global(.kb-sxs717){position:relative;height:100%;--un-bg-opacity:1;background-color:rgba(255,255,255,var(--un-bg-opacity));}:global(.kb-tn5nzz){position:relative;overflow:hidden;border-width:1px;--un-border-opacity:0.5 !important;border-radius:0.25rem;padding:0.75rem;}:global(.kb-2as389){overflow-x:auto;}:global(.kb-12j8sv){--un-border-opacity:1;border-color:rgba(30,58,138,var(--un-border-opacity));}:global(.kb-0au689){--un-bg-opacity:1;background-color:rgba(191,219,254,var(--un-bg-opacity));}:global(.kb-e7pza4:hover,.kb-mwf5xy:hover,.kb-n8njn9:hover){--un-bg-opacity:1;background-color:rgba(191,219,254,var(--un-bg-opacity));--un-bg-opacity:0.75;}
  .checkerboard {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA4SURBVHgB7dOxDQBACAJA/b1Y54dyHRZzBQoLY6Am1xCS5A8hAErpvRiOQYMbwFSL6qM8isGTYAOhNQbW5Q4iGwAAAABJRU5ErkJggg==');
  }
</style>
