<script lang="ts">
  import { ShowHide } from 'svelte-pieces'
  import type { Writable } from 'svelte/store'
  import Element from './Element.svelte'

  export let hoveredComponent: Writable<ComponentWithChildren>
  export let selectedComponent: Writable<ComponentWithChildren>
  export let selectedElement: Writable<SvelteElementDetail>

  export let componentFragment: ComponentFragment
  export let componentsWithChildren: Map<ComponentFragment, ComponentWithChildren>
  $: component = componentsWithChildren.get(componentFragment)

  $: isSelected = $selectedComponent === component
  $: isHovered = $hoveredComponent === component

  $: elementCount = component?.childElements.size || 0

  let buttonElement: HTMLButtonElement
  $: if (isHovered && buttonElement)
    buttonElement.scrollIntoView({ block: 'nearest' })
</script>

{#if component}
  <ShowHide let:show let:toggle>
    <button
      bind:this={buttonElement}
      type="button"
      disabled={component.isFromNodeModules}
      class="w-full text-left px-2"
      class:font-italic={!elementCount}
      class:node-component={component.isFromNodeModules}
      class:bg-gray-200={isHovered}
      class:hover:bg-gray-200={!component.isFromNodeModules}
      class:bg-blue-100={isSelected}
      on:click={() => {
        $selectedComponent = component
        $selectedElement = null
      }}
      on:mouseover={() => {
        if (elementCount)
          $hoveredComponent = component
      }}
      on:mouseout={() => $hoveredComponent = null}>
      {component.componentDetail.tagName}
      {#if elementCount}
        <button type="button" on:click|stopPropagation={toggle} class="px-1.5 py-1px rounded text-2.5 align-2px text-white bg-gray/70 hover:bg-gray">{elementCount}</button>
      {/if}
    </button>
    <div class="ml-2 pl-1 border-l border-dashed">
      {#if show}
        {#each [...component.childElements] as element}
          <Element {element} />
        {/each}
      {/if}

      <!-- use spread for Svelte 3 compatibility, not needed in Svelte 4 -->
      {#each [...component.childComponents] as childFragment (childFragment)}
        <svelte:self
          componentFragment={childFragment}
          {hoveredComponent}
          {selectedComponent}
          {selectedElement}
          {componentsWithChildren} />
      {/each}
    </div>
  </ShowHide>
{/if}

<style>
  .node-component {
    --at-apply: text-xs block;
  }
</style>
