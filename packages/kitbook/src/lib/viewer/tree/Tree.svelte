<script lang="ts">
  import type { Readable, Writable } from 'svelte/store'
  import Component from './Component.svelte'

  export let componentsWithChildren: Readable<Map<ComponentFragment, ComponentWithChildren>>

  export let hoveredComponent: Writable<ComponentWithChildren>
  export let selectedComponent: Writable<ComponentWithChildren>
  export let selectedElement: Writable<SvelteElementDetail>
</script>

<div class="rounded max-h-45vh max-w-45vw border border-gray/50 bg-white overflow-y-auto flex flex-col">
  <!-- use spread for Svelte 3 compatibility, not needed in Svelte 4 -->
  {#each [...$componentsWithChildren] as [_fragment, { componentDetail, childComponents }] (_fragment)}
    {#if componentDetail.tagName === 'Root'}
      <!-- use spread for Svelte 3 compatibility, not needed in Svelte 4 -->
      {#each [...childComponents] as componentFragment (componentFragment)}
        <Component
          {componentFragment}
          {hoveredComponent}
          {selectedComponent}
          {selectedElement}
          componentsWithChildren={$componentsWithChildren} />
      {/each}
    {/if}
  {/each}
</div>
