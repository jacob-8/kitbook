<script lang="ts">
  import Component from './Component.svelte';
  import Element from './Element.svelte';

  export let node: SvelteBlockDetail;
  export let depth = 1;
  $: style = `padding-left: ${depth * 10}px`;
  $: left = depth * 10;
</script>

{#if node.type === 'component'}
  <Component {node} {style}>
    <div style:--left="{left}px">
      {#each node.children as child}
        <svelte:self node={child} depth={depth + 1} />
      {/each}
    </div>
  </Component>
{:else if node.type === 'element'}
  <Element {node} {style}>
    <div style:--left="{left}px">
      {#each node.children as child}
        <svelte:self node={child} depth={depth + 1} />
      {/each}
    </div>
  </Element>
{:else if node.type === 'block' || node.type === 'iteration'}
  {#each node.children as child}
    <svelte:self node={child} {depth} />
  {/each}
{:else if node.type === 'slot'}
  {#each node.children as child (child.id)}
    <svelte:self node={child} {depth} />
  {/each}
{/if}
