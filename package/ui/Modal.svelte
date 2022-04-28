<script >import { portal } from '../actions/portal';
import { createEventDispatcher, onDestroy, onMount } from 'svelte';
import { fade } from 'svelte/transition';
const dispatch = createEventDispatcher();
const close = () => dispatch('close');
export let noscroll = false;
onMount(() => {
    noscroll && (document.body.style.overflow = 'hidden');
});
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
        document.body.style.overflow = 'auto';
    });
}
</script>

<svelte:window on:keydown={handle_keydown} />

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
    bind:this={modal}>
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
          aria-label="Close">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="mt-2">
        <slot />
      </div>
    </div>
  </div>
</div>

<style windi:inject>
:global(.modal-footer) {
  margin: -1rem;
  margin-top: 1rem;
  --tw-bg-opacity: 1;
  background-color: rgba(249, 250, 251, var(--tw-bg-opacity));
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -ms-flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
@media (min-width: 640px) {
  :global(.modal-footer) {
    margin: -1.5rem;
    margin-top: 1.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

.bg-black {
  --tw-bg-opacity: 1;
  background-color: rgba(0, 0, 0, var(--tw-bg-opacity));
}
.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
}
.rounded-lg {
  border-radius: 0.5rem;
}
.rounded {
  border-radius: 0.25rem;
}
.flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}
.flex-col {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
}
.items-center {
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.justify-center {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
.flex-1 {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 0%;
  -webkit-flex: 1 1 0%;
  flex: 1 1 0%;
}
.flex-grow {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
}
.font-medium {
  font-weight: 500;
}
.h-12 {
  height: 3rem;
}
.h-6 {
  height: 1.5rem;
}
.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.leading-6 {
  line-height: 1.5rem;
}
.-m-4 {
  margin: -1rem;
}
.mt-2 {
  margin-top: 0.5rem;
}
.max-h-full {
  max-height: 100%;
}
.opacity-50 {
  opacity: 0.5;
}
.focus\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.overflow-hidden {
  overflow: hidden;
}
.overflow-y-auto {
  overflow-y: auto;
}
.p-4 {
  padding: 1rem;
}
.fixed {
  position: fixed;
}
.absolute {
  position: absolute;
}
.inset-0 {
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}
.shadow-xl {
  --tw-shadow-color: 0, 0, 0;
  --tw-shadow: 0 20px 25px -5px rgba(var(--tw-shadow-color), 0.1), 0 10px 10px -5px rgba(var(--tw-shadow-color), 0.04);
  -webkit-box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  -webkit-box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
[fill~="none"] {
  fill: none;
}
.text-gray-900 {
  --tw-text-opacity: 1;
  color: rgba(17, 24, 39, var(--tw-text-opacity));
}
.text-gray-400 {
  --tw-text-opacity: 1;
  color: rgba(156, 163, 175, var(--tw-text-opacity));
}
.hover\:text-gray-700:hover {
  --tw-text-opacity: 1;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
}
.focus\:text-gray-700:focus {
  --tw-text-opacity: 1;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
}
.w-full {
  width: 100%;
}
.w-12 {
  width: 3rem;
}
.w-6 {
  width: 1.5rem;
}
.transform {
  --tw-rotate: 0;
  --tw-rotate-x: 0;
  --tw-rotate-y: 0;
  --tw-rotate-z: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-scale-z: 1;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-translate-z: 0;
  -webkit-transform: rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) translateZ(var(--tw-translate-z));
  -ms-transform: rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) translateZ(var(--tw-translate-z));
  transform: rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) translateZ(var(--tw-translate-z));
}
.transition-opacity {
  -webkit-transition-property: opacity;
  -o-transition-property: opacity;
  transition-property: opacity;
  -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  -o-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-transition-duration: 150ms;
  -o-transition-duration: 150ms;
  transition-duration: 150ms;
}
.transition-all {
  -webkit-transition-property: all;
  -o-transition-property: all;
  transition-property: all;
  -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  -o-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-transition-duration: 150ms;
  -o-transition-duration: 150ms;
  transition-duration: 150ms;
}
@media (min-width: 640px) {
  .sm\:max-w-lg {
    max-width: 32rem;
  }
  .sm\:p-6 {
    padding: 1.5rem;
  }
}
</style>
