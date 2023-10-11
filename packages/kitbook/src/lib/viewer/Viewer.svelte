<script lang="ts">
  import type { ViewerOptions } from '@kitbook/vite-plugin-kitbook'
  import Targeter from './Targeter.svelte'
  import Tabs from './Tabs.svelte'
  import { selectedComponent } from './focused/active'
  import Tree from './tree/Tree.svelte'
  import Component from './focused/Component.svelte'

  export let options: ViewerOptions = {}
  // const toggle_combo = options.toggleKeyCombo?.toLowerCase().split('-')

  let active = false
</script>

{#if active}
  <Targeter />

  <div class="fixed right-10px bottom-10px rounded max-h-50vh max-w-200px border border-gray bg-white overflow-y-auto flex flex-col">
    <Tabs activeTab={$selectedComponent ? 'second' : 'first'}>
      <svelte:fragment slot="first">
        <Tree />
      </svelte:fragment>
      <svelte:fragment slot="second">
        <Component viteBase={options.__internal.viteBase} kitbookRoot={options.__internal.kitbookRoot} />
      </svelte:fragment>
    </Tabs>
  </div>
{/if}

<svelte:window
  on:keydown={(event) => {
    if (event.altKey && event.shiftKey)
      active = !active
    if (event.key === 'Escape')
      active = false
  }} />

<!-- on:keyup={(event) => {
  targeting = event.altKey && event.shiftKey;
  }} -->
