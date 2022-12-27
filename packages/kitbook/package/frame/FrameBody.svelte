<script>import { dragElement } from "./dragElement";
export let width = void 0;
export let height = void 0;
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

<div bind:clientWidth={frameWidth} bind:clientHeight={frameHeight} class="kb-sbdu0v">
  <div
    style="height: {heightToDisplay ? `${heightToDisplay}px` : 'unset'}; width: {widthToDisplay
      ? `${widthToDisplay}px`
      : 'unset'}"
    class="kb-hgp8jl"
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
      class="kb-2ia2ib flex-column"
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
      class="kb-1dkq3f"
      style="line-height: 0;"
    />
    <div class="kb-8dp1sx">
      <!-- p-4 bleed marks option -->
      <!-- <div class="kb-3r6ki5" />
    <div class="kb-lk5wk6" />
    <div class="kb-e7oalv" />
    <div class="kb-8zjv9i" />
    
    <div class="kb-h4t70v" />
    <div class="kb-hn8l8f" />
    <div class="kb-clvoh6" />
    <div class="kb-yb0x2y" /> -->
      <slot />
      {#if dragging}
        <div class="kb-w79qjd" />
      {/if}
    </div>
  </div>
</div>

<style>:global(.kb-1dkq3f){position:absolute;bottom:0rem;left:0rem;right:0rem;height:0.75rem;cursor:ns-resize;text-align:center;}:global(.kb-2ia2ib){position:absolute;bottom:0rem;right:0rem;top:0rem;width:0.75rem;display:flex;cursor:ew-resize;align-items:center;}:global(.kb-3r6ki5){position:absolute;left:1rem;top:0.25rem;height:0.5rem;width:1px;background-color:rgba(156,163,175,0.5);}:global(.kb-8zjv9i){position:absolute;bottom:0.25rem;right:1rem;height:0.5rem;width:1px;background-color:rgba(156,163,175,0.5);}:global(.kb-clvoh6){position:absolute;right:0.25rem;top:1rem;height:1px;width:0.5rem;background-color:rgba(156,163,175,0.5);}:global(.kb-e7oalv){position:absolute;bottom:0.25rem;left:1rem;height:0.5rem;width:1px;background-color:rgba(156,163,175,0.5);}:global(.kb-h4t70v){position:absolute;left:0.25rem;top:1rem;height:1px;width:0.5rem;background-color:rgba(156,163,175,0.5);}:global(.kb-hgp8jl){position:relative;overflow:hidden;--un-bg-opacity:1;background-color:rgba(255,255,255,var(--un-bg-opacity));padding:0.75rem;}:global(.kb-hn8l8f){position:absolute;bottom:1rem;left:0.25rem;height:1px;width:0.5rem;background-color:rgba(156,163,175,0.5);}:global(.kb-lk5wk6){position:absolute;right:1rem;top:0.25rem;height:0.5rem;width:1px;background-color:rgba(156,163,175,0.5);}:global(.kb-w79qjd){position:absolute;inset:0rem;}:global(.kb-yb0x2y){position:absolute;bottom:1rem;right:0.25rem;height:1px;width:0.5rem;background-color:rgba(156,163,175,0.5);}:global(.kb-8dp1sx){height:100%;--un-bg-opacity:1;background-color:rgba(255,255,255,var(--un-bg-opacity));}:global(.kb-sbdu0v){overflow-x:auto;}:global(.kb-1dkq3f:hover,.kb-2ia2ib:hover){--un-bg-opacity:1;background-color:rgba(191,219,254,var(--un-bg-opacity));}:global(.kb-hgp8jl:hover){--un-bg-opacity:1;background-color:rgba(243,244,246,var(--un-bg-opacity));}</style>