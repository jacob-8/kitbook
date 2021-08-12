<script context="module">import { writable } from 'svelte/store';
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

<script>import { fade, fly } from 'svelte/transition';
import { backOut } from 'svelte/easing';
</script>

<div class="fixed z-50 inset-x-0 bottom-0 flex flex-col items-center p-2">
	{#each $toasts as toast (toast.id)}
		<div
			class="bg-black bg-opacity-75 text-white mt-2 p-3 rounded max-w-sm"
			in:fly={{ delay: 0, duration: 300, x: 0, y: 50, opacity: 0.1, easing: backOut }}
			out:fade={{ duration: 500 }}
		>
			{toast.message}
		</div>
	{/each}
</div>
<!-- Look at https://github.com/beyonk-adventures/svelte-notifications also -->

<!-- To use, add once:
{#await import('$lib/Toasts.svelte') then { default: Toasts }}
	<Toasts />
{/await}

And use:
toast('hello world') -->