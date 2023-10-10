<script lang="ts">
  import Indexer from './Indexer.svelte'
  import { hovered, selected } from './store'

  let expanded = true
  export let node: SvelteBlockDetail
  export let style: string

  $: isSelected = $selected?.id === node.id
  $: isHovered = $hovered?.id === node.id
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if node.children?.length}
  <div
    {style}
    class="w-full"
    class:bg-green-100={isHovered}
    class:bg-blue-100={isSelected}
    on:click={() => $selected = node}
    on:mouseover={() => $hovered = node}
    on:dblclick={() => (expanded = !expanded)}>
    <Indexer text={node.tagName} />
    {#if !expanded}
      <span>...</span>
    {/if}
  </div>

  {#if expanded}
    <slot />
    <div
      class="w-full"
      class:bg-green-100={isHovered}
      class:bg-blue-100={isSelected}
      on:click={() => console.log(node.children)}
      {style}>
      <span>/</span>
      <span class="tag-name">
        <Indexer text={node.tagName} />
      </span>
    </div>
  {/if}
{:else}
  <div
    class="w-full"
    class:bg-green-100={isHovered}
    class:bg-blue-100={isSelected}
    {style}>
    <span>&lt;</span>
    <span class="tag-name">
      <Indexer text={node.tagName} />
    </span>
    <span>&nbsp;/&gt;</span>
  </div>
{/if}

<style>
	div {
		display: flex;
		flex-wrap: wrap;
	}
</style>
