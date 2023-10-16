<script lang="ts">
  import type { KitbookSettings } from 'kitbook'
  import { Button } from 'svelte-pieces'
  import Targeter from './Targeter.svelte'
  import { selectedComponent } from './focused/active'
  import Tree from './tree/Tree.svelte'
  import Component from './focused/Component.svelte'
  import { getLocalFilename } from './focused/filename'

  export let settings: KitbookSettings
  // const toggle_combo = options.toggleKeyCombo?.toLowerCase().split('-')

  let active = false

  $: selectedIsLocal = $selectedComponent && getLocalFilename($selectedComponent)
  $: if ($selectedComponent && !selectedIsLocal)
    alert('This component is not local so it will not open. Kitbook needs some improvements to keep you from being able to select this component. Just avoid selecting components in node_modules for now.')
</script>

{#if active}
  <Targeter />

  <div
    class="fixed right-10px bottom-10px rounded max-h-90vh max-w-90vw border border-gray bg-white overflow-y-auto flex flex-col z-9999999">
    {#if selectedIsLocal}
      <Component viteBase={settings.viewer.__internal.viteBase} kitbookRoute={settings.kitbookRoute} viewports={settings.viewports} />
    {:else}
      <Tree kitbookRoute={settings.kitbookRoute} on:close={() => active = false} />
    {/if}
  </div>
{/if}

<Button class="bottom-1 right-1 px-2! fixed !bg-white" form="menu" onclick={() => active = !active}>
  <span class="i-mdi-target text-2xl" />
</Button>

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
