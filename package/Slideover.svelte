<script>import { createEventDispatcher, onDestroy } from 'svelte';
import { fly, fade } from 'svelte/transition';
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

<div class="fixed inset-y-0 right-0 flex" style="z-index: 60;">
  <div class="fixed inset-0 transition-opacity" transition:fade={{ duration: 200 }}>
    <div class="absolute inset-0 bg-black opacity-25" on:click={close} />
  </div>

  <div
    transition:fly={{ x: 200, duration: 200 }}
    class="bg-white overflow-hidden shadow-xl transform
    transition-all w-64 h-full flex flex-col"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-headline"
    bind:this={modal}>
    <div class="p-5 flex items-start justify-between space-x-3 border-b border-gray-300">
      <h3 class="text-lg leading-6 font-medium text-gray-900 pr-6" id="modal-headline">
        <slot name="heading" />
      </h3>

      <button
        on:click={close}
        type="button"
        class="text-gray-400 hover:text-gray-500 focus:outline-none
          focus:text-gray-500 transition ease-in-out duration-150"
        aria-label="Close">
        <i class="far fa-times fa-lg" /></button>
    </div>

    <div class="flex-1 overflow-y-auto">
      <slot />
    </div>
  </div>
</div>

<!-- Modal classes: https://tailwindui.com/components/application-ui/overlays/modals -->
<!-- Design Inspiration: https://bt-voice-memos.appspot.com/create -->
<!-- About blog: https://aerotwist.com/blog/voice-memos/ -->
