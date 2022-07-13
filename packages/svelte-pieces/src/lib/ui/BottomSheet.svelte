<script lang="ts">
  import { fly } from 'svelte/transition';
  import { spring } from 'svelte/motion';
  import { createEventDispatcher } from 'svelte';
  import IntersectionObserver from '$lib/functions/IntersectionObserver.svelte';
  const dispatch = createEventDispatcher();
  const close = () => dispatch('close');

  export let zIndex = 1;
  export let width = 600;
  export let max = 10;
  export let min = 85;
  export let maxAuto = 40;
  let top = spring(min);

  let headerHeight = 44;
  let contentHeight = 100;
  let innerHeight = 500;
  $: sheetHeightPercentage = 100 - ((headerHeight + contentHeight) / innerHeight) * 100;
  $: maxTop = Math.max(sheetHeightPercentage, max);
  $: setTop([maxTop, maxAuto]);
  function setTop(values: number[]) {
    top.set(Math.max(...values));
  }

  let previousY: number;
  let draggedTo: number;
  let contentScrolledTop = true;
  let contentScrolledBottom = false;
  let ignoreContentDrag = false;

  function touchStart(e: TouchEvent) {
    previousY = e.touches[0].clientY;
  }
  function touchMove(e: TouchEvent, fromContent = false) {
    if (ignoreContentDrag) return;
    if (!draggedTo) draggedTo = $top;
    const currentY = e.touches[0].clientY;
    const movementY = currentY - previousY; // touch equivalent to top += e.movementY mouse option
    previousY = currentY;

    if (fromContent) {
      const direction = movementY > 0 ? 'down' : 'up';
      if (direction === 'down' && !contentScrolledTop) return (ignoreContentDrag = true);
      if (direction === 'up' && !contentScrolledBottom) return (ignoreContentDrag = true);
    }
    e.preventDefault();

    const percentageChange = (100 * movementY) / innerHeight;
    draggedTo += percentageChange;
  }
  function touchEnd() {
    if (draggedTo > min) close();
    previousY = null;
    draggedTo = Math.max(maxTop, draggedTo);
    ignoreContentDrag = false;
  }

  $: opacity = draggedTo > min ? (100 - draggedTo) / (100 - min) : 1;
</script>

<svelte:window bind:innerHeight on:keydown={(e) => e.key === 'Escape' && close()} />

<div
  transition:fly={{ y: 500 }}
  style="top: {draggedTo
    ? Math.max(maxTop - 1, draggedTo)
    : $top}%; opacity: {opacity}; z-index: {zIndex}"
  class="fixed inset-x-0 bottom-0 flex justify-center pointer-events-none"
>
  <div
    class="bg-white rounded-t-2xl flex flex-col relative pointer-events-auto"
    style="box-shadow: rgba(0, 0, 0, 0.12) 0px -1px 8px;  width: {width}px; max-width: 100%;"
    on:touchstart={touchStart}
    on:touchmove|preventDefault={touchMove}
    on:touchend={touchEnd}
  >
    <div class="absolute top-0 text-center w-full md:hidden pointer-events-none">
      <span class="i-ph-minus-bold text-5xl text-gray-300 -mt-4" />
    </div>

    <div class="font-semibold flex" bind:clientHeight={headerHeight}>
      <div class="p-2">
        <slot name="header" />
      </div>
      <button
        on:click={close}
        class="ml-auto px-3 py-2 text-gray-500 hover:text-gray-800 rounded-xl"
      >
        <span class="i-fa-solid-times mb-1" />
      </button>
    </div>

    <div
      class="overflow-y-auto"
      on:touchmove|stopPropagation={(e) => touchMove(e, true)}
    >
      <div class="p-2" bind:clientHeight={contentHeight}>
        <IntersectionObserver
          heightPercentage={0}
          on:intersected={() => (contentScrolledTop = true)}
          on:hidden={() => (contentScrolledTop = false)}
        />
        <slot />
        <IntersectionObserver
          heightPercentage={0}
          on:intersected={() => (contentScrolledBottom = true)}
          on:hidden={() => (contentScrolledBottom = false)}
        />
      </div>
    </div>
  </div>
</div>
