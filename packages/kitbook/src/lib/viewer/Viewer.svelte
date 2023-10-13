<script lang="ts">
  import type { ViewerOptions } from '@kitbook/vite-plugin-kitbook'
  import { Button } from 'svelte-pieces'
  import Targeter from './Targeter.svelte'
  import { selectedComponent } from './focused/active'
  import Tree from './tree/Tree.svelte'
  import Component from './focused/Component.svelte'

  export let options: ViewerOptions = {}
  // const toggle_combo = options.toggleKeyCombo?.toLowerCase().split('-')

  let active = false
</script>

{#if active}
  <Targeter />

  <div
    class="fixed right-10px bottom-10px rounded max-h-50vh max-w-40vw border border-gray bg-white overflow-y-auto flex flex-col z-9999999">
    {#if $selectedComponent}
      <Component viteBase={options.__internal.viteBase} kitbookRoot={options.__internal.kitbookRoot} />
    {:else}
      <Tree kitbookRoot={options.__internal.kitbookRoot} on:close={() => active = false} />
    {/if}
  </div>
{/if}

<Button class="bottom-1 right-1 px-2! hidden! md:block! fixed" form="menu" onclick={() => active = !active}>
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
