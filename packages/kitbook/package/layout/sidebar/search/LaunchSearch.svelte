<script>import { afterNavigate } from "$app/navigation";
import { Button } from "svelte-pieces";
import SearchModal from "./SearchModal.svelte";
const isMac = typeof navigator !== "undefined" && navigator.platform === "MacIntel";
let searching = false;
afterNavigate(() => {
  searching = false;
});
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.code === 'Escape') searching = false;
    if (['k', 'p'].includes(e.key) && (isMac ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();
      searching = !searching;
    }
  }}
/>

<Button
  onclick={() => (searching = true)}
  form="menu"
  size="sm"
  title="Search ({isMac ? '⌘' : 'Ctrl'} + K)"
>
  <span class="kb-c31u0w" />
</Button>

{#if searching}
  <SearchModal on:close={() => (searching = false)} />
{/if}

<style>:global(.kb-c31u0w){--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 32 32' display='inline-block' vertical-align='middle' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='m29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9Z'/%3E%3C/svg%3E");mask:var(--un-icon) no-repeat;mask-size:100% 100%;-webkit-mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;background-color:currentColor;color:inherit;display:inline-block;vertical-align:middle;width:1em;height:1em;font-size:1.125rem;line-height:1.75rem;}</style>