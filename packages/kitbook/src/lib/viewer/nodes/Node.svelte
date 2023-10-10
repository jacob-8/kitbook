<script lang="ts">
  import Component from './Component.svelte'
  import Slot from './Slot.svelte'
  import { visibility } from './store'

  export let node: SvelteBlockDetail
  export let depth = 1

  let lastLength = node.children.length
  let flash = false
  $: {
    flash = flash || node.children.length !== lastLength
    lastLength = node.children.length
  }
</script>

{#if $visibility[node.type]}
  {@const style = `padding-left: ${depth * 12}px`}
  {@const left = depth * 12}

  <li class:flash>
    {#if node.type === 'component'}
      <Component {node} {style}>
        <ul style:--left="{left}px">
          {#each node.children as child}
            <svelte:self node={child} depth={depth + 1} />
          {/each}
        </ul>
      </Component>
    {:else if node.type === 'element' || node.type === 'block' || node.type === 'iteration'}
      {#each node.children as child}
        <svelte:self node={child} {depth} />
      {/each}
    {:else if node.type === 'slot'}
      <Slot tagName={node.tagName} {style}>
        <ul style:--left="{left}px">
          {#each node.children as child (child.id)}
            <svelte:self node={child} depth={depth + 1} />
          {/each}
        </ul>
      </Slot>
    {/if}
  </li>
{/if}

<style>
  li {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    line-height: 1.5;
    font-size: 0.75rem;
  }

  ul {
    width: 100%;
    position: relative;
  }

  li.flash :global(> :first-child),
  li.flash :global(> :first-child *),
  li :global(.flash),
  li :global(.flash *) {
    animation: flash 0.8s ease-in-out;
  }

  @keyframes flash {
    10% {
      background: rgb(250, 217, 242);
    }
  }
</style>
