<script >import { createEventDispatcher, onDestroy } from 'svelte';
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





<style windi:inject>
.space-x-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.75rem * var(--tw-space-x-reverse));
  margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));
}
.bg-black {
  --tw-bg-opacity: 1;
  background-color: rgba(0, 0, 0, var(--tw-bg-opacity));
}
.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
}
.border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgba(209, 213, 219, var(--tw-border-opacity));
}
.border-b {
  border-bottom-width: 1px;
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
.items-start {
  -webkit-box-align: start;
  -ms-flex-align: start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
}
.justify-between {
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.flex-1 {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 0%;
  -webkit-flex: 1 1 0%;
  flex: 1 1 0%;
}
.font-medium {
  font-weight: 500;
}
.h-full {
  height: 100%;
}
.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.leading-6 {
  line-height: 1.5rem;
}
.opacity-25 {
  opacity: 0.25;
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
.p-5 {
  padding: 1.25rem;
}
.pr-6 {
  padding-right: 1.5rem;
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
.inset-y-0 {
  top: 0px;
  bottom: 0px;
}
.right-0 {
  right: 0px;
}
.shadow-xl {
  --tw-shadow-color: 0, 0, 0;
  --tw-shadow: 0 20px 25px -5px rgba(var(--tw-shadow-color), 0.1), 0 10px 10px -5px rgba(var(--tw-shadow-color), 0.04);
  -webkit-box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.text-gray-900 {
  --tw-text-opacity: 1;
  color: rgba(17, 24, 39, var(--tw-text-opacity));
}
.text-gray-400 {
  --tw-text-opacity: 1;
  color: rgba(156, 163, 175, var(--tw-text-opacity));
}
.hover\:text-gray-500:hover {
  --tw-text-opacity: 1;
  color: rgba(107, 114, 128, var(--tw-text-opacity));
}
.focus\:text-gray-500:focus {
  --tw-text-opacity: 1;
  color: rgba(107, 114, 128, var(--tw-text-opacity));
}
.w-64 {
  width: 16rem;
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
.transition {
  -webkit-transition-property: background-color, border-color, color, fill, stroke, opacity, -webkit-box-shadow, -webkit-transform, filter, backdrop-filter;
  -o-transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, -webkit-box-shadow, transform, -webkit-transform, filter, backdrop-filter;
  -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  -o-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-transition-duration: 150ms;
  -o-transition-duration: 150ms;
  transition-duration: 150ms;
}
.ease-in-out {
  -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  -o-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.duration-150 {
  -webkit-transition-duration: 150ms;
  -o-transition-duration: 150ms;
  transition-duration: 150ms;
}
</style>