<script lang="ts">
  import type { ViewerOptions } from '@kitbook/vite-plugin-kitbook'
  import { componentsWithChildren } from './tree/nodes'
  import Targeter from './Targeter.svelte'
  import Component from './tree/Component.svelte'

  export let options: ViewerOptions = {}
  // const toggle_combo = options.toggleKeyCombo?.toLowerCase().split('-')
  // viteBase={options.__internal.base}
  // const { file, line, column } = element.__svelte_meta.loc;
  // const file_loc = `${file}:${line + 1}:${column + 1}`;
  // if (file_loc) {
  //   fetch(`${viteBase}/__open-in-editor?file=${encodeURIComponent(file_loc)}`);
  // }

  let active = true
</script>

{#if active}
  <Targeter />

  <div class="fixed right-10px bottom-10px rounded max-h-50vh max-w-200px border-2 border-gray bg-white overflow-y-auto flex flex-col">
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
      active = !active
  }} />

<!-- on:keyup={(event) => {
  targeting = event.altKey && event.shiftKey;
  }} -->
