<script lang="ts">
  import { fly } from 'svelte/transition';
  import { spring } from 'svelte/motion';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  const close = () => dispatch('close');

  export let zIndex = 1;
  export let width = 600;
  export let max = 10;
  export let min = 85;
  export let maxAuto = 40;
  let top = spring(min);

  let sheetHeight = 400;
  let innerHeight = 500;
  $: sheetHeightPercentage = 100 - (sheetHeight / innerHeight) * 100;
  $: maxTop = Math.max(sheetHeightPercentage, max);
  $: setTop([maxTop, maxAuto]);
  function setTop(values: number[]) {
    top.set(Math.max(...values));
  }

  let previousY: number;
  let draggedTo: number;
  function touchStart(e: TouchEvent) {
    previousY = e.touches[0].clientY;
  }
  function touchMove(e: TouchEvent) {
    if (!draggedTo) draggedTo = $top;
    const currentY = e.touches[0].clientY;
    const movementY = currentY - previousY; // touch equivalent to top += e.movementY mouse option
    const percentageChange = (100 * movementY) / innerHeight;
    draggedTo += percentageChange;
    previousY = currentY;
  }
  function touchEnd() {
    if (draggedTo > min) close();
    previousY = null;
    draggedTo = Math.max(maxTop, draggedTo);
  }

  $: opacity = draggedTo > min ? (100 - draggedTo) / (100 - min) : 1;
</script>

<svelte:window bind:innerHeight on:keydown={(e) => e.key === 'Escape' && close()} />

<div
  transition:fly={{ y: 500 }}
  style="top: {draggedTo
    ? Math.max(maxTop - 1, draggedTo)
    : $top}%; opacity: {opacity}; z-index: {zIndex}"
  class="fixed inset-x-0 bottom-0 flex justify-center items-start pointer-events-none"
>
  <div
    bind:clientHeight={sheetHeight}
    class="bg-white rounded-t-2xl flex flex-col relative pointer-events-auto"
    style="box-shadow: rgba(0, 0, 0, 0.12) 0px -1px 8px;  width: {width}px; max-width: 100%;"
  >
    <div class="absolute top-0 text-center w-full md:hidden z-0 pointer-events-none">
      <span class="i-ph-minus-bold text-5xl text-gray-300 -mt-4" />
    </div>

    <div
      class="font-semibold flex"
      on:touchstart={touchStart}
      on:touchmove|preventDefault={touchMove}
      on:touchend={touchEnd}
    >
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

    <div class="overflow-y-auto">
      <div class="p-2">
        <slot />
      </div>
    </div>
  </div>
</div>
