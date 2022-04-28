<script context="module" >import { writable } from 'svelte/store';
function createToasts() {
    const { subscribe, update } = writable([]);
    return {
        subscribe,
        push: (toast) => update((toasts) => [...toasts, toast]),
        remove: (id) => update((toasts) => toasts.filter((toast) => toast.id !== id))
    };
}
const toasts = createToasts();
export function toast(message, duration = 2500) {
    const id = Date.now();
    toasts.push({
        id,
        message
    });
    setTimeout(() => {
        toasts.remove(id);
    }, duration);
}
</script>

<script >import { fade, fly } from 'svelte/transition';
import { backOut } from 'svelte/easing';
</script>

<div class="fixed z-50 inset-x-0 bottom-0 flex flex-col items-center p-2">
	{#each $toasts as toast (toast.id)}
		<div
			class="bg-black bg-opacity-75 text-white mt-2 px-3 py-2 rounded max-w-sm"
			in:fly={{ delay: 0, duration: 300, x: 0, y: 50, opacity: 0.1, easing: backOut }}
			out:fade={{ duration: 500 }}
		>
			{toast.message}
		</div>
	{/each}
</div>



<style windi:inject>
.bg-black {
  --tw-bg-opacity: 1;
  background-color: rgba(0, 0, 0, var(--tw-bg-opacity));
}
.bg-opacity-75 {
  --tw-bg-opacity: 0.75;
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
.mt-2 {
  margin-top: 0.5rem;
}
.max-w-sm {
  max-width: 24rem;
}
.p-2 {
  padding: 0.5rem;
}
.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.fixed {
  position: fixed;
}
.inset-x-0 {
  right: 0px;
  left: 0px;
}
.bottom-0 {
  bottom: 0px;
}
.text-white {
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
}
.z-50 {
  z-index: 50;
}
</style>