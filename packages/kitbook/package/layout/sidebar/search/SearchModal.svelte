<script>import { createEventDispatcher } from "svelte";
import { fade } from "svelte/transition";
import { portal } from "svelte-pieces";
import { page } from "$app/stores";
import { goto } from "$app/navigation";
import SearchResult from "./SearchResult.svelte";
import { filterPages } from "./filterPages";
const dispatch = createEventDispatcher();
function close() {
  dispatch("close");
}
function autofocus(node) {
  setTimeout(() => node.focus(), 15);
}
let modal;
let query = "";
$:
  filteredPages = filterPages($page.data?.pages, query);
$:
  activeIndex = filteredPages?.length ? 0 : null;
function selectPrevious() {
  if (activeIndex > 0)
    activeIndex -= 1;
}
function selectNext() {
  if (activeIndex < filteredPages.length - 1)
    activeIndex += 1;
}
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === 'Escape') return close();

    if (['ArrowDown', 'ArrowUp', 'Tab'].includes(e.key)) e.preventDefault();

    if (e.key === 'ArrowDown') selectNext();
    if (e.key === 'Tab' && !e.shiftKey) selectNext();

    if (e.key === 'ArrowUp') selectPrevious();
    if (e.key === 'Tab' && e.shiftKey) selectPrevious();
  }}
/>

<div
  use:portal
  class="kb-ybjazw"
  style="z-index: 60;"
>
  <div class="kb-cn4kow" transition:fade={{ duration: 200 }}>
    <button type="button" class="kb-qn007q" on:click={close} />
  </div>

  <div
    transition:fade={{ duration: 200 }}
    class="kb-n73mid"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-headline"
    bind:this={modal}
  >
    <input
      class="kb-9ptpu2"
      use:autofocus
      on:keydown={(e) => {
        if (e.key === 'Enter' && activeIndex !== null) {
          goto(filteredPages[activeIndex].url);
        }
      }}
      bind:value={query}
      placeholder="Search"
      aria-label="Search"
      spellcheck="false"
    />
    <button
      type="button"
      class="kb-n41g2e"
      on:click={close}><span class="kb-h6slyz" /></button
    >
    <div class="kb-cp4zk5">
      {#each filteredPages as page, index}
        <SearchResult active={index === activeIndex} {page} />
      {:else}
        <div class="kb-v5cm3g">No results found</div>
      {/each}
    </div>
  </div>
</div>

<style>:global(.kb-h6slyz){--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 352 512' display='inline-block' vertical-align='middle' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='m242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28L75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256L9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z'/%3E%3C/svg%3E");mask:var(--un-icon) no-repeat;mask-size:100% 100%;-webkit-mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;background-color:currentColor;color:inherit;display:inline-block;vertical-align:middle;width:1em;height:1em;}:global(.kb-cn4kow){position:fixed;inset:0rem;transition-property:opacity;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;}:global(.kb-n41g2e){position:absolute;right:0.25rem;top:0.25rem;display:flex;align-items:center;border-radius:0.25rem;padding:0.75rem;opacity:0.25;}:global(.kb-n73mid){position:relative;z-index:1;max-height:100%;width:100%;display:flex;flex-direction:column;transform:translateX(var(--un-translate-x)) translateY(var(--un-translate-y)) translateZ(var(--un-translate-z)) rotate(var(--un-rotate)) rotateX(var(--un-rotate-x)) rotateY(var(--un-rotate-y)) rotateZ(var(--un-rotate-z)) skewX(var(--un-skew-x)) skewY(var(--un-skew-y)) scaleX(var(--un-scale-x)) scaleY(var(--un-scale-y)) scaleZ(var(--un-scale-z));overflow:hidden;border-radius:0.5rem;--un-bg-opacity:1;background-color:rgba(255,255,255,var(--un-bg-opacity));--un-shadow:var(--un-shadow-inset) 0 20px 25px -5px var(--un-shadow-color, rgba(0,0,0,0.1)),var(--un-shadow-inset) 0 8px 10px -6px var(--un-shadow-color, rgba(0,0,0,0.1));box-shadow:var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;}:global(.kb-qn007q){position:absolute;inset:0rem;--un-bg-opacity:1;background-color:rgba(0,0,0,var(--un-bg-opacity));opacity:0.5;}:global(.kb-ybjazw){position:fixed;inset:0rem;display:flex;align-items:flex-start;justify-content:center;padding:1rem;}:global(.kb-cp4zk5){flex:1 1 0%;overflow-y:auto;border-top-width:1px;--un-border-opacity:1;border-color:rgba(209,213,219,var(--un-border-opacity));}:global(.kb-n41g2e:hover){--un-bg-opacity:1;background-color:rgba(229,231,235,var(--un-bg-opacity));opacity:1;}:global(.kb-9ptpu2){padding:0.75rem;outline:2px solid transparent;outline-offset:2px;}:global(.kb-v5cm3g){padding:0.75rem;opacity:0.5;}@media (min-width: 640px){:global(.kb-n73mid){max-width:32rem;}}@media (min-width: 768px){:global(.kb-ybjazw){padding-top:2.5rem;}}</style>