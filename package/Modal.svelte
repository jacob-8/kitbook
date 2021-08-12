<script>import { createEventDispatcher, onDestroy } from 'svelte';
import { fade } from 'svelte/transition';
const dispatch = createEventDispatcher();
const close = () => dispatch('close');
let modal;
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
        if (index === -1 && e.shiftKey)
            index = 0;
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

<div class="fixed inset-0 p-4 flex items-center justify-center" style="z-index: 60;">
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
          class="h-12 w-12 -m-4 flex justify-center items-center text-gray-400 hover:text-gray-500 focus:outline-none
          focus:text-gray-500 "
          aria-label="Close"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div class="mt-2">
        <slot />
      </div>
    </div>
    {#if $$slots.footer}
      <div class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse">
        <slot name="footer" />
      </div>
    {/if}
  </div>
</div>

<!-- Modal classes: https://tailwindui.com/components/application-ui/overlays/modals -->
<!-- Design Inspiration: https://bt-voice-memos.appspot.com/create -->
<!-- About blog: https://aerotwist.com/blog/voice-memos/ -->
