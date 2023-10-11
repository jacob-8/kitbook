<script lang="ts">
  import { onMount } from 'svelte'
  import {
    hoveredComponent,
    hoveredElement,
    selectedComponent,
    selectedElement,
  } from './tree/active'
  import { componentsWithChildren, elementsToParentComponent } from './tree/nodes'
  import Props from './Props.Svelte'

  let hoveredComponentBounds: {
    top: number
    right: number
    bottom: number
    left: number
  }
  let hoveredComponentDetail: SvelteComponentDetail

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
    hoveredComponentBounds = null
    hoveredComponentDetail = null
  }

  function hover(element: SvelteElementDetail) {
    if (element === $hoveredElement)
      return

    $hoveredElement = element
    $hoveredComponent = $elementsToParentComponent.get(element)
  }

  $: if (!$hoveredComponent)
    removeHoverClasses()

  $: if ($hoveredComponent)
    updateHoveredComponentDisplay()

  function updateHoveredComponentDisplay() {
    removeHoverClasses()

    const component = $componentsWithChildren.get($hoveredComponent)
    hoveredComponentDetail = component.componentDetail

    const bounds = {
      top: 50000,
      right: 50000,
      bottom: 50000,
      left: 50000,
    }

    const { clientWidth, clientHeight } = document.documentElement
    const offset = window.scrollY

    for (const element of component.childElements) {
      const rect = element.getBoundingClientRect()
      bounds.top = Math.min(bounds.top, offset + rect.top)
      bounds.right = Math.min(bounds.right, clientWidth - rect.right)
      bounds.bottom = Math.min(bounds.bottom, clientHeight - rect.bottom)
      bounds.left = Math.min(bounds.left, rect.left)
    }

    hoveredComponentBounds = bounds
  }

  function select(element: SvelteElementDetail) {
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

  let labelWidth: number
  let mouseX: number
  let mouseY: number
</script>

<svelte:body
  on:click|preventDefault={({ target }) => {
    // @ts-expect-error - not able to add types here because JS
    select(target)
  }}
  on:mouseover={({ target }) => {
    // @ts-expect-error - not able to add types here because JS
    hover(target)
  }}
  on:mouseleave={() => {
    removeHoverStateAndClasses()
  }}
  on:mousemove={({ x, y }) => {
    mouseX = x
    mouseY = y
  }} />

{#if hoveredComponentBounds}
  <div
    class="fixed outline-3 outline-dashed outline-gray-300 bg-gray-500/10 pointer-events-none"
    style="
      top: {hoveredComponentBounds.top}px;
        right: {hoveredComponentBounds.right}px;
        bottom: {hoveredComponentBounds.bottom}px;
        left: {hoveredComponentBounds.left}px;
    " />
{/if}

{#if hoveredComponentDetail}
  <div
    style:left="{Math.min(mouseX + 10, document.documentElement.clientWidth - labelWidth - 10)}px"
    style:top="{document.documentElement.clientHeight < mouseY + 50 ? mouseY - 10 : mouseY + 10}px"
    bind:offsetWidth={labelWidth}
    class="fixed bg-#000000cc text-white py-2px px-1 rounded z-9999999 pointer-events-none">
    <div>
      {hoveredComponentDetail.tagName}
    </div>
    <Props props={hoveredComponentDetail.options.props} />
  </div>
{/if}

<style>
  :global(.crosshairs) {
    cursor: crosshair !important;
  }
</style>
