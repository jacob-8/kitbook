<script lang="ts">
  import type { ViewerOptions } from '@kitbook/vite-plugin-kitbook';
  import { onMount } from 'svelte';
  import Node from './nodes/Node.svelte';
  import { nodes } from './nodes/nodes';
  import Targeting from './Targeting.svelte';

  export let options: ViewerOptions = {};
  // const toggle_combo = options.toggleKeyCombo?.toLowerCase().split('-')

  let roots: SvelteBlockDetail[] = [];
  let targeting = true;

  onMount(() => {
    setTimeout(() => {
      roots = nodes.root;
    }, 1000);
  });
</script>

{#if targeting}
  <div class="fixed right-0 bottom-0 top-0 w-30vw border-2 border-red bg-white overflow-y-auto flex flex-col">
    {#each roots as node (node.id)}
      {#if node.tagName !== 'Viewer'}
        <Node {node} />
      {/if}
    {/each}
    <button
      type="button"
      on:click={() => {
        roots = nodes.root;
        console.log(nodes);
      }}>Log nodes</button
    >
  </div>

  <Targeting viteBase={options.__internal.base} />
{/if}

<svelte:window
  on:keydown={(event) => {
    if (event.altKey && event.shiftKey) targeting = !targeting;
  }}
  on:keyup={(event) => {
    // targeting = event.altKey && event.shiftKey;
  }}
/>
