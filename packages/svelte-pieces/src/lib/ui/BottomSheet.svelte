<script lang="ts">
  import { fly } from 'svelte/transition';
  import { spring } from 'svelte/motion';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  const close = () => dispatch('close');

  export let max = 10;
  export let min = 85;
  export let start = 40;
  let top = spring(start);
  let draggedTo: number;

  let headerHeight = 44;
  let contentHeight = 100;
  let innerHeight = 500;
  $: sheetHeightPercentage = 100 - ((headerHeight + contentHeight) / innerHeight) * 100;
  $: maxTop = Math.max(sheetHeightPercentage, max);
  $: setTop([maxTop, start]);
  function setTop(values: number[]) {
    top.set(Math.max(...values));
  }

  let previousTouch: Touch;
  function setTouchPos(e: TouchEvent) {
    const touch = e.touches[0];
    if (previousTouch) {
      const movementY = touch.clientY - previousTouch.clientY; // touch equivalent to top += e.movementY mouse option
      const percentageChange = (100 * movementY) / innerHeight;
      draggedTo += percentageChange;
    } else if (!draggedTo) {
      draggedTo = $top;
    }
    previousTouch = touch;
  }
  function touchDrag(node: Node, callback: (e: TouchEvent) => void) {
    const touchdown = (e: TouchEvent) => {
      if (e.targetTouches.length > 1) return;
      e.preventDefault();
      const ontouchend = () => {
        window.removeEventListener('touchmove', callback, false);
        window.removeEventListener('touchend', ontouchend, false);
        if (draggedTo > min) close();
        previousTouch = null;
        draggedTo = Math.max(maxTop, draggedTo);
      };
      window.addEventListener('touchmove', callback, false);
      window.addEventListener('touchend', ontouchend, false);
    };
    node.addEventListener('touchstart', touchdown, false);
    return {
      destroy() {
        node.removeEventListener('touchstart', touchdown, false);
      },
    };
  }

  $: opacity = draggedTo > min ? (100 - draggedTo) / (100 - min) : 1;
</script>

<!-- <svelte:window bind:innerHeight /> -->
<div bind:clientHeight={innerHeight} class="absolute inset-0 -z-1" />

<div
  transition:fly={{ y: 500 }}
  style="top: {draggedTo
    ? Math.max(maxTop - 1, draggedTo)
    : $top}%; box-shadow: rgba(0, 0, 0, 0.12) 0px -1px 8px; opacity: {opacity}"
  class="bg-white absolute w-full bottom-0 rounded-t-2xl flex flex-col"
>
  <div class="absolute top-0 text-center w-full">
    <span class="i-ph-minus-bold text-5xl text-gray-300 pointer-events-none -mt-4" />
  </div>

  <div class="font-semibold flex" bind:clientHeight={headerHeight} use:touchDrag={setTouchPos}>
    <div class="p-2 pr-12">
      <slot name="header" />
    </div>
  </div>
  <button
    on:click={close}
    class="ml-auto px-3 py-2 text-gray-500 hover:text-gray-800 rounded-xl absolute top-0 right-0"
  >
    <span class="i-fa-solid-times mb-1" />
  </button>

  <div class="overflow-y-auto">
    <div class="p-2" bind:clientHeight={contentHeight}>
      <slot />
    </div>
  </div>
</div>
