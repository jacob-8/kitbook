<script lang="ts">
  import { onMount } from 'svelte'
  import {
    hoveredComponent,
    hoveredElement,
    selectedComponent,
    selectedElement,
  } from './tree/active'
  import { componentsWithChildren, elementsToParentComponent } from './tree/nodes'

  // export let viteBase: string

  let highlightedComponentBounds: {
    top: number
    right: number
    bottom: number
    left: number
  }

  onMount(() => {
    document.body.classList.add('crosshairs')
    return () => {
      document.body.classList.remove('crosshairs')
      removeHoverStateAndClasses()
      $selectedElement = null
      $selectedComponent = null
    }
  })

  function removeHoverStateAndClasses() {
    $hoveredElement = null
    $hoveredComponent = null
    removeHoverClasses()
  }

  function removeHoverClasses() {
    highlightedComponentBounds = null
  // for (const element of document.querySelectorAll('.kitbook-viewer-hovered'))
    //   element.classList.remove('kitbook-viewer-hovered')
  }

  function highlightElement(element: SvelteElementDetail) {
    if (element === $hoveredElement)
      return

    $hoveredElement = element
    $hoveredComponent = $elementsToParentComponent.get(element)
  }

  $: if ($hoveredComponent) {
    removeHoverClasses()

    const componentElements = $componentsWithChildren.get($hoveredComponent).childElements

    const bounds = {
      top: 50000,
      right: 50000,
      bottom: 50000,
      left: 50000,
    }

    const { clientWidth, clientHeight } = document.documentElement
    const offset = window.scrollY

    for (const element of componentElements) {
      // element.classList.add('kitbook-viewer-hovered')
      const rect = element.getBoundingClientRect()
      bounds.top = Math.min(bounds.top, offset + rect.top)
      bounds.right = Math.min(bounds.right, clientWidth - rect.right)
      bounds.bottom = Math.min(bounds.bottom, clientHeight - rect.bottom)
      bounds.left = Math.min(bounds.left, rect.left)
    }

    highlightedComponentBounds = bounds
  }

  $: if (!$hoveredComponent)
    removeHoverClasses()

  function selectElement(element: SvelteElementDetail) {
    if (!isSelectable(element))
      return
    $selectedElement = element
    $selectedComponent = $elementsToParentComponent.get(element)
  }

  function isSelectable(element: SvelteElementDetail) {
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
  }}
  on:mouseleave={() => {
    removeHoverStateAndClasses()
  }} />

{#if highlightedComponentBounds}
  <div
    class="fixed outline-3 outline-dashed outline-gray-300 bg-gray-500/10 pointer-events-none"
    style="
      top: {highlightedComponentBounds.top}px;
        right: {highlightedComponentBounds.right}px;
        bottom: {highlightedComponentBounds.bottom}px;
        left: {highlightedComponentBounds.left}px;
    " />
{/if}

<style>
  :global(.kitbook-viewer-hovered) {
    outline: 2px dashed #ff3e00 !important;
  }
  /* :global(.kitbook-viewer-hovered::before) {
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
