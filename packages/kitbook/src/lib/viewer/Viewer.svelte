<script lang="ts">
  import type { ViewerOptions } from '@kitbook/vite-plugin-kitbook'
  import { onMount } from 'svelte'
  // import { components } from './nodes'
  // import { hovered, root, selected, visibility } from './nodes/store'
  import Node from './nodes/Node.svelte'
  import { nodes } from './nodes/nodes'

  export let options: ViewerOptions = {}
  let roots: SvelteBlockDetail[] = []

  onMount(() => {
    document.addEventListener('SvelteRegisterBlock', ({ detail }) => {
    // console.log({ block: detail, id: detail.id, type: detail.type })
      // blocks = [...blocks, detail]
      // if (detail.type === 'component') {
    })
    document.addEventListener('SvelteDOMInsert', ({ detail }) => {
    // console.log({ el: detail })
    // elements = [...elements, detail]
    })
  })
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
      roots = nodes.root
      console.log(nodes)
    }}>Log nodes</button>

  <!-- {#each $components as { tagName, options: { props } }}
    <div>
      <b>{tagName}</b>
      {#if props}
        <div class="ml-2">Props: {Object.keys(props).join(', ')}</div>
      {/if}
    </div>
  {/each} -->
</div>
