<script lang="ts">
  import { hoveredComponent, selectedComponent } from '../focused/active'
  // import Element from './Element.svelte'

  export let componentFragment: ComponentFragment
  export let componentsWithChildren: Map<ComponentFragment, ComponentWithChildren>
  $: component = componentsWithChildren.get(componentFragment)

  $: isSelected = $selectedComponent === component
  $: isHovered = $hoveredComponent === component

  $: hasElements = component?.childElements.size > 0
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<button
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
<div class="ml-3">
  <!-- {#each component.childElements as element}
      <Element {element} />
    {/each} -->

  {#each component.childComponents as childFragment (childFragment)}
    <svelte:self componentFragment={childFragment} {componentsWithChildren} />
  {/each}
</div>
