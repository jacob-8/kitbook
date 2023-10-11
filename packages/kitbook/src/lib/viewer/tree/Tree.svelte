<script lang="ts">
  import { componentsWithChildren } from './nodes'
  import Component from './Component.svelte'
</script>

{#each $componentsWithChildren as [_fragment, { componentDetail, childComponents }] (_fragment)}
  {#if componentDetail.tagName === 'Root'}
    {#each childComponents as componentFragment (componentFragment)}
      <Component {componentFragment} componentsWithChildren={$componentsWithChildren} />
    {/each}
  {/if}
{/each}
