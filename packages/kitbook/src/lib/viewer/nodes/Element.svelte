<script lang="ts">
  import { hoveredElement, selectedElement } from './store';

  export let node: SvelteBlockDetail;
  export let style: string;

  $: element = node.detail as SvelteHTMLElement;
  $: isSelected = $selectedElement === element;
  $: isHovered = $hoveredElement === element;
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  {style}
  class="w-full"
  class:bg-green-200={isHovered}
  class:bg-blue-200={isSelected}
  on:click={() => {
    console.log({ element, selected: $selectedElement });
    $selectedElement = element
    }}
  on:mouseover={() => ($hoveredElement = element)}
>
  {node.tagName}
</div>
<slot />
