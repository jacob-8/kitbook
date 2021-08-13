<script>
	import Button from '$lib/Button.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ change: { value: string } }>();

	export let headings: { title: string; key: string }[] = [];
	export let value: string;
</script>

<section>
	<header class="space-x-1">
		{#each headings as heading}
			<Button
				form="menu"
				class="mr-1"
				active={value === heading.key}
				onclick={() => {
					value = heading.key;
					dispatch('change', { value: heading.key });
				}}
			>
				{heading.title}
			</Button>
		{/each}
	</header>
	<slot />
</section>

<style>
	header {
		@apply flex overflow-y-auto;
	}
</style>
