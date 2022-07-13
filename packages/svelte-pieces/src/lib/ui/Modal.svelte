<script lang="ts">
  import { portal } from '../actions/portal';

  import { createEventDispatcher, onDestroy, onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  const dispatch = createEventDispatcher();
  const close = () => dispatch('close');

  export let noscroll = false;
  onMount(() => {
    noscroll && (document.body.style.overflow = 'hidden');
  });

  let modal: HTMLDivElement;

  const handleKeydown = (e) => {
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
      document.body.style.overflow = 'auto';
    });
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div use:portal class="fixed inset-0 p-4 flex items-center justify-center" style="z-index: 60;">
  <div class="fixed inset-0 transition-opacity" transition:fade={{ duration: 200 }}>
    <div class="absolute inset-0 bg-black opacity-50" on:click={close} />
  </div>

  <div
    transition:fade={{ duration: 200 }}
    class="{$$props.class} bg-white rounded-lg overflow-hidden shadow-xl transform
    transition-all sm:max-w-lg w-full max-h-full flex flex-col"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-headline"
    bind:this={modal}
  >
    <div class="p-4 sm:p-6 overflow-y-auto flex-1">
      <div class="flex">
        <h3 class="text-lg leading-6 font-medium text-gray-900 flex-grow" id="modal-headline">
          <slot name="heading" />
        </h3>
        <button
          on:click={close}
          type="button"
          class="h-12 w-12 -m-4 flex justify-center items-center text-gray-400 hover:text-gray-700 focus:outline-none
          focus:text-gray-700 focus:ring-2 rounded"
          aria-label="Close"
        >
          <span class="i-fa-solid-times" />
        </button>
      </div>
      <div class="mt-2">
        <slot />
      </div>
    </div>
  </div>
</div>

<style global>
  /* allows us to use portal and keep the footer inside the form element */
  .modal-footer {
    @apply -m-4 sm:-m-6 mt-4 sm:mt-6 px-4 py-3 sm:px-6 bg-gray-50 flex flex-wrap justify-end;
  }

  .modal-footer > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.25rem * var(--tw-space-x-reverse));
    margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
  }
</style>
