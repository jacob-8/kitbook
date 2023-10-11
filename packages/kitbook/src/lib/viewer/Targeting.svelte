<script lang="ts">
  import { onMount } from 'svelte'
  import { hoveredElement, selectedElement } from './tree/active'
  import { componentsWithChildren, elementsToParentComponent } from './tree/nodes'

  export let viteBase: string

  onMount(() => {
    document.body.classList.add('crosshairs')
    return () => {
      document.body.classList.remove('crosshairs')
      $hoveredElement?.classList.remove('kitbook-viewer-active-target')
      $hoveredElement = null

      $selectedElement = null
    }
  })

  function highlightElement(element: SvelteHTMLElement) {
    if (element === $hoveredElement)
      return
    if ($hoveredElement)
      $hoveredElement.classList.remove('kitbook-viewer-active-target')

    $hoveredElement = element
    $hoveredElement.classList.add('kitbook-viewer-active-target')
  }

  function selectElement(element: SvelteHTMLElement) {
    if (!isSelectable(element))
      return
    $selectedElement = element

    const componentFragment = $elementsToParentComponent.get(element)
    console.log({ component: $componentsWithChildren.get(componentFragment).componentDetail.tagName })

  // const { file, line, column } = element.__svelte_meta.loc;
    // const file_loc = `${file}:${line + 1}:${column + 1}`;
    // if (file_loc) {
    //   fetch(`${viteBase}/__open-in-editor?file=${encodeURIComponent(file_loc)}`);
    // }
  }

  function isSelectable(element: SvelteHTMLElement) {
    const file = element.__svelte_meta?.loc?.file
    if (!file || file.includes('node_modules/'))
      return false // no file or 3rd party
    return true
  }
</script>

<svelte:body
  on:click|preventDefault={({ target }) => {
    // @ts-expect-error - not able to add types here because JS
    selectElement(target)
  }}
  on:mouseover={({ target }) => {
    // @ts-expect-error - not able to add types here because JS
    highlightElement(target)
  }} />

<style>
  :global(.kitbook-viewer-active-target) {
    outline: 2px dashed #ff3e00 !important;
  }
  /* :global(.kitbook-viewer-active-target::before) {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 50%;
    background-color: rgba(255, 0, 0, 0.5);
    z-index: 1;
  } */

  :global(.crosshairs) {
    cursor: crosshair !important;
  }
</style>
