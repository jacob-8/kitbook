<script lang="ts">
  import { createPersistedStore } from 'svelte-pieces'

  const side = createPersistedStore<'top' | 'right' | 'bottom' | 'left'>('side', 'right')
  const percentage = createPersistedStore<number>('percentage', 50)
  const margin = 8

  let windowWidth = 0
  let windowHeight = 0

  $: vertical = $side === 'right' || $side === 'left'

  let from: 'top' | 'right' | 'bottom' | 'left'
  $: from = (() => {
    if (vertical && $percentage <= 50)
      return 'top'
    if (!vertical && $percentage > 50)
      return 'right'
    if (vertical && $percentage > 50)
      return 'bottom'
    if (!vertical && $percentage <= 50)
      return 'left'
  })()

  $: positionStyle = (() => {
    if (from === 'top')
      return `top: ${$percentage}%`
    if (from === 'right')
      return `right: ${100 - $percentage}%`
    if (from === 'bottom')
      return `bottom: ${100 - $percentage}%`
    if (from === 'left')
      return `left: ${$percentage}%`
  })()

  function firstIsSmallest(numbers: number[]) {
    return numbers[0] === Math.min(...numbers)
  }

  function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max)
  }

  function getLocation(e: MouseEvent | TouchEvent) {
    if ('clientX' in e)
      return { x: e.clientX, y: e.clientY }
    return { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  let mouseLocation: { x: number; y: number }
  let dragging = false

  function onDown(e: MouseEvent | TouchEvent) {
    mouseLocation = getLocation(e)
  }

  function onMove(e: MouseEvent | TouchEvent) {
    if (!mouseLocation)
      return

    const { x, y } = getLocation(e)
    if (!dragging && Math.abs(x - mouseLocation.x) < 10 && Math.abs(y - mouseLocation.y) < 10)
      return
    dragging = true

    const distanceFromTop = y
    const distanceFromBottom = windowHeight - y
    const distanceFromLeft = x
    const distanceFromRight = windowWidth - x
    const showOnTop = firstIsSmallest([distanceFromTop, distanceFromBottom, distanceFromLeft, distanceFromRight])
    const showOnRight = firstIsSmallest([distanceFromRight, distanceFromTop, distanceFromBottom, distanceFromLeft])
    const showOnBottom = firstIsSmallest([distanceFromBottom, distanceFromRight, distanceFromTop, distanceFromLeft])
    const showOnLeft = firstIsSmallest([distanceFromLeft, distanceFromBottom, distanceFromTop, distanceFromRight])
    if (showOnTop)
      $side = 'top'
    if (showOnRight)
      $side = 'right'
    if (showOnBottom)
      $side = 'bottom'
    if (showOnLeft)
      $side = 'left'

    if (showOnTop || showOnBottom) {
      const percentageMargin = margin / windowWidth * 100
      $percentage = clamp(distanceFromLeft / windowWidth * 100, percentageMargin, 100 - percentageMargin)
    }
    else {
      const percentageMargin = margin / windowHeight * 100
      $percentage = clamp(distanceFromTop / windowHeight * 100, percentageMargin, 100 - percentageMargin)
    }
  }

  function onUp() {
    mouseLocation = null
    dragging = false
  }
</script>

<div
  class:left-2={$side === 'left'}
  class:right-2={$side === 'right'}
  class:top-2={$side === 'top'}
  class:bottom-2={$side === 'bottom'}
  on:mousedown={onDown}
  on:touchstart={onDown}
  class="fixed select-none"
  style={positionStyle}>
  <slot side={$side} {from} {dragging} /></div>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} on:mouseup={onUp} on:touchend={onUp} on:mousemove={onMove} on:touchmove={onMove} />
