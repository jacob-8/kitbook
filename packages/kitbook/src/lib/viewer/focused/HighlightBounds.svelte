<script lang="ts">
  export let elementsToHighlight: Set<SvelteElementDetail>
  export let color: 'gray' | 'blue' = 'gray'

  let highlightBounds = {
    top: null,
    right: null,
    bottom: null,
    left: null,
  }

  $: if (elementsToHighlight?.size > 0) {
    const bounds = {
      top: 50000,
      right: 50000,
      bottom: 50000,
      left: 50000,
    }

    const { clientWidth, clientHeight } = document.documentElement
    const offset = window.scrollY

    for (const element of elementsToHighlight) {
      const rect = element.getBoundingClientRect()
      bounds.top = Math.min(bounds.top, offset + rect.top)
      bounds.right = Math.min(bounds.right, clientWidth - rect.right)
      bounds.bottom = Math.min(bounds.bottom, clientHeight - rect.bottom)
      bounds.left = Math.min(bounds.left, rect.left)
    }

    highlightBounds = bounds
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
