<script lang="ts">
  export let elementsToHighlight: Set<SvelteElementDetail>
  export let color: 'gray' | 'blue' = 'gray'

  let highlightBounds: {
    top: number
    right: number
    bottom: number
    left: number
  }

  $: if (elementsToHighlight)
    calculateBounds()

  function calculateBounds() {
    if (elementsToHighlight?.size === 0)
      return highlightBounds = undefined

    const bounds = {
      top: Number.POSITIVE_INFINITY,
      right: Number.POSITIVE_INFINITY,
      bottom: Number.POSITIVE_INFINITY,
      left: Number.POSITIVE_INFINITY,
    }

    const { clientWidth, clientHeight } = document.documentElement

    for (const element of elementsToHighlight) {
      const rect = element.getBoundingClientRect()
      bounds.top = Math.min(bounds.top, rect.top)
      bounds.right = Math.min(bounds.right, clientWidth - rect.right)
      bounds.bottom = Math.min(bounds.bottom, clientHeight - rect.bottom)
      bounds.left = Math.min(bounds.left, rect.left)
    }

    highlightBounds = bounds
  }

  $: {
    const firstElement = elementsToHighlight.values().next().value as SvelteElementDetail
    const { clientHeight: documentHeight } = document.documentElement
    const { clientHeight: elementHeight } = firstElement
    if (elementHeight < documentHeight) {
      firstElement.scrollIntoView({ block: 'nearest' })
      calculateBounds()
    }
  }
</script>

{#if highlightBounds}
  <div
    class:outline-gray-300={color === 'gray'}
    class:bg-gray-500={color === 'gray'}
    class:outline-blue-300={color === 'blue'}
    class:bg-blue-500={color === 'blue'}
    class="fixed outline-3 outline-dashed !bg-opacity-10 pointer-events-none z-9999999"
    style="
      top: {highlightBounds.top}px;
        right: {highlightBounds.right}px;
        bottom: {highlightBounds.bottom}px;
        left: {highlightBounds.left}px;
    " />
{/if}

<svelte:window on:scroll={calculateBounds} on:resize={calculateBounds} />
