<script >let dialog;
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
      <i class="far fa-times fa-lg fa-fw" />
    </button>
  </header>

  <slot />
  
  
</div>


<style windi:inject>
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

.bg-black {
  --tw-bg-opacity: 1;
  background-color: rgba(0, 0, 0, var(--tw-bg-opacity));
}
.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
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
.items-center {
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.justify-between {
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.font-medium {
  font-weight: 500;
}
.h-7 {
  height: 1.75rem;
}
.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.leading-7 {
  line-height: 1.75rem;
}
.mb-4 {
  margin-bottom: 1rem;
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
.top-0 {
  top: 0px;
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
.w-72 {
  width: 18rem;
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
@media (min-width: 640px) {
  .sm\:mb-6 {
    margin-bottom: 1.5rem;
  }
  .sm\:p-6 {
    padding: 1.5rem;
  }
}
</style>
