<script lang="ts">
  import { hoveredElement, selectedElement } from '../focused/active'

  export let element: SvelteElementDetail
  $: isSelected = $selectedElement === element
  $: isHovered = $hoveredElement === element
</script>

<div
  class="w-full ml-3 text-xs"
  class:bg-green-200={isHovered}
  class:bg-blue-200={isSelected}
  on:click={() => $selectedElement = element}
  on:mouseover={() => ($hoveredElement = element)}>
  {element.nodeName.toLowerCase()}
</div>
