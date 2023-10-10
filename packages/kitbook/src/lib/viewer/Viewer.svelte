<script lang="ts">
  import type { ViewerOptions } from '@kitbook/vite-plugin-kitbook';
  import { onMount } from 'svelte';
  import Node from './nodes/Node.svelte';
  import { nodes } from './nodes/nodes';
  import Targeting from './Targeting.svelte';

  export let options: ViewerOptions = {};
  // const toggle_combo = options.toggleKeyCombo?.toLowerCase().split('-')

  let roots: SvelteBlockDetail[] = [];
  let targeting = false;

  onMount(() => {
    setTimeout(() => {
      roots = nodes.root;
    }, 1000);
  });
</script>

<div class="fixed right-0 bottom-0 top-0 w-30vw border-2 border-red bg-white overflow-y-auto">
  <ul>
    {#each roots as node (node.id)}
      {#if node.tagName !== 'Viewer'}
        <Node {node} />
      {/if}
    {/each}
  </ul>
  <button
    type="button"
    on:click={() => {
      roots = nodes.root;
      console.log(nodes);
    }}>Log nodes</button
  >
  <button type="button" class="block" on:click={() => (targeting = !targeting)}> Toggle targeting</button>
</div>

{#if targeting}
  <Targeting viteBase={options.__internal.base} />
{/if}

<svelte:window 
on:keydown={(event) => {
  if (event.altKey && event.shiftKey) targeting = true;
}}
on:keyup={(event) => {
  console.log({alt: event.altKey})
  targeting = event.altKey && event.shiftKey;
}} />
