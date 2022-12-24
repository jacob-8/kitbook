<script>import { ResponsiveSlideover } from "svelte-pieces";
import Folder from "./Folder.svelte";
export let folder;
export let activeURL;
export let showSidebar = false;
export let title = "Kitbook";
export let expanded = false;
let root = "/";
import { afterNavigate } from "$app/navigation";
afterNavigate(() => {
  showSidebar = false;
});
</script>

<ResponsiveSlideover showWidth="md" side="left" bind:open={showSidebar}>
  <div slot="mobileHeading" class="kb-lcew84">
    <a
      href={root}
      class:kb-0phf3k={activeURL === root}
      class:kb-oasq9z={activeURL === root}
      class:kb-dz8yvd={activeURL === root}
      class="kb-9tcaqn"
      id="modal-headline"
    >
      {title}
    </a>
    <button
      on:click={() => (showSidebar = false)}
      type="button"
      class="kb-bu6jtx"
      aria-label="Close"
    >
      <span class="kb-wp5gix" /></button
    >
  </div>

  <div class="kb-tp9rer">
    <Folder {folder} {activeURL} {expanded} />
    <slot name="footer" />

    <a href="https://github.com/jacob-8/kitbook" target="_blank" rel="noopener noreferrer" class="kb-fcba33">
      <span class="kb-0okc5s"> Created with </span>
      <img
        alt="Kitbook"
        src="https://raw.githubusercontent.com/jacob-8/kitbook/b96f77da81309a6ccd06693beb0f06ba8fdc0a2b/packages/kitbook/static/kitbook.svg"
        style="height: 20px;"
      />
    </a>
  </div>
</ResponsiveSlideover>

<style>:global(.kb-wp5gix){--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 352 512' display='inline-block' vertical-align='middle' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='m242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28L75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256L9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z'/%3E%3C/svg%3E");mask:var(--un-icon) no-repeat;mask-size:100% 100%;-webkit-mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;background-color:currentColor;color:inherit;display:inline-block;vertical-align:middle;width:1em;height:1em;font-size:1.125rem;line-height:1.75rem;}:global(.kb-fcba33){margin-top:1rem;margin-bottom:1rem;margin-left:0.75rem;display:block;}:global(.kb-0okc5s){margin-bottom:0.25rem;display:block;font-size:0.875rem;line-height:1.25rem;--un-text-opacity:1;color:rgba(156,163,175,var(--un-text-opacity));}:global(.kb-bu6jtx){display:flex;padding-left:0.75rem;padding-right:0.75rem;padding-top:1rem;padding-bottom:1rem;--un-text-opacity:1;color:rgba(156,163,175,var(--un-text-opacity));transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;}:global(.kb-lcew84){display:flex;align-items:flex-start;justify-content:space-between;border-bottom-width:1px;--un-border-opacity:1;border-color:rgba(209,213,219,var(--un-border-opacity));}:global(.kb-tp9rer){display:flex;flex-direction:column;overflow-x:auto;}:global(.kb-0phf3k){border-left-width:2px;}:global(.kb-oasq9z){--un-border-opacity:1;border-color:rgba(29,78,216,var(--un-border-opacity));}:global(.kb-9tcaqn){padding:0.75rem;font-size:1.125rem;line-height:1.75rem;font-weight:500;--un-text-opacity:1;color:rgba(17,24,39,var(--un-text-opacity));}:global(.kb-9tcaqn:hover){--un-text-opacity:1;color:rgba(29,78,216,var(--un-text-opacity));}:global(.kb-bu6jtx:focus){--un-text-opacity:1;color:rgba(107,114,128,var(--un-text-opacity));outline:2px solid transparent;outline-offset:2px;}:global(.kb-bu6jtx:hover){--un-text-opacity:1;color:rgba(107,114,128,var(--un-text-opacity));}:global(.kb-dz8yvd){--un-text-opacity:1;color:rgba(30,64,175,var(--un-text-opacity));}@media (min-width: 768px){:global(.kb-tp9rer){position:sticky;top:53px;height:calc(100vh - 53px);width:12.5rem;}}</style>