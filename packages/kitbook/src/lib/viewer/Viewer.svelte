<script lang="ts">
  import type { ViewerOptions } from '@kitbook/vite-plugin-kitbook'
  import { componentsWithChildren } from './tree/nodes'
  import Targeting from './Targeting.svelte'
  import Component from './tree/Component.svelte'

  export let options: ViewerOptions = {}
  // const toggle_combo = options.toggleKeyCombo?.toLowerCase().split('-')
  // viteBase={options.__internal.base}
  // const { file, line, column } = element.__svelte_meta.loc;
  // const file_loc = `${file}:${line + 1}:${column + 1}`;
  // if (file_loc) {
  //   fetch(`${viteBase}/__open-in-editor?file=${encodeURIComponent(file_loc)}`);
  // }

  let targeting = true
</script>

{#if targeting}
  <Targeting />

  <div
    class="fixed right-0 bottom-0 top-0 w-30vw border-2 border-red bg-white overflow-y-auto flex flex-col">
    {#each $componentsWithChildren as [_fragment, { componentDetail, childComponents }] (_fragment)}
      {#if componentDetail.tagName === 'Root'}
        {#each childComponents as componentFragment (componentFragment)}
          <Component {componentFragment} componentsWithChildren={$componentsWithChildren} />
        {/each}
      {/if}
    {/each}
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
