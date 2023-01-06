<script lang="ts">
  import { clamp } from '../utils/clamp';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{ change: boolean }>();

  export let type: 'vertical' | 'horizontal' = 'horizontal';
  export let fixed = false;
  export let dividerHoverColor = 'hsl(195, 53%, 70%)';
  export let pos = 50;
  export let min = 10;
  export let max: number = undefined;
  $: max = max || 100 - min;
  $: pos = clamp(pos, min, max);

  let dragging = false;
  let container: HTMLDivElement;
  let containerWidth: number;
  let containerHeight: number;
  $: size = type === 'vertical' ? containerHeight : containerWidth;

  function setPos(event: MouseEvent) {
    const { top, left } = container.getBoundingClientRect();
    const px = type === 'vertical' ? event.clientY - top : event.clientX - left;
    pos = (100 * px) / size;
    dispatch('change');
  }

  function setTouchPos(event: TouchEvent) {
    const { top, left } = container.getBoundingClientRect();
    const px =
      type === 'vertical' ? event.touches[0].clientY - top : event.touches[0].clientX - left;
    pos = (100 * px) / size;
    dispatch('change');
  }

  function drag(node: HTMLElement, callback: (event: MouseEvent) => void) {
    const onmousedown = (event: MouseEvent) => {
      event.preventDefault();
      dragging = true;
      const onmouseup = () => {
        dragging = false;
        window.removeEventListener('mousemove', callback, false);
        window.removeEventListener('mouseup', onmouseup, false);
      };
      window.addEventListener('mousemove', callback, false);
      window.addEventListener('mouseup', onmouseup, false);
    };
    node.addEventListener('mousedown', onmousedown, false);
    return {
      destroy() {
        node.removeEventListener('mousedown', onmousedown, false);
      },
    };
  }
  function touchDrag(node: HTMLElement, callback: (event: TouchEvent) => void) {
    const ontouchstart = (event: TouchEvent) => {
      if (event.targetTouches.length > 1) return;
      event.preventDefault();
      dragging = true;
      const ontouchend = () => {
        dragging = false;
        window.removeEventListener('touchmove', callback, false);
        window.removeEventListener('touchend', ontouchend, false);
      };
      window.addEventListener('touchmove', callback, false);
      window.addEventListener('touchend', ontouchend, false);
    };
    node.addEventListener('touchstart', ontouchstart, false);
    return {
      destroy() {
        node.removeEventListener('touchstart', ontouchstart, false);
      },
    };
  }
</script>

<div
  class:flex-col={type === 'vertical'}
  class="relative h-full w-full flex items-stretch"
  style="--dividerHoverColor: {dividerHoverColor}"
  bind:this={container}
  bind:clientWidth={containerWidth}
  bind:clientHeight={containerHeight}
>
  <div class="pane" style="flex-basis: {pos}%;">
    <slot name="a" />
  </div>

  <div class="pane" style="flex-basis: {100 - pos}%;">
    <slot name="b" />
  </div>

  {#if !fixed}
    <div
      class:horizontal={type === 'horizontal'}
      class:vertical={type === 'vertical'}
      class="divider"
      style="{type === 'horizontal' ? 'left' : 'top'}: calc({pos}% - 8px)"
      use:drag={setPos}
      use:touchDrag={setTouchPos}
    />
  {/if}
</div>

{#if dragging}
  <div class="mousecatcher" />
{/if}

<style>
  .pane {
    position: relative;
    overflow: auto;
  }
  .mousecatcher {
    --at-apply: absolute inset-0;
  }
  .divider {
    position: absolute;
    z-index: 10;
    display: block;
  }
  .divider:hover::after {
    background-color: var(--dividerHoverColor);
    opacity: 0.5;
    transition: background-color 1s;
  }
  .divider::after {
    content: '';
    position: absolute;
  }
  .horizontal {
    padding: 0 8px;
    width: 0;
    height: 100%;
    cursor: ew-resize;
  }
  .horizontal::after {
    left: 4px;
    top: 0;
    width: 8px;
    height: 100%;
  }
  .vertical {
    padding: 8px 0;
    width: 100%;
    height: 0;
    cursor: ns-resize;
  }
  .vertical::after {
    top: 4px;
    left: 0;
    width: 100%;
    height: 8px;
  }
</style>
