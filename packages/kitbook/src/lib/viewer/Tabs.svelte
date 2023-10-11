<script lang="ts">
  import { selectedComponent } from './focused/active'

  export let activeTab: 'first' | 'second' = 'first'
</script>

<div class="border-b border-gray-400 text-gray-800 flex">
  <button
    type="button"
    class="py-1 px-2 border-r border-gray-400"
    class:active={activeTab === 'first'}
    on:click={() => (activeTab = 'first')}>Tree</button>
  <button
    type="button"
    class="py-1 px-2"
    class:active={activeTab === 'second'}
    on:click={() => (activeTab = 'second')}>{$selectedComponent ? $selectedComponent.componentDetail.tagName : 'Component'}</button>
</div>

{#if activeTab === 'first'}
  <slot name="first" />
{:else}
  <slot name="second" />
{/if}

<style>
  .active {
    --at-apply: font-semibold text-black
  }
</style>
