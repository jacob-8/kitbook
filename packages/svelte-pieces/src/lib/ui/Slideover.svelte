<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { fly, fade } from 'svelte/transition';

  export let zIndex = 60;
  export let duration = 200;
  export let side: 'left' | 'right' = 'right';
  export let widthRem = 16;
  export let maxWidthPercentage = 70;

  const dispatch = createEventDispatcher<{ close: boolean }>();
  const close = () => dispatch('close');

  let modal: HTMLElement;

  const handle_keydown = (e) => {
    if (e.key === 'Escape') {
      close();
      return;
    }

    if (e.key === 'Tab') {
      // trap focus
      const nodes = modal.querySelectorAll('*');
      //@ts-ignore
      const tabbable = Array.from(nodes).filter((n) => n.tabIndex >= 0);

      let index = tabbable.indexOf(document.activeElement);
      if (index === -1 && e.shiftKey) index = 0;

      index += tabbable.length + (e.shiftKey ? -1 : 1);
      index %= tabbable.length;

      //@ts-ignore
      tabbable[index].focus();
      e.preventDefault();
    }
  };

  const previously_focused = typeof document !== 'undefined' && document.activeElement;

  if (previously_focused) {
    onDestroy(() => {
      //@ts-ignore
      previously_focused.focus();
    });
  }
</script>

<svelte:window on:keydown={handle_keydown} />

<div
  class:right-0={side === 'right'}
  class:left-0={side === 'left'}
  class="fixed inset-y-0 flex"
  style="z-index: {zIndex};"
>
  <div class="fixed inset-0 transition-opacity" transition:fade={{ duration }}>
    <div class="absolute inset-0 bg-black opacity-25" on:click={close} />
  </div>

  <div
    transition:fly={{ x: side === 'right' ? 200 : -200, duration }}
    class="bg-white overflow-hidden shadow-xl transform
    transition-all w-64 h-full flex flex-col"
    style="width: {widthRem}rem; max-width: {maxWidthPercentage}vw;"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-headline"
    bind:this={modal}
  >
    {#if $$slots.title}
      <div class="flex items-start justify-between border-b border-gray-300">
        <h3 class="text-lg font-medium text-gray-900 p-3" id="modal-headline">
          <slot name="title" />
        </h3>
        <button
          on:click={close}
          type="button"
          class="text-gray-400 px-3 py-4 flex hover:text-gray-500 focus:outline-none
    focus:text-gray-500 transition ease-in-out duration-150"
          aria-label="Close"
        >
          <span class="i-fa-solid-times text-lg" /></button
        >
      </div>
    {/if}

    <slot name="heading" />

    <div class="flex-1 overflow-y-auto">
      <slot />
    </div>
  </div>
</div>

<!-- Modal classes: https://tailwindui.com/components/application-ui/overlays/modals -->
<!-- Design Inspiration: https://bt-voice-memos.appspot.com/create -->
<!-- About blog: https://aerotwist.com/blog/voice-memos/ -->
