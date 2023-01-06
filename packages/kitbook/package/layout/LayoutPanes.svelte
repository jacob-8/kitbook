<script>import { clamp } from "svelte-pieces";
import { drag } from "./dragLayoutPanes";
export let mobileShowInstruments = false;
let treeDesktopPercent = 20;
let instrumentsDesktopPercent = 25;
let instrumentsMobilePercentFromTop = 70;
let dragging;
</script>

<div class="kb-mrcdgx">
  <nav
    class="kb-w5yptu"
    style="--desktopWidth: {treeDesktopPercent}%"
  >
    <slot name="leftside" />
  </nav>

  <div
    class="kb-4c5rqh group"
    use:drag
    on:startdragging={() => (dragging = 'left')}
    on:stopdragging={() => (dragging = null)}
    on:updatewidth={({ detail: updatedWidthPercentage }) => {
      treeDesktopPercent = clamp(updatedWidthPercentage, 0, 100 - instrumentsDesktopPercent);
    }}
  >
    <div
      class="kb-1ask4s"
      class:kb-8s77uq={dragging === 'left'}
    />
    <div class="kb-fa49ll" class:kb-u2febv={dragging === 'left'} />
  </div>

  <main
    class="kb-qt07dc"
    style="--desktopWidth: {100 - treeDesktopPercent - instrumentsDesktopPercent}%"
  >
    <div class="kb-s9pb6c">
      <slot />
    </div>
    {#if mobileShowInstruments}
      <div class="kb-b6v1za" style="height: {100 - instrumentsMobilePercentFromTop}vh" />
    {/if}
  </main>

  <div
    class="kb-8wvtce"
    class:kb-u2febv={dragging === 'right'}
    use:drag
    on:startdragging={() => (dragging = 'right')}
    on:stopdragging={() => (dragging = null)}
    on:updatewidth={({ detail: updatedWidthPercentage }) => {
      instrumentsDesktopPercent = clamp(100 - updatedWidthPercentage, 0, 100 - treeDesktopPercent);
    }}
  >
    <div class="kb-xso2vp" />
  </div>

  <section
    class:kb-sdowvg={!mobileShowInstruments}
    class="kb-3maekr"
    style="--mobileTop: {instrumentsMobilePercentFromTop}vh; 
    --desktopWidth: {instrumentsDesktopPercent}%"
  >
    <div class="kb-1p28go">
      <slot name="instruments" />
    </div>
  </section>

  <div
    class="kb-vz5ra8"
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
  <div class="kb-jbxu2s" />
{/if}

<style>:global(.kb-jbxu2s){position:absolute;inset:0rem;}:global(.kb-vz5ra8){position:fixed;height:16px;width:100%;cursor:ns-resize;}:global(.kb-w5yptu){position:sticky;top:0rem;z-index:1;display:flex;flex-direction:column;--un-bg-opacity:1;background-color:rgba(243,244,246,var(--un-bg-opacity));}:global(.kb-1p28go){margin:0.75rem;overflow-y:auto;}:global(.kb-s9pb6c){margin:0.75rem;}:global(.kb-4c5rqh){display:none;width:8px;flex-shrink:0;cursor:ew-resize;}:global(.kb-8wvtce){display:none;width:8px;flex-shrink:0;cursor:ew-resize;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:500ms;}:global(.kb-1ask4s){width:4px;--un-bg-opacity:1;background-color:rgba(243,244,246,var(--un-bg-opacity));}:global(.kb-3maekr){width:100%;display:flex;flex-direction:column;--un-border-opacity:1;border-color:rgba(209,213,219,var(--un-border-opacity));--un-bg-opacity:1;background-color:rgba(255,255,255,var(--un-bg-opacity));}:global(.kb-fa49ll){width:4px;}:global(.kb-mrcdgx){height:100%;display:flex;flex-direction:column;}:global(.kb-xso2vp){width:4px;border-right-width:1px;--un-border-opacity:1;border-color:rgba(209,213,219,var(--un-border-opacity));}:global(.kb-qt07dc){flex-grow:1;--un-bg-opacity:1;background-color:rgba(255,255,255,var(--un-bg-opacity));}:global(.kb-xso2vp:hover){--un-border-opacity:1;border-color:rgba(147,197,253,var(--un-border-opacity));}:global(.group:hover .kb-1ask4s,.group:hover .kb-fa49ll,.kb-8wvtce:hover,.kb-u2febv){--un-bg-opacity:1;background-color:rgba(147,197,253,var(--un-bg-opacity));}:global(.kb-8s77uq){--un-bg-opacity:1 !important;background-color:rgba(147,197,253,var(--un-bg-opacity)) !important;}@media (max-width: 767.9px){:global(.kb-3maekr){position:fixed;bottom:0rem;top:var(--mobileTop);border-top-width:1px;}:global(.kb-sdowvg){display:none !important;}}@media (min-width: 768px){:global(.kb-3maekr){position:sticky;top:0rem;height:100vh;width:var(--desktopWidth);}:global(.kb-b6v1za,.kb-vz5ra8){display:none;}:global(.kb-qt07dc){width:var(--desktopWidth);}:global(.kb-w5yptu){height:100vh;width:var(--desktopWidth);}:global(.kb-4c5rqh,.kb-8wvtce){display:flex;}:global(.kb-1p28go){flex-grow:1;}:global(.kb-mrcdgx){flex-direction:row;}}</style>