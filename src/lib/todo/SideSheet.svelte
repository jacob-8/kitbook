<script lang="ts">
  let dialog;
  let backdrop;

  let startX;
  let startY;
  let direction;
  export let open = false;
  export let threshold = 0.3;
  export let backdropOpacity = 0.5;
  export let speed = 0.2;
  const touch = (e) => (e.changedTouches ? e.changedTouches[0] : e);
  const deltaX = (e) => startX - touch(e).clientX;
  const deltaY = (e) => startY - touch(e).clientY;
  const touchStart = (e) => {
    startX = touch(e).clientX;
    startY = touch(e).clientY;
  };
  const touchMove = (e) => {
    if (!direction) {
      direction = Math.abs(deltaY(e)) > Math.abs(deltaX(e)) ? 'vertical' : 'horizontal';
    }
    if (deltaX(e) < 0 && direction === 'horizontal') {
      dialog.style.setProperty('--b', deltaX(e) + 'px');
      backdrop.style.setProperty('--o', (1 + deltaX(e) / dialog.clientWidth) * backdropOpacity);
    }
  };
  const touchEnd = (e) => {
    if (direction === 'horizontal') {
      open = -deltaX(e) / dialog.clientWidth < threshold;
    }
    startX = null;
    direction = null;
  };
  $: if (dialog && backdrop) {
    dialog.style.setProperty('--s', speed + 's');
    backdrop.style.setProperty('--s', speed + 's');
  }
  $: if (dialog && backdrop && !direction) {
    dialog.style.setProperty('--b', open ? '0px' : -dialog.clientWidth + 'px');
    backdrop.style.setProperty('--o', open ? backdropOpacity : 0);
  }
</script>

<div
  bind:this={backdrop}
  class="fixed inset-0 bg-black backdrop"
  data-smooth={!startX}
  {open}
  on:click={() => (open = false)} />

<!-- {$$props.class}  -->
<div
  bind:this={dialog}
  class="fixed bg-white w-72 inset-y-0 overflow-y-auto top-0 side-sheet shadow-xl
  p-4 sm:p-6 flex flex-col"
  data-smooth={!startX}
  on:touchstart={touchStart}
  on:touchmove={touchMove}
  on:touchend={touchEnd}>
  <header class="flex items-start justify-between mb-4 sm:mb-6">
    <h2 class="text-lg leading-7 font-medium text-gray-900">
      <slot name="title" />
    </h2>
    <button
      type="button"
      on:click={() => (open = false)}
      aria-label="Close panel"
      class="text-gray-400 hover:text-gray-500 transition ease-in-out
      duration-150 h-7 flex items-center">
      <span class="i-fa-solid-times text-lg" />
    </button>
  </header>

  <slot />
  <!-- Nice layout idea for within slot: -->
  <!-- <div class="flex flex-col space-y-1"></div> -->
</div>

<!-- From https://github.com/kroniapp/svelte-swipeable-sheets -->
<style>
  .side-sheet {
    right: var(--b, -100%);
    z-index: 52;
  }
  .side-sheet[data-smooth='true'] {
    transition: right calc(var(--f, 1) * var(--s, 0s)) ease-in-out;
  }
  .backdrop {
    pointer-events: none;
    opacity: var(--o, 0);
    z-index: 51;
  }
  .backdrop[data-smooth='true'] {
    transition: opacity calc(var(--f, 1) * var(--s, 0s)) ease-in-out;
  }
  .backdrop[open='true'] {
    pointer-events: all;
  }
</style>
