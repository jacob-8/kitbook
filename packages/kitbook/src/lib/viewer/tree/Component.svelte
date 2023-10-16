<script lang="ts">
  import { hoveredComponent, selectedComponent } from '../focused/active'
  // import Element from './Element.svelte'

  export let componentFragment: ComponentFragment
  export let componentsWithChildren: Map<ComponentFragment, ComponentWithChildren>
  $: component = componentsWithChildren.get(componentFragment)

  $: isSelected = $selectedComponent === component
  $: isHovered = $hoveredComponent === component

  $: hasElements = component?.childElements.size > 0

  let buttonElement: HTMLButtonElement
  $: if (isHovered && buttonElement)
    buttonElement.scrollIntoView({ block: 'nearest' })
</script>

{#if component}
  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
  <button
    bind:this={buttonElement}
    type="button"
    disabled={!hasElements}
    class="w-full text-left px-2"
    class:font-italic={!hasElements}
    class:bg-gray-200={isHovered && hasElements}
    class:bg-blue-100={isSelected}
    on:click={() => $selectedComponent = component}
    on:mouseover={() => {
      if (hasElements)
        $hoveredComponent = component
    }}
    on:mouseout={() => $hoveredComponent = null}>
    {component.componentDetail.tagName}
  </button>
  <div class="ml-2 pl-1 border-l border-dashed">
    <!-- {#each [...component.childElements] as element}
      <Element {element} />
    {/each} -->

    <!-- use spread for Svelte 3 compatibility, not needed in Svelte 4 -->
    {#each [...component.childComponents] as childFragment (childFragment)}
      <svelte:self componentFragment={childFragment} {componentsWithChildren} />
    {/each}
  </div>
{/if}
