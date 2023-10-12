<script lang="ts">
  import { onMount } from 'svelte'
  import {
    hoveredComponent,
    hoveredElement,
    selectedComponent,
    selectedElement,
  } from './focused/active'
  import { componentsWithChildren, elementsToParentComponent } from './tree/nodes'
  // import Props from './Props.svelte'
  import HighlightBounds from './focused/HighlightBounds.svelte'
  import { getFirstElementFilename } from './focused/filename'

  onMount(() => {
    document.body.classList.add('crosshairs')
    return () => {
      document.body.classList.remove('crosshairs')
      removeHover()
      removeSelect()
    }
  })

  function removeHover() {
    $hoveredElement = null
    $hoveredComponent = null
  }

  function removeSelect() {
    $selectedElement = null
    $selectedComponent = null
  }

  function hover(element: SvelteElementDetail) {
    if (!isSelectable(element))
      return

    if (element === $hoveredElement)
      return

    $hoveredElement = element
    const hoveredFragment = $elementsToParentComponent.get(element)
    $hoveredComponent = $componentsWithChildren.get(hoveredFragment)
  }

  function select(element: SvelteElementDetail) {
    if (!isSelectable(element))
      return

    if (element === $selectedElement)
      return removeSelect()

    $selectedElement = element
    const selectedFragment = $elementsToParentComponent.get(element)
    $selectedComponent = $componentsWithChildren.get(selectedFragment)
  }

  function isSelectable(element: SvelteElementDetail) {
    const file = element.__svelte_meta?.loc?.file
    if (!file || file.includes('node_modules'))
      return false // no file or 3rd party
    return true
  }

  let labelWidth: number
  let mouseX: number
  let mouseY: number
</script>

<svelte:body
  on:click|preventDefault|stopPropagation={({ target }) => {
    // @ts-expect-error - not able to add types here because JS
    select(target)
  }}
  on:mouseover={({ target }) => {
    // @ts-expect-error - not able to add types here because JS
    hover(target)
  }}
  on:mouseleave={() => {
    removeHover()
  }}
  on:mousemove={({ x, y }) => {
    mouseX = x
    mouseY = y
  }} />

{#if $selectedComponent}
  <HighlightBounds elementsToHighlight={$selectedComponent.childElements} color="blue" />
{/if}

{#if $hoveredComponent}
  {#if $selectedComponent !== $hoveredComponent}
    <HighlightBounds elementsToHighlight={$hoveredComponent.childElements} />
  {/if}
  <div
    style:left="{Math.min(mouseX + 10, document.documentElement.clientWidth - labelWidth - 10)}px"
    style:top="{document.documentElement.clientHeight < mouseY + 50 ? mouseY - 10 : mouseY + 10}px"
    bind:offsetWidth={labelWidth}
    class="fixed bg-#000000cc text-white py-2px px-1 rounded z-10000000 pointer-events-none">
    <div>
      {$hoveredComponent.componentDetail.tagName} <span class="text-xs text-gray">{getFirstElementFilename($hoveredComponent).split('src/').pop()}</span>
    </div>
    <!-- <Props props={$hoveredComponent.componentDetail.options.props} /> -->
  </div>
{/if}

<style>
  :global(.crosshairs) {
    cursor: crosshair !important;
  }
</style>
