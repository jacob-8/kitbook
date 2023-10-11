<script lang="ts">
  // import Element from './Element.svelte'
  import { hoveredComponent, selectedComponent } from './active'

  export let componentFragment: ComponentFragment
  export let componentsWithChildren: Map<ComponentFragment, ComponentWithChildren>
  $: component = componentsWithChildren.get(componentFragment)

  $: isSelected = $selectedComponent === componentFragment
  $: isHovered = $hoveredComponent === componentFragment
</script>

{#if component}
  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="w-full pl-1"
    title={JSON.stringify(Object.keys(component.componentDetail.options.props), null, 2)}
    class:bg-green-100={isHovered}
    class:bg-blue-100={isSelected}
    on:click={() => $selectedComponent = componentFragment}
    on:mouseover={() => $hoveredComponent = componentFragment}
    on:mouseout={() => $hoveredComponent = null}>
    {component.componentDetail.tagName}
  </div>
  <div class="ml-3">
    <!-- {#each component.childElements as element}
      <Element {element} />
    {/each} -->

    {#each component.childComponents as childFragment (childFragment)}
      <svelte:self componentFragment={childFragment} {componentsWithChildren} />
    {/each}
  </div>
{/if}
