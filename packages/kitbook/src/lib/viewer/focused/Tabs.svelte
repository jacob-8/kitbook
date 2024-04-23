<script lang="ts">
  import { createPersistedStore } from 'svelte-pieces'

  const activeTab = createPersistedStore<'first' | 'second'>('activeTab', 'first', true)
</script>

<div class="border-b border-gray-300 text-gray-800 flex">
  <button
    type="button"
    class="py-1 px-2 border-r border-gray-300"
    class:active={$activeTab === 'first'}
    on:click={() => ($activeTab = 'first')}>Current Props</button>
  <button
    type="button"
    class="py-1 px-2"
    class:active={$activeTab === 'second'}
    on:click={() => ($activeTab = 'second')}>Variants & Compositions</button>
</div>

{#if $activeTab === 'first'}
  <slot name="first" />
{:else}
  <slot name="second" />
{/if}

<style>
  .active {
    --at-apply: font-semibold text-black;
  }
</style>
