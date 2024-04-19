<script lang="ts">
  import { hoveredElement, selectedElement } from '../focused/active'

  export let element: SvelteElementDetail
  $: isSelected = $selectedElement === element
  $: isHovered = $hoveredElement === element

  $: isNodeModules = element.__svelte_meta?.loc.file.includes('node_modules')

  function on_click() {
    if ($selectedElement === element)
      return $selectedElement = null
    $selectedElement = element
  }
</script>

<div
  class="w-full ml-3 text-xs cursor-pointer"
  class:bg-green-200={isHovered}
  class:bg-blue-200={isSelected}
  on:click={on_click}
  on:mouseover={() => ($hoveredElement = element)}>
  {element.nodeName.toLowerCase()}

  {#if isNodeModules}
    <b>
      {element.__svelte_meta?.loc.file.split('node_modules').pop()}
    </b>
  {:else}
    {element.__svelte_meta?.loc.file.split('src/').pop()}
  {/if}
</div>
