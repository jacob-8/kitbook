<script>import Page from "./Page.svelte";
export let folder;
export let activeURL;
export let expanded = false;
const isRootFolder = folder.name === ".";
let actualExpandedState = activeURL.indexOf(folder.url) !== -1 || expanded;
$:
  active = activeURL.indexOf(folder.url) !== -1;
const internalHiddenFolder = folder.name === "routes for copying";
</script>

{#if !internalHiddenFolder}
  {#if !isRootFolder}
    <button
      type="button"
      class="kb-txm1h9"
      class:kb-3w125l={active}
      style="padding-left: calc(0.75rem * {folder.depth - 1}"
      on:click={() => (actualExpandedState = !actualExpandedState)}
    >
      <span
        class="kb-0qzf1q"
        class:kb-z0g8ob={!active}
      />
      <span class="kb-tbdxkh">
        {folder.name}
      </span>
    </button>
  {/if}

  {#if isRootFolder || actualExpandedState}
    {#each folder.pages as page}
      {#if page.url !== '/README' && page.url !== '/index'}
        <Page {page} {activeURL} depth={folder.depth} />
      {/if}
    {/each}
    {#each folder.folders as subfolder}
      <svelte:self folder={subfolder} {expanded} {activeURL} />
    {/each}
  {/if}
{/if}

<style>:global(.kb-txm1h9){display:flex;cursor:pointer;padding-right:0.75rem;text-align:left;font-size:0.875rem;line-height:1.25rem;font-weight:600;text-transform:capitalize;}:global(.kb-0qzf1q){border-left-width:1px;--un-border-opacity:1;border-color:rgba(209,213,219,var(--un-border-opacity));padding-right:0.75rem;}:global(.kb-0qzf1q:hover){--un-border-opacity:1;border-color:rgba(29,78,216,var(--un-border-opacity));}:global(.kb-z0g8ob){border-style:dotted;}:global(.kb-tbdxkh){padding-top:0.25rem;padding-bottom:0.25rem;}:global(.kb-3w125l){--un-text-opacity:1;color:rgba(30,64,175,var(--un-text-opacity));}:global(.kb-txm1h9:hover){--un-text-opacity:1;color:rgba(29,78,216,var(--un-text-opacity));}</style>