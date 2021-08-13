<script>
	export let onclick: (
			e: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
			}
		) => any = undefined,
		onx: (
			e: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
			}
		) => any = undefined,
		href = undefined,
		target: '_blank' | '' = '',
		size: 'sm' | 'lg' = 'sm',
		color: 'red' | 'orange' | 'green' | 'gray' | string = undefined,
		active = false;
</script>

{#if href}
	<a
		{href}
		{target}
		sveltekit:prefetch
		class:active
		class="{$$props.class} {size} {color}"
	>
		<slot />
		{#if onx}
			<button type="button" on:click|preventDefault={onx} class="badge-x">
				<svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
					<path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
				</svg>
			</button>
		{:else if target === '_blank'}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4 ml-1 inline"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
				/>
				<path
					d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
				/>
			</svg>
		{/if}
	</a>
{:else if onclick}
	<button
		on:click={onclick}
		class:active
		class="{$$props.class} {size} {color}"
	>
		<slot />
		{#if onx}
			<button type="button" on:click|stopPropagation={onx} class="badge-x">
				<svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
					<path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
				</svg>
			</button>
		{/if}
	</button>
{:else}
	<div class:active class="{$$props.class} {size} {color}">
		<slot />
		{#if onx}
			<button type="button" on:click={onx} class="badge-x">
				<svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
					<path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
				</svg>
			</button>
		{/if}
	</div>
{/if}

<style>
	a,
	button:not(.badge-x),
	div {
		@apply inline-flex items-center py-1 px-2 rounded-md text-xs font-medium;
		@apply bg-primary-100 text-primary-800;
	}
	.red {
		@apply bg-red-100 text-red-800;
	}
	.orange {
		@apply bg-orange-100 text-orange-800;
	}
	.green {
		@apply bg-green-100 text-green-800;
	}
	.gray {
		@apply bg-gray-100 text-gray-800;
	}
	.badge-x {
		@apply text-primary-400 hover:bg-primary-200 hover:text-primary-500 focus:bg-primary-500;
		@apply flex-shrink-0 h-4 w-4 rounded-full inline-flex items-center justify-center focus:outline-none focus:text-white ml-1 -mr-1;
	}
	.red .badge-x {
		@apply text-red-400 hover:bg-red-200 hover:text-red-500 focus:bg-red-500 focus:text-white;
	}
	.orange .badge-x {
		@apply text-orange-400 hover:bg-orange-200 hover:text-orange-500 focus:bg-orange-500 focus:text-white;
	}
	.green .badge-x {
		@apply text-green-400 hover:bg-green-200 hover:text-green-500 focus:bg-green-500 focus:text-white;
	}
	.gray .badge-x {
		@apply text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:bg-gray-500 focus:text-white;
	}
</style>
