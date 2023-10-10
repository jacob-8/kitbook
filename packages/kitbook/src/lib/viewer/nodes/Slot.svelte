<script lang="ts">
  import Indexer from './Indexer.svelte'

  export let style: string
  export let tagName: string
  let expanded = true
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  {style}
  class="tag-open tag-name"
  on:dblclick={() => (expanded = !expanded)}>
  <Indexer text={tagName} color="#c586c0" />

  {#if !expanded}
    <span>...</span>
  {/if}
</div>

{#if expanded}
  <slot />

  <div class="tag-close tag-name" {style}>
    <span>/</span>
    <Indexer text={tagName} color="#c586c0" />
  </div>
{/if}

<style>
	div {
		display: flex;
	}
</style>
