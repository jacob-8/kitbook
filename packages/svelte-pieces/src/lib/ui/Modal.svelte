<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { portal } from '../actions/portal';
  import { trapFocus } from './trapFocus';

  export let noscroll = false;
  export let zIndex = 60;
  export let duration = 200;

  const dispatch = createEventDispatcher<{ close: boolean }>();
  const close = () => dispatch('close');

  let modal: HTMLElement;

  onMount(() => {
    const previouslyFocused = typeof document !== 'undefined' && (document.activeElement as HTMLElement);
    noscroll && (document.body.style.overflow = 'hidden');

    return () => {
      if (previouslyFocused) {
        previouslyFocused.focus();
        document.body.style.overflow = 'auto';
      }
    };
  });
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === 'Escape') return close();
    if (e.key === 'Tab') trapFocus(e, modal);
  }}
/>

<div
  use:portal
  class="fixed inset-0 p-4 flex items-center justify-center"
  style="z-index: {zIndex};"
>
  <div class="fixed inset-0 transition-opacity" transition:fade={{ duration }}>
    <button type="button" class="absolute inset-0 bg-black opacity-50" on:click={close} />
  </div>

  <div
    transition:fade={{ duration }}
    class="{$$props.class} bg-white rounded-lg overflow-hidden shadow-xl transform
    transition-all sm:max-w-lg w-full max-h-full flex flex-col z-1"
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

<style>
  /* allows us to use portal and keep the footer inside the form element */
  :global(.modal-footer) {
    --at-apply: -m-4 sm:-m-6 mt-4 sm:mt-6 px-4 py-3 sm:px-6 bg-gray-50 flex flex-wrap justify-end;
  }

  :global(.modal-footer > :not([hidden]) ~ :not([hidden])) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.25rem * var(--tw-space-x-reverse));
    margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
  }
</style>
