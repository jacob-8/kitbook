<script lang="ts">
  import type { KitbookSettings } from 'kitbook'
  import { Button } from 'svelte-pieces'
  import Targeter from './Targeter.svelte'
  import { selectedComponent } from './focused/active'
  import Tree from './tree/Tree.svelte'
  import Component from './focused/Component.svelte'

  export let settings: KitbookSettings
  // const toggle_combo = options.toggleKeyCombo?.toLowerCase().split('-')

  let active = false
</script>

{#if active}
  <Targeter />

  <div
    class="fixed right-10px bottom-10px rounded max-h-90vh max-w-90vw border border-gray bg-white overflow-y-auto flex flex-col z-9999999">
    {#if $selectedComponent}
      <Component {settings} />
    {:else}
      <Tree languageInsertedKitbookRoute={settings.languageInsertedKitbookRoute} on:close={() => active = false} />
    {/if}
  </div>
{/if}

<Button class="bottom-1 right-1 px-2! fixed !bg-white" form="menu" onclick={() => active = !active}>
  <span class="i-mdi-target text-2xl" />
</Button>

<svelte:window
  on:keydown={(e) => {
    if (e.altKey && e.shiftKey)
      active = !active
    if (e.key === 'Escape')
      active = false
  }} />

<!-- on:keyup={(e) => {
  targeting = e.altKey && e.shiftKey;
  }} -->
