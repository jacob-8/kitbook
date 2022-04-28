<script >import { fly } from 'svelte/transition';
export let top = 8;
export let right = 8;
export let portal = (node) => { };
</script>

<div
  use:portal
  transition:fly={{ y: -10, duration: 150 }}
  class="absolute z-30 w-48 rounded-md
shadow-lg"
style="top: {top}px; right: {right}px;">
  <div class="sv-menu">
    <slot />
  </div>
</div>

<style windi:inject>
.sv-menu {
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
  border-radius: 0.375rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
:global(.sv-menu a):hover, :global(.sv-menu label):hover, :global(.sv-menu button):hover {
  --tw-bg-opacity: 1;
  background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
}
:global(.sv-menu a), :global(.sv-menu label), :global(.sv-menu button) {
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  text-align: left;
  --tw-text-opacity: 1;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
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

.rounded-md {
  border-radius: 0.375rem;
}
.absolute {
  position: absolute;
}
.shadow-lg {
  --tw-shadow-color: 0, 0, 0;
  --tw-shadow: 0 10px 15px -3px rgba(var(--tw-shadow-color), 0.1), 0 4px 6px -2px rgba(var(--tw-shadow-color), 0.05);
  -webkit-box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.w-48 {
  width: 12rem;
}
.z-30 {
  z-index: 30;
}
</style>
