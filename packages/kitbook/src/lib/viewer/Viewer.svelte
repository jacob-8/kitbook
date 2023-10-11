<script lang="ts">
  import type { ViewerOptions } from '@kitbook/vite-plugin-kitbook'
  import { componentsWithChildren } from './tree/nodes'
  import Targeting from './Targeting.svelte'
  import Component from './tree/Component.svelte'

  export let options: ViewerOptions = {}
  // const toggle_combo = options.toggleKeyCombo?.toLowerCase().split('-')

  let targeting = true
</script>

{#if targeting}
  <div
    class="fixed right-0 bottom-0 top-0 w-30vw border-2 border-red bg-white overflow-y-auto flex flex-col">
    {#each $componentsWithChildren as [_fragment, { componentDetail, childComponents }] (_fragment)}
      {#if componentDetail.tagName === 'Root'}
        {#each childComponents as componentFragment (componentFragment)}
          <Component {componentFragment} componentsWithChildren={$componentsWithChildren} />
        {/each}
      {/if}
    {/each}
    <Targeting viteBase={options.__internal.base} />
  </div>
{/if}

<svelte:window
  on:keydown={(event) => {
    if (event.altKey && event.shiftKey)
      targeting = !targeting
  }} />

<!-- on:keyup={(event) => {
  targeting = event.altKey && event.shiftKey;
  }} -->
