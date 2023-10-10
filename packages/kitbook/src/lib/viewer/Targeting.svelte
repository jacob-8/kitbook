<script lang="ts">
  import { onMount } from 'svelte';
  import { hoveredElement, selectedElement } from './nodes/store';
  export let viteBase: string;

  function highlightElement(element: SvelteHTMLElement) {
    if (element === $hoveredElement) return;
    if ($hoveredElement) $hoveredElement.classList.remove('kitbook-viewer-active-target');

    $hoveredElement = element
    $hoveredElement.classList.add('kitbook-viewer-active-target');
  }

  onMount(() => {
    document.body.classList.add('crosshairs');

    return () => {
      document.body.classList.remove('crosshairs');
      $hoveredElement?.classList.remove('kitbook-viewer-active-target');
      $hoveredElement = null
      
      $selectedElement = null;
    };
  });

  function selectElement(element: SvelteHTMLElement) {
    if (!isSelectable(element)) return;
    $selectedElement = element;

    // const { file, line, column } = element.__svelte_meta.loc;
    // const file_loc = `${file}:${line + 1}:${column + 1}`;
    // if (file_loc) {
    //   fetch(`${viteBase}/__open-in-editor?file=${encodeURIComponent(file_loc)}`);
    // }
  }

  function isSelectable(element: SvelteHTMLElement) {
    const file = element.__svelte_meta?.loc?.file;
    if (!file || file.includes('node_modules/')) return false; // no file or 3rd party

    return true;
  }
</script>

<svelte:body
  on:click|preventDefault={({ target }) => {
    console.log({ target });
    // @ts-ignore
    selectElement(target);
  }}
  on:mouseover={({ target }) => {
    // @ts-ignore
    highlightElement(target);
    console.log({ target });
  }}
/>

<style>
  :global(.kitbook-viewer-active-target) {
    outline: 2px dashed #ff3e00 !important;
  }

  :global(.crosshairs) {
    cursor: crosshair !important;
  }
</style>
